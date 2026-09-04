"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, ImagePlus, Send } from "lucide-react";
import { business } from "@/data/business";

type FormStatus = "idle" | "sending" | "success" | "success-no-confirmation" | "error";

export function RepairRequestForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fileError, setFileError] = useState("");

  function validatePhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const invalid = files.length > 3 || files.some((file) => !allowedTypes.includes(file.type) || file.size > 1_200_000);

    if (invalid) {
      event.target.value = "";
      setFileError("Choisissez au maximum 3 images JPG, PNG ou WebP de 1,2 Mo chacune.");
      return;
    }

    setFileError("");
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const payload = new FormData(form);

    try {
      const response = await fetch("/api/repair-request", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("request_failed");
      const result = await response.json() as { confirmationSent?: boolean };
      form.reset();
      setFileError("");
      setStatus(result.confirmationSent === false ? "success-no-confirmation" : "success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="repair-form" onSubmit={submitRequest}>
      <div className="form-grid">
        <label><span className="form-label">Nom et prénom <span aria-hidden="true">*</span></span><input name="name" type="text" autoComplete="name" maxLength={100} required /></label>
        <label><span className="form-label">Téléphone <span aria-hidden="true">*</span></span><input name="phone" type="tel" autoComplete="tel" maxLength={30} required /></label>
        <label><span className="form-label">Adresse e-mail <span aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" maxLength={150} required /><small>Pour recevoir la confirmation de votre demande.</small></label>
        <label><span className="form-label">Type d’appareil <span aria-hidden="true">*</span></span><select name="device" required defaultValue=""><option value="" disabled>Choisir un appareil</option><option>Lave-linge</option><option>Sèche-linge</option><option>Lave-vaisselle</option><option>Réfrigérateur / congélateur</option><option>Four / plaque de cuisson</option><option>Petit électroménager</option><option>Matériel professionnel</option><option>Autre</option></select></label>
        <label className="form-wide"><span className="form-label">Marque et modèle</span><input name="brandModel" type="text" maxLength={150} placeholder="Si vous les connaissez" /></label>
        <label className="form-wide"><span className="form-label">Décrivez la panne <span aria-hidden="true">*</span></span><textarea name="message" rows={6} minLength={20} maxLength={3000} required placeholder="Décrivez ce qui se passe, les voyants affichés ou les bruits constatés…" /></label>
        <label className="form-wide"><span className="form-label">Photos de l’appareil ou de la panne</span><span className="photo-field"><ImagePlus size={22} aria-hidden="true" /><span><strong>Ajouter jusqu’à 3 images</strong><small>JPG, PNG ou WebP · 1,2 Mo maximum par image</small></span><input name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={validatePhotos} /></span>{fileError && <span className="field-error" role="alert">{fileError}</span>}</label>
        <label className="form-wide"><span className="form-label">Quand peut-on vous rappeler&nbsp;?</span><input name="availability" type="text" maxLength={150} placeholder="Par exemple : mardi après 14 h" /></label>
      </div>
      <label className="form-honeypot" aria-hidden="true">Votre site internet<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <label className="form-consent"><input name="consent" type="checkbox" value="yes" required /><span>J’accepte que mes informations soient utilisées uniquement pour répondre à ma demande. <span aria-hidden="true">*</span></span></label>
      <div className="form-submit-row">
        <button className="button" type="submit" disabled={status === "sending"}><Send size={18} aria-hidden="true" />{status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}</button>
        <p className="form-required"><span aria-hidden="true">*</span> Champs obligatoires</p>
      </div>
      <div className="form-feedback" aria-live="polite">
        {status === "success" && <p className="form-success"><CheckCircle2 size={20} aria-hidden="true" />Votre demande a bien été envoyée. Un e-mail de confirmation vient de vous être adressé et Phil vous recontactera dès que possible.</p>}
        {status === "success-no-confirmation" && <p className="form-success"><CheckCircle2 size={20} aria-hidden="true" />Votre demande a bien été envoyée à Phil. L’e-mail de confirmation n’a toutefois pas pu être délivré.</p>}
        {status === "error" && <p className="form-error">L’envoi n’a pas abouti. Vous pouvez écrire directement à <a href={business.emailHref}>{business.email}</a> ou appeler Phil.</p>}
      </div>
    </form>
  );
}
