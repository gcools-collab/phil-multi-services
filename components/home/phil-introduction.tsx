import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Container } from "@/components/ui/container";
import { philPhotos } from "@/data/photos";

export function PhilIntroduction() {
  return (
    <section className="section phil-section">
      <Container className="phil-grid">
        <div className="phil-copy">
          <p className="eyebrow">Phil, tout simplement</p>
          <h2>Ici, vous parlez directement à Phil.</h2>
          <p className="large-copy">J’écoute votre besoin, je vous conseille et je cherche la solution la plus adaptée à votre situation.</p>
          <p>Un contact simple et local, que vous soyez particulier ou professionnel.</p>
          <Link className="text-link" href="/a-propos">En savoir plus sur Phil <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="phil-photo-wrap">
          <PhotoFrame
            className="phil-photo"
            src={philPhotos.portrait.src}
            alt={philPhotos.portrait.alt}
            sizes="(max-width: 900px) 92vw, 36vw"
          >
            <figcaption className="photo-caption">
              <MessageCircle size={20} aria-hidden="true" />
              <span>
                <strong>Derrière Phil Multi-Services, il y a Phil.</strong>
                Votre artisan à Saint-Amand-les-Eaux
              </span>
            </figcaption>
          </PhotoFrame>
        </div>
      </Container>
    </section>
  );
}
