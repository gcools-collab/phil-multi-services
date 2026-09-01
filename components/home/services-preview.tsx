import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/services/service-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/services";

export function ServicesPreview() {
  return <section className="section section-light"><Container><SectionHeading eyebrow="Les solutions de Phil" title="Une réponse concrète à votre besoin" description="Une panne, une pièce à trouver, du matériel à louer ou un appareil reconditionné&nbsp;: commencez simplement par expliquer votre situation." /><div className="service-grid home-service-grid">{services.map((service, index) => <ServiceCard key={service.slug} service={service} number={index + 1} />)}</div><div className="section-link"><Link href="/services">Voir tous les services <ArrowRight size={17} aria-hidden="true" /></Link></div></Container></section>;
}
