import { MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";

export function FinalCta() {
  return <section className="final-cta"><Container className="final-cta-inner"><div><p className="eyebrow"><MapPin size={16} aria-hidden="true" /> {business.city}</p><h2>Un problème&nbsp;? Parlez-en à Phil.</h2><p>Un contact direct pour expliquer votre besoin et trouver la suite la plus adaptée.</p></div><div className="button-row"><ButtonLink href="/contact">Demander une réparation</ButtonLink><ButtonLink href={business.phoneHref} variant="light"><Phone size={18} aria-hidden="true" /> Appeler Phil</ButtonLink></div></Container></section>;
}
