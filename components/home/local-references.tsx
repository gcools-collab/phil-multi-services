import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { partners } from "@/data/partners";

export function LocalReferences() {
  return <section className="section section-light"><Container><SectionHeading eyebrow="Références professionnelles" title="Les professionnels du coin font aussi appel à Phil." description="Quelques exemples d’équipements professionnels sur lesquels Phil est intervenu." /><div className="reference-list">{partners.map((partner) => <article className="reference-item" key={partner.name}><Building2 size={20} aria-hidden="true" /><div><h3>{partner.name}</h3><p>{partner.equipment}</p></div></article>)}</div><p className="reference-note">Exemples d’interventions communiqués par Phil Multi-Services — sans témoignage ni partenariat commercial affiché.</p></Container></section>;
}
