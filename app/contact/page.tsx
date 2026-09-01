import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { business } from "@/data/business";
export const metadata: Metadata = { title: "Contact", description: "Contactez Phil Multi-Services à Saint-Amand-les-Eaux pour une réparation ou un conseil." };
export default function ContactPage() { return <><PageHero eyebrow="Contact" title="Expliquez simplement votre besoin à Phil" description="Pour une panne, une pièce ou une location, appelez Phil ou passez à Saint-Amand-les-Eaux." /><section className="section section-light"><Container><div className="content-grid"><article className="content-card"><h2>Coordonnées</h2><ul className="contact-list"><li><Phone size={21} /><a href={business.phoneHref}><strong>{business.phone}</strong></a></li><li><MapPin size={21} /><address>{business.address}<br />{business.postalCode} {business.city}</address></li></ul></article><article className="content-card"><h2><Clock size={22} className="heading-icon" />Horaires</h2><dl className="hours">{business.hours.map((item) => <div key={item.day}><dt>{item.day}</dt><dd>{item.shop}{"home" in item && item.home && <><br />Domicile&nbsp;: {item.home}</>}</dd></div>)}</dl></article></div></Container></section></>; }
