import type { Metadata } from "next";
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { RepairRequestForm } from "@/components/contact/repair-request-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Phil Multi-Services à Saint-Amand-les-Eaux pour une réparation ou un conseil.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Expliquez simplement votre besoin à Phil"
        description="Pour une panne, envoyez votre demande en ligne, appelez Phil ou passez à Saint-Amand-les-Eaux."
      />
      <section className="section section-light">
        <Container>
          <div className="contact-layout">
            <article className="content-card contact-form-card">
              <p className="eyebrow">Demande de réparation</p>
              <h2>Parlez de votre appareil</h2>
              <p>Quelques informations suffisent pour que Philippe puisse préparer son retour et vous recontacter.</p>
              <RepairRequestForm />
            </article>
            <aside className="contact-sidebar">
              <article className="content-card">
                <h2>Coordonnées</h2>
                <ul className="contact-list">
                  <li>
                    <Phone size={21} aria-hidden="true" />
                    <a href={business.phoneHref}><strong>Appeler Phil&nbsp;: {business.phone}</strong></a>
                  </li>
                  <li>
                    <Mail size={21} aria-hidden="true" />
                    <a href={business.emailHref}><strong>{business.email}</strong></a>
                  </li>
                  <li>
                    <MessageCircle size={21} aria-hidden="true" />
                    <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer"><strong>Écrire à Phil sur WhatsApp</strong></a>
                  </li>
                  <li>
                    <MapPin size={21} aria-hidden="true" />
                    <address>{business.address}<br />{business.postalCode} {business.city}</address>
                  </li>
                  <li>
                    <ExternalLink size={21} aria-hidden="true" />
                    <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer"><strong>Voir sur Google Maps</strong></a>
                  </li>
                </ul>
              </article>
              <article className="content-card">
                <h2><Clock size={22} className="heading-icon" aria-hidden="true" />Horaires</h2>
                <dl className="hours">
                  {business.hours.map((item) => (
                    <div key={item.day}>
                      <dt>{item.day}</dt>
                      <dd>{item.shop}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
