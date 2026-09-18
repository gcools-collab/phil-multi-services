import type { Metadata } from "next";
import { Phone, Wrench } from "lucide-react";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { business } from "@/data/business";
import { philPhotos } from "@/data/photos";
import { philStory, philStoryArc } from "@/data/phil-story";
import "./about.css";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L’histoire de Philippe, réparateur électroménager à Saint-Amand-les-Eaux : une histoire de famille, de curiosité et de réparation.",
};

export default function AboutPage() {
  const closingLine = philStory.path.paragraphs[philStory.path.paragraphs.length - 1];

  return (
    <>
      <PageHero eyebrow="À propos" title={philStory.title} description={closingLine} />

      <nav className="story-arc-band" aria-label="Le fil de l’histoire">
        <Container>
          <ol className="story-arc">
            {philStoryArc.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`}>{chapter.arcLabel}</a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      <section className="section phil-section" aria-labelledby={philStory.grandfather.id}>
        <Container className="phil-grid">
          <div className="phil-copy story-copy">
            <h2 id={philStory.grandfather.id}>{philStory.grandfather.heading}</h2>
            {philStory.grandfather.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "large-copy" : undefined}>
                {paragraph}
              </p>
            ))}
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

      <section className="story-quote-band" aria-label="Citation">
        <Container>
          <blockquote className="story-quote">
            <p>«&nbsp;{philStory.quote}&nbsp;»</p>
            <footer>
              <cite>{philStory.quoteSource}</cite>
            </footer>
          </blockquote>
        </Container>
      </section>

      <section className="section section-light" aria-label="Enfant, puis premiers outils">
        <Container className="story-chapters">
          <article className="story-chapter">
            <h2 id={philStory.childhood.id}>{philStory.childhood.heading}</h2>
            {philStory.childhood.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <article className="story-chapter">
            <h2 id={philStory.firstTools.id}>{philStory.firstTools.heading}</h2>
            {philStory.firstTools.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </Container>
      </section>

      <section className="section phil-section" aria-labelledby={philStory.today.id}>
        <Container className="phil-grid is-reversed">
          <div className="phil-photo-wrap">
            <PhotoFrame
              className="phil-photo story-photo-repair"
              src={philPhotos.repair.src}
              alt={philPhotos.repair.alt}
              sizes="(max-width: 900px) 92vw, 36vw"
            >
              <figcaption className="photo-caption">
                <Wrench size={20} aria-hidden="true" />
                <span>
                  <strong>Philippe, au travail</strong>
                  Réparation en atelier
                </span>
              </figcaption>
            </PhotoFrame>
          </div>
          <div className="phil-copy story-copy">
            <h2 id={philStory.today.id}>{philStory.today.heading}</h2>
            {philStory.today.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-light story-close" aria-labelledby={philStory.path.id}>
        <Container className="phil-grid">
          <div className="phil-copy story-copy">
            <h2 id={philStory.path.id}>{philStory.path.heading}</h2>
            {philStory.path.paragraphs.map((paragraph) => (
              <p key={paragraph} className={paragraph === closingLine ? "large-copy" : undefined}>
                {paragraph}
              </p>
            ))}
            <div className="button-row">
              <ButtonLink href="/contact">Parler de mon besoin</ButtonLink>
              <ButtonLink href={business.phoneHref} variant="secondary">
                <Phone size={18} aria-hidden="true" />
                Appeler Philippe
              </ButtonLink>
            </div>
          </div>
          <div className="phil-photo-wrap">
            <PhotoFrame
              className="phil-photo story-photo-shop"
              src={philPhotos.shop.src}
              alt={philPhotos.shop.alt}
              sizes="(max-width: 900px) 92vw, 36vw"
            >
              <figcaption className="photo-caption">
                <span>
                  <strong>Ici, à Saint-Amand-les-Eaux</strong>
                  {business.address}
                </span>
              </figcaption>
            </PhotoFrame>
          </div>
        </Container>
      </section>
    </>
  );
}
