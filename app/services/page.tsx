import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, PackageOpen, PackageSearch, Phone, Recycle, Wrench } from "lucide-react";
import Link from "next/link";
import { PoppinsRentalCta } from "@/components/rental/poppins-rental-cta";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { services, type Service } from "@/data/services";
import { business } from "@/data/business";
import { getPoppinsQrSvg, getPoppinsRentalUrl } from "@/lib/poppins-qr";

export const metadata: Metadata = {
  title: "Services",
  description: "Réparation, pièces détachées, location et matériel reconditionné à Saint-Amand-les-Eaux.",
};

const icons = { repair: Wrench, parts: PackageSearch, rental: PackageOpen, reconditioned: Recycle };

function ServiceVisual({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  const caption = service.icon === "rental" ? "Disponible via Poppins" : "À Saint-Amand-les-Eaux";

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
      <span className="service-visual-frame" aria-hidden="true" />
      <Icon className="service-visual-watermark" size={168} aria-hidden="true" />
      <div className="service-visual-brand">
        <div className="service-visual-icon">
          <Icon size={28} aria-hidden="true" />
        </div>
        <p className="service-visual-kicker">Phil Multi-Services</p>
      </div>
      <div className="photo-caption">
        <Icon size={20} aria-hidden="true" />
        <span>
          <strong>{service.title}</strong>
          {caption}
        </span>
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const poppinsQrSvg = await getPoppinsQrSvg();

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
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <section className="service-detail" id={service.slug} key={service.slug}>
              {service.icon === "rental" && <span id="location-materiel" className="rental-legacy-anchor" aria-hidden="true" />}
              <Container className="service-detail-grid">
                <div>
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
                  {service.icon === "rental" ? <>
                    <div className="button-row">
                      <PoppinsRentalCta
                        className="button"
                        href={getPoppinsRentalUrl()}
                        qrSvg={poppinsQrSvg}
                        ariaLabel="Voir le matériel disponible sur Poppins"
                      >
                        Voir le matériel disponible <ArrowUpRight size={18} aria-hidden="true" />
                      </PoppinsRentalCta>
                      <ButtonLink href={business.phoneHref} variant="secondary"><Phone size={18} aria-hidden="true" />Appeler Philippe</ButtonLink>
                    </div>
                    <p className="rental-external-note">Disponible via l’application Poppins.</p>
                  </> : <ButtonLink href="/contact">
                    Parler de mon besoin <ArrowRight size={18} aria-hidden="true" />
                  </ButtonLink>}
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
