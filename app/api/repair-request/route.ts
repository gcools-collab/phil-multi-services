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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maximumImageSize = 1_200_000;
const maximumTotalImageSize = 3_600_000;

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "Phil-Multi-Services-Website/1.0",
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Origine refusée." }, { status: 403 });
  }

  if (Number(request.headers.get("content-length") ?? 0) > 4_200_000) {
    return Response.json({ error: "Demande trop volumineuse." }, { status: 413 });
  }

  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return Response.json({ error: "Données invalides." }, { status: 400 });
  }

  if (clean(body.get("website"), 200)) return Response.json({ success: true });

  const data = {
    name: clean(body.get("name"), limits.name),
    phone: clean(body.get("phone"), limits.phone),
    email: clean(body.get("email"), limits.email),
    device: clean(body.get("device"), limits.device),
    brandModel: clean(body.get("brandModel"), limits.brandModel),
    message: clean(body.get("message"), limits.message),
    availability: clean(body.get("availability"), limits.availability),
  };

  if (!data.name || !data.phone || !data.device || data.message.length < 20 || body.get("consent") !== "yes" || !validEmail(data.email)) {
    return Response.json({ error: "Champs obligatoires invalides." }, { status: 400 });
  }

  const photos = body.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const totalImageSize = photos.reduce((total, photo) => total + photo.size, 0);
  if (photos.length > 3 || totalImageSize > maximumTotalImageSize || photos.some((photo) => !allowedImageTypes.has(photo.type) || photo.size > maximumImageSize)) {
    return Response.json({ error: "Photos invalides ou trop volumineuses." }, { status: 400 });
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

  const attachments = await Promise.all(photos.map(async (photo, index) => ({
    filename: photo.name.replace(/[^a-zA-Z0-9._-]/g, "-") || `photo-${index + 1}.jpg`,
    content: Buffer.from(await photo.arrayBuffer()).toString("base64"),
  })));

  const response = await sendEmail(apiKey, {
    from: `Site Phil Multi-Services <${business.email}>`,
    to: [business.email],
    reply_to: data.email,
    subject: `Demande de réparation — ${data.device} — ${data.name.replace(/[\r\n]/g, " ")}`,
    text,
    attachments,
  });

  if (!response.ok) {
    console.error(`Échec d’envoi du formulaire (statut ${response.status}).`);
    return Response.json({ error: "Échec de l’envoi." }, { status: 502 });
  }

  const confirmation = await sendEmail(apiKey, {
    from: `Phil Multi-Services <${business.email}>`,
    to: [data.email],
    reply_to: business.email,
    subject: "Votre demande de réparation a bien été reçue",
    text: [
      `Bonjour ${data.name},`,
      "",
      "Votre demande de réparation a bien été transmise à Phil Multi-Services.",
      `Appareil concerné : ${data.device}`,
      data.brandModel ? `Marque / modèle : ${data.brandModel}` : "",
      "",
      "Philippe étudiera les informations envoyées et vous recontactera dès que possible. Cet accusé de réception ne constitue pas encore un diagnostic ni une confirmation d’intervention.",
      "",
      `Pour compléter votre demande : ${business.phone} ou ${business.email}`,
      "",
      "Phil Multi-Services",
      `${business.address}, ${business.postalCode} ${business.city}`,
    ].filter(Boolean).join("\n"),
  });

  if (!confirmation.ok) console.error(`Échec de l’accusé de réception (statut ${confirmation.status}).`);

  return Response.json({ success: true, confirmationSent: confirmation.ok });
}
