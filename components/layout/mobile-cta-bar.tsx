import { MessageCircle, Phone, Wrench } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { business } from "@/data/business";
export function MobileCtaBar() { return <aside className="mobile-cta" aria-label="Actions rapides"><ButtonLink href={business.phoneHref} variant="secondary"><Phone size={17} /> Appeler</ButtonLink><a className="button button-whatsapp" href={business.whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> WhatsApp</a><ButtonLink href="/contact"><Wrench size={17} /> Réparation</ButtonLink></aside>; }
