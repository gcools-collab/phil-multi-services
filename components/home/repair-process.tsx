import { ArrowRight, Wrench } from "lucide-react";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { repairSteps } from "@/data/home";
import { philPhotos } from "@/data/photos";

export function RepairProcess() {
  return (
    <section className="section process-section">
      <Container className="process-layout">
        <div className="process-heading">
          <SectionHeading
            eyebrow="Comment ça se passe ?"
            title="On commence par en parler simplement."
            description="Chaque situation est différente. Ces étapes permettent à Phil de comprendre le besoin et d’étudier la solution possible."
          />
        </div>
        <PhotoFrame
          className="process-photo"
          src={philPhotos.workshop.src}
          alt={philPhotos.workshop.alt}
          sizes="(max-width: 900px) 92vw, 34vw"
        >
          <figcaption className="photo-caption">
            <Wrench size={20} aria-hidden="true" />
            <span>
              <strong>Phil, au travail</strong>
              Dans l’atelier de Saint-Amand-les-Eaux
            </span>
          </figcaption>
        </PhotoFrame>
        <div className="process-body">
          <ol className="process-list">
            {repairSteps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <ButtonLink href="/contact">Parler de ma panne à Phil <ArrowRight size={18} aria-hidden="true" /></ButtonLink>
        </div>
      </Container>
    </section>
  );
}
