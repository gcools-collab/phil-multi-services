import type { Metadata } from "next";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { philPhotos } from "@/data/photos";

export const metadata: Metadata = {
  title: "À propos",
  description: "Philippe, l’artisan derrière Phil Multi-Services, à Saint-Amand-les-Eaux.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Ici, vous parlez directement à Philippe"
        description="Une présence locale, un échange simple et des conseils adaptés à votre situation."
      />
      <section className="section phil-section">
        <Container className="phil-grid">
          <div className="phil-copy">
            <p className="eyebrow">Philippe, tout simplement</p>
            <h2>Derrière Phil Multi-Services, il y a Philippe.</h2>
            <p className="large-copy">Vous lui parlez directement, en boutique ou par téléphone, pour expliquer votre besoin.</p>
            <p>Il écoute la situation et vous indique la suite possible, sans parcours compliqué.</p>
          </div>
          <div className="phil-photo-wrap">
            <PhotoFrame
              className="phil-photo about-photo"
              src={philPhotos.about.src}
              alt={philPhotos.about.alt}
              sizes="(max-width: 900px) 92vw, 36vw"
            >
              <figcaption className="photo-caption">
                <span>
                  <strong>Philippe</strong>
                  Artisan à Saint-Amand-les-Eaux
                </span>
              </figcaption>
            </PhotoFrame>
          </div>
        </Container>
      </section>
      <section className="section section-light">
        <Container>
          <div className="content-grid">
            <article className="content-card">
              <h2>Un artisan de proximité</h2>
              <p>Phil Multi-Services accompagne les habitants et les professionnels de Saint-Amand-les-Eaux pour leurs besoins en électroménager et en matériel.</p>
            </article>
            <article className="content-card">
              <h2>Une relation simple</h2>
              <p>Pas de parcours compliqué&nbsp;: vous expliquez votre besoin à Philippe, qui vous conseille sur la suite à donner.</p>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
