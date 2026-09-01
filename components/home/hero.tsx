import { MapPin, Phone, ShieldCheck, Store, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";

export function Hero() {
  return (
    <section className="home-hero">
      <Container className="home-hero-grid">
        <div className="home-hero-copy">
          <p className="eyebrow"><MapPin size={16} aria-hidden="true" /> Votre réparateur de proximité à {business.city}</p>
          <h1>Votre appareil est en panne&nbsp;? <span>Parlez-en à Phil.</span></h1>
          <p className="home-hero-intro">Réparation d’électroménager, pièces détachées, location et matériel reconditionné à {business.city}, pour les particuliers comme pour les professionnels.</p>
          <div className="button-row">
            <ButtonLink href="/contact">Demander une réparation</ButtonLink>
            <ButtonLink href={business.phoneHref} variant="light"><Phone size={18} aria-hidden="true" /> Appeler Phil</ButtonLink>
          </div>
          <ul className="home-hero-facts">
            <li><Store size={18} aria-hidden="true" /><span><strong>La boutique</strong>{business.address}</span></li>
            <li><Users size={18} aria-hidden="true" /><span><strong>Pour vous accompagner</strong>Particuliers & professionnels</span></li>
          </ul>
        </div>
        {/* Remplacer ce bloc par une vraie photo ou vidéo de Philippe dans sa boutique. */}
        <div className="media-placeholder media-placeholder-hero" role="img" aria-label="Emplacement réservé à une future photo de Phil dans sa boutique">
          <div className="media-placeholder-mark" aria-hidden="true">PHIL</div>
          <div className="media-placeholder-caption"><ShieldCheck size={20} aria-hidden="true" /><span><strong>Phil, votre interlocuteur direct</strong>À la boutique de Saint-Amand-les-Eaux</span></div>
        </div>
      </Container>
    </section>
  );
}
