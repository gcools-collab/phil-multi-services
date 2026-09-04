"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { business } from "@/data/business";

type FormStatus = "idle" | "sending" | "success" | "error";

export function RepairRequestForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/repair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("request_failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="repair-form" onSubmit={submitRequest}>
      <div className="form-grid">
        <label>Nom et prénom<span aria-hidden="true">*</span><input name="name" type="text" autoComplete="name" maxLength={100} required /></label>
        <label>Téléphone<span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} required /></label>
        <label>Adresse e-mail<input name="email" type="email" autoComplete="email" maxLength={150} /></label>
        <label>Type d’appareil<span aria-hidden="true">*</span><select name="device" required defaultValue=""><option value="" disabled>Choisir un appareil</option><option>Lave-linge</option><option>Sèche-linge</option><option>Lave-vaisselle</option><option>Réfrigérateur / congélateur</option><option>Four / plaque de cuisson</option><option>Petit électroménager</option><option>Matériel professionnel</option><option>Autre</option></select></label>
        <label className="form-wide">Marque et modèle<input name="brandModel" type="text" maxLength={150} placeholder="Si vous les connaissez" /></label>
        <label className="form-wide">Décrivez la panne<span aria-hidden="true">*</span><textarea name="message" rows={6} minLength={20} maxLength={3000} required placeholder="Décrivez ce qui se passe, les voyants affichés ou les bruits constatés…" /></label>
        <label className="form-wide">Quand peut-on vous rappeler&nbsp;?<input name="availability" type="text" maxLength={150} placeholder="Par exemple : mardi après 14 h" /></label>
      </div>
      <label className="form-honeypot" aria-hidden="true">Votre site internet<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <label className="form-consent"><input name="consent" type="checkbox" value="yes" required /><span>J’accepte que mes informations soient utilisées uniquement pour répondre à ma demande.<span aria-hidden="true">*</span></span></label>
      <div className="form-submit-row">
        <button className="button" type="submit" disabled={status === "sending"}><Send size={18} aria-hidden="true" />{status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}</button>
        <p className="form-required"><span aria-hidden="true">*</span> Champs obligatoires</p>
      </div>
      <div className="form-feedback" aria-live="polite">
        {status === "success" && <p className="form-success"><CheckCircle2 size={20} aria-hidden="true" />Votre demande a bien été envoyée. Phil vous recontactera dès que possible.</p>}
        {status === "error" && <p className="form-error">L’envoi n’a pas abouti. Vous pouvez écrire directement à <a href={business.emailHref}>{business.email}</a> ou appeler Phil.</p>}
      </div>
    </form>
  );
}
