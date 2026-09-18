import { ArrowUpRight, PackageOpen, PackageSearch, Recycle, Wrench } from "lucide-react";
import Link from "next/link";
import { PoppinsRentalCta } from "@/components/rental/poppins-rental-cta";
import type { Service } from "@/data/services";
import { getPoppinsQrSvg, getPoppinsRentalUrl } from "@/lib/poppins-qr";

const icons = { repair: Wrench, parts: PackageSearch, rental: PackageOpen, reconditioned: Recycle };

export async function ServiceCard({ service, number }: { service: Service; number?: number }) {
  const Icon = icons[service.icon];
  const isRental = service.icon === "rental";
  const card = (
    <article className="service-card">
      <div className="service-card-top">
        <div className="service-icon"><Icon size={24} aria-hidden="true" /></div>
        {number && <span className="service-number" aria-hidden="true">0{number}</span>}
      </div>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      {isRental ? (
        <span className="rental-card-cta">
          Voir le matériel à louer <ArrowUpRight size={17} aria-hidden="true" />
          <small>Disponible via l’application Poppins</small>
        </span>
      ) : (
        <ArrowUpRight className="service-arrow" size={19} aria-hidden="true" />
      )}
    </article>
  );

  if (!isRental) {
    return (
      <Link className="service-card-link" href={`/services#${service.slug}`} aria-label={`${service.title} — découvrir le service`}>
        {card}
      </Link>
    );
  }

  const qrSvg = await getPoppinsQrSvg();

  return (
    <PoppinsRentalCta
      className="service-card-link"
      href={getPoppinsRentalUrl()}
      qrSvg={qrSvg}
      ariaLabel="Voir le matériel à louer sur Poppins"
    >
      {card}
    </PoppinsRentalCta>
  );
}
