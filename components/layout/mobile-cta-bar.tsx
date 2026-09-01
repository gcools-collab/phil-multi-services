import { Phone, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { business } from "@/data/business";
export function MobileCtaBar() { return <aside className="mobile-cta" aria-label="Actions rapides"><ButtonLink href={business.phoneHref} variant="secondary"><Phone size={17} /> Appeler</ButtonLink><ButtonLink href="/contact"><Wrench size={17} /> Demander une réparation</ButtonLink></aside>; }
