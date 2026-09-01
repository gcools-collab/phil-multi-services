import type { Metadata } from "next";
import { ArrowRight, Check, PackageOpen, PackageSearch, Recycle, Wrench } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { services } from "@/data/services";

export const metadata: Metadata = { title: "Services", description: "Réparation, pièces détachées, location et matériel reconditionné à Saint-Amand-les-Eaux." };
const icons = { repair: Wrench, parts: PackageSearch, rental: PackageOpen, reconditioned: Recycle };

export default function ServicesPage() {
  return <><PageHero eyebrow="Les services" title="Des solutions pratiques, près de chez vous" description="Pour une panne, une pièce, une location ou du matériel reconditionné, choisissez le service qui correspond à votre besoin." /><nav className="service-jump-nav" aria-label="Accès rapide aux services"><Container>{services.map((service) => <Link href={`#${service.slug}`} key={service.slug}>{service.title}</Link>)}</Container></nav><div className="services-detail-list">{services.map((service, index) => { const Icon = icons[service.icon]; return <section className="service-detail" id={service.slug} key={service.slug}><Container className="service-detail-grid"><div><p className="eyebrow">Service {index + 1}</p><Icon className="service-detail-icon" size={34} aria-hidden="true" /><h2>{service.title}</h2><p className="service-detail-intro">{service.description}</p><ul>{service.highlights.map((highlight) => <li key={highlight}><Check size={18} aria-hidden="true" />{highlight}</li>)}</ul><ButtonLink href="/contact">Parler de mon besoin <ArrowRight size={18} aria-hidden="true" /></ButtonLink></div><div className="service-media-placeholder" role="img" aria-label={`Emplacement réservé à une future photo pour ${service.title}`}><Icon size={42} aria-hidden="true" /><span>Future photo du service</span></div></Container></section>; })}</div></>;
}
