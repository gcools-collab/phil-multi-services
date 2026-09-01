import { ArrowRight, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/services/service-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/data/business";
import { services } from "@/data/services";

export default function Home() {
  return (<><section className="hero-section"><Container className="hero-grid"><div className="hero-copy"><p className="eyebrow"><MapPin size={16} /> Artisan à Saint-Amand-les-Eaux</p><h1>Un appareil en panne&nbsp;? <span>Parlez-en à Phil.</span></h1><p className="hero-intro">Réparation d’électroménager, pièces détachées, location et matériel reconditionné pour les particuliers comme les professionnels.</p><div className="button-row"><ButtonLink href="/contact">Demander une réparation <ArrowRight size={18} /></ButtonLink><ButtonLink href={business.phoneHref} variant="light"><Phone size={18} /> Appeler Phil</ButtonLink></div><ul className="trust-list" aria-label="Les engagements de Phil Multi-Services"><li><ShieldCheck size={18} /> Un interlocuteur local</li><li><Wrench size={18} /> Petit et gros électroménager</li></ul></div><div className="hero-card" aria-label="Coordonnées de Phil Multi-Services"><div className="hero-card-mark" aria-hidden="true">PM</div><p className="hero-card-kicker">Besoin d’un conseil&nbsp;?</p><h2>Phil vous répond simplement.</h2><p>Expliquez votre panne ou votre besoin. Vous serez orienté vers la solution la plus adaptée.</p><a href={business.phoneHref} className="phone-link"><Phone size={20} /> {business.phone}</a><address>{business.address}<br />{business.postalCode} {business.city}</address></div></Container></section><section className="section section-light"><Container><SectionHeading eyebrow="Des solutions concrètes" title="Le bon service, au bon moment" description="Phil accompagne les particuliers et les professionnels avec une approche directe, pratique et locale." /><div className="service-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div><div className="section-link"><Link href="/services">Découvrir tous les services <ArrowRight size={17} /></Link></div></Container></section></>);
}
