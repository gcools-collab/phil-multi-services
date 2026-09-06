import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { partners } from "@/data/partners";

export function LocalReferences() {
  return (
    <section className="section section-light">
      <Container>
        <SectionHeading
          eyebrow="Références professionnelles"
          title="Des interventions chez des commerces locaux."
          description="Quelques exemples d’interventions réalisées sur des équipements professionnels."
        />
        <div className="reference-list">
          {partners.map((partner) => (
            <a
              className="reference-link"
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              key={partner.name}
              aria-label={`${partner.name} — ouvrir le site dans un nouvel onglet`}
            >
              <article className="reference-item">
                <div className={`reference-media is-${partner.mediaType}`}>
                  <Image
                    src={partner.logo}
                    alt={partner.mediaType === "photo" ? `Commerce ${partner.name}` : `Logo ${partner.name}`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 20vw"
                    style={partner.objectPosition ? { objectPosition: partner.objectPosition } : undefined}
                  />
                </div>
                <div className="reference-content">
                  <div className="reference-heading">
                    <h3>{partner.name}</h3>
                    <ArrowUpRight className="reference-arrow" size={17} aria-hidden="true" />
                  </div>
                  <p className="reference-profession">{partner.profession}</p>
                  <p className="reference-intervention"><strong>Intervention&nbsp;:</strong> {partner.intervention}</p>
                </div>
              </article>
            </a>
          ))}
        </div>
        <p className="reference-note">Exemples d’interventions communiqués par Phil Multi-Services — sans témoignage ni partenariat commercial affiché.</p>
      </Container>
    </section>
  );
}
