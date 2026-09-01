import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export function PhilIntroduction() {
  return <section className="section phil-section"><Container className="phil-grid"><div className="phil-copy"><p className="eyebrow">Phil, tout simplement</p><h2>Ici, vous parlez directement à Phil.</h2><p className="large-copy">J’écoute votre besoin, je vous conseille et je cherche la solution la plus adaptée à votre situation.</p><p>Un contact simple et local, que vous soyez particulier ou professionnel.</p><Link className="text-link" href="/a-propos">En savoir plus sur Phil <ArrowRight size={17} aria-hidden="true" /></Link></div>{/* Remplacer ce bloc par une vraie photo portrait de Philippe. */}<div className="media-placeholder media-placeholder-portrait" role="img" aria-label="Emplacement réservé à une future photo authentique de Philippe"><MessageCircle size={38} aria-hidden="true" /><span>Une future photo de Phil,<br />ici, dans son environnement.</span></div></Container></section>;
}
