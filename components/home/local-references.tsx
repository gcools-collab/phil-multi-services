import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { partners } from "@/data/partners";

export function LocalReferences() {
  return <section className="section section-light"><Container><SectionHeading eyebrow="Références professionnelles" title="Des commerces locaux nous font confiance." description="Quelques exemples d’interventions réalisées sur des équipements professionnels." /><div className="reference-list">{partners.map((partner) => <a className="reference-link" href={partner.url} target="_blank" rel="noopener noreferrer" key={partner.name} aria-label={`${partner.name} — ouvrir le site dans un nouvel onglet`}><article className="reference-item"><div className="reference-logo"><Image src={partner.logo} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 20vw" /></div><ArrowUpRight className="reference-arrow" size={17} aria-hidden="true" /><h3>{partner.name}</h3><p className="reference-profession">{partner.profession}</p><p className="reference-intervention"><strong>Intervention&nbsp;:</strong> {partner.intervention}</p></article></a>)}</div><p className="reference-note">Exemples d’interventions communiqués par Phil Multi-Services — sans témoignage ni partenariat commercial affiché.</p></Container></section>;
}
