import { business } from "@/data/business";

const limits = {
  name: 100,
  phone: 30,
  email: 150,
  device: 100,
  brandModel: 150,
  message: 3000,
  availability: 150,
} as const;

function clean(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function validEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Origine refusée." }, { status: 403 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > 20_000) {
    return Response.json({ error: "Demande trop volumineuse." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Données invalides." }, { status: 400 });
  }

  if (clean(body.website, 200)) return Response.json({ success: true });

  const data = {
    name: clean(body.name, limits.name),
    phone: clean(body.phone, limits.phone),
    email: clean(body.email, limits.email),
    device: clean(body.device, limits.device),
    brandModel: clean(body.brandModel, limits.brandModel),
    message: clean(body.message, limits.message),
    availability: clean(body.availability, limits.availability),
  };

  if (!data.name || !data.phone || !data.device || data.message.length < 20 || body.consent !== "yes" || !validEmail(data.email)) {
    return Response.json({ error: "Champs obligatoires invalides." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Formulaire indisponible : RESEND_API_KEY absente.");
    return Response.json({ error: "Service d’envoi indisponible." }, { status: 503 });
  }

  const text = [
    "Nouvelle demande de réparation depuis le site",
    "",
    `Nom : ${data.name}`,
    `Téléphone : ${data.phone}`,
    `E-mail : ${data.email || "Non renseigné"}`,
    `Appareil : ${data.device}`,
    `Marque / modèle : ${data.brandModel || "Non renseigné"}`,
    `Disponibilité : ${data.availability || "Non renseignée"}`,
    "",
    "Description de la panne :",
    data.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "Phil-Multi-Services-Website/1.0",
    },
    body: JSON.stringify({
      from: `Site Phil Multi-Services <${business.email}>`,
      to: [business.email],
      reply_to: data.email || business.email,
      subject: `Demande de réparation — ${data.device} — ${data.name.replace(/[\r\n]/g, " ")}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error(`Échec d’envoi du formulaire (statut ${response.status}).`);
    return Response.json({ error: "Échec de l’envoi." }, { status: 502 });
  }

  return Response.json({ success: true });
}
