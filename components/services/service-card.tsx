import { ArrowUpRight, PackageOpen, PackageSearch, Recycle, Wrench } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/data/services";

const icons = { repair: Wrench, parts: PackageSearch, rental: PackageOpen, reconditioned: Recycle };

export function ServiceCard({ service, number }: { service: Service; number?: number }) {
  const Icon = icons[service.icon];
  return (
    <Link className="service-card-link" href={`/services#${service.slug}`} aria-label={`${service.title} — découvrir le service`}>
      <article className="service-card">
        <div className="service-card-top">
          <div className="service-icon"><Icon size={24} aria-hidden="true" /></div>
          {number && <span className="service-number" aria-hidden="true">0{number}</span>}
        </div>
        <h3>{service.title}</h3>
        <p>{service.shortDescription}</p>
        <ArrowUpRight className="service-arrow" size={19} aria-hidden="true" />
      </article>
    </Link>
  );
}
