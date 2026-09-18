import { ArrowUpRight, PackageOpen, PackageSearch, Recycle, Wrench } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/data/services";
import { business } from "@/data/business";

const icons = { repair: Wrench, parts: PackageSearch, rental: PackageOpen, reconditioned: Recycle };

export function ServiceCard({ service, number }: { service: Service; number?: number }) {
  const Icon = icons[service.icon];
  const isRental = service.icon === "rental";
  return (
    <Link className="service-card-link" href={isRental ? business.poppinsRentalUrl : `/services#${service.slug}`} target={isRental ? "_blank" : undefined} rel={isRental ? "noopener noreferrer" : undefined} aria-label={isRental ? "Voir le matériel à louer sur Poppins — site externe, nouvel onglet" : `${service.title} — découvrir le service`}>
      <article className="service-card">
        <div className="service-card-top">
          <div className="service-icon"><Icon size={24} aria-hidden="true" /></div>
          {number && <span className="service-number" aria-hidden="true">0{number}</span>}
        </div>
        <h3>{service.title}</h3>
        <p>{service.shortDescription}</p>
        {isRental ? <span className="rental-card-cta">Voir le matériel à louer <ArrowUpRight size={17} aria-hidden="true" /><small>Poppins · nouvel onglet</small></span> : <ArrowUpRight className="service-arrow" size={19} aria-hidden="true" />}
      </article>
    </Link>
  );
}
