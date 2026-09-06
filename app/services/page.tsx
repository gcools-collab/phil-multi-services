import type { Metadata } from "next";
import { ArrowRight, Check, PackageOpen, PackageSearch, Recycle, Wrench } from "lucide-react";
import Link from "next/link";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { services, type Service } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Réparation, pièces détachées, location et matériel reconditionné à Saint-Amand-les-Eaux.",
};

const icons = { repair: Wrench, parts: PackageSearch, rental: PackageOpen, reconditioned: Recycle };

function ServiceVisual({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  if (service.photo) {
    return (
      <PhotoFrame
        className="service-photo"
        src={service.photo.src}
        alt={service.photo.alt}
        sizes="(max-width: 900px) 92vw, 38vw"
      >
        <figcaption className="photo-caption">
          <Icon size={20} aria-hidden="true" />
          <span>
            <strong>{service.photo.caption}</strong>
            {service.photo.detail}
          </span>
        </figcaption>
      </PhotoFrame>
    );
  }

  return (
    <div className="service-visual">
      <div className="service-visual-icon">
        <Icon size={28} aria-hidden="true" />
      </div>
      <p className="service-visual-kicker">Phil Multi-Services</p>
      <strong>{service.title}</strong>
      <span>À Saint-Amand-les-Eaux</span>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Les services"
        title="Des solutions pratiques, près de chez vous"
        description="Pour une panne, une pièce, une location ou du matériel reconditionné, choisissez le service qui correspond à votre besoin."
      />
      <nav className="service-jump-nav" aria-label="Accès rapide aux services">
        <Container>
          {services.map((service) => (
            <Link href={`#${service.slug}`} key={service.slug}>
              {service.shortTitle}
            </Link>
          ))}
        </Container>
      </nav>
      <div className="services-detail-list">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          return (
            <section className="service-detail" id={service.slug} key={service.slug}>
              <Container className="service-detail-grid">
                <div>
                  <p className="eyebrow">Service {index + 1}</p>
                  <Icon className="service-detail-icon" size={34} aria-hidden="true" />
                  <h2>{service.title}</h2>
                  <p className="service-detail-intro">{service.description}</p>
                  <ul>
                    {service.highlights.map((highlight) => (
                      <li key={highlight}>
                        <Check size={18} aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/contact">
                    Parler de mon besoin <ArrowRight size={18} aria-hidden="true" />
                  </ButtonLink>
                </div>
                <ServiceVisual service={service} />
              </Container>
            </section>
          );
        })}
      </div>
    </>
  );
}
