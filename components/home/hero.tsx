import { MapPin, Phone, ShieldCheck, Store, Users } from "lucide-react";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";
import { philPhotos } from "@/data/photos";

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
        <PhotoFrame
          className="home-hero-photo"
          src={philPhotos.hero.src}
          alt={philPhotos.hero.alt}
          sizes="(max-width: 900px) 100vw, 40vw"
          priority
        >
          <figcaption className="photo-caption">
            <ShieldCheck size={20} aria-hidden="true" />
            <span>
              <strong>Phil, votre interlocuteur direct</strong>
              Saint-Amand-les-Eaux
            </span>
          </figcaption>
        </PhotoFrame>
      </Container>
    </section>
  );
}
