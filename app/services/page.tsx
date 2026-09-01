import type { Metadata } from "next";
import { ServiceCard } from "@/components/services/service-card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { services } from "@/data/services";
export const metadata: Metadata = { title: "Services", description: "Réparation, pièces détachées, location et matériel reconditionné à Saint-Amand-les-Eaux." };
export default function ServicesPage() { return <><PageHero eyebrow="Les services" title="Des solutions pratiques, près de chez vous" description="Phil accompagne particuliers et professionnels selon leur besoin, avec un contact simple et direct." /><section className="section section-light"><Container><div className="service-grid">{services.map((service) => <ServiceCard service={service} key={service.slug} />)}</div></Container></section></>; }
