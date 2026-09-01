import { MapPin, Phone, Store } from "lucide-react";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";

export function ShopInformation() {
  return <section className="section shop-section"><Container className="shop-grid"><div><p className="eyebrow">La boutique à Saint-Amand-les-Eaux</p><h2>Phil vous accueille au cœur de la ville.</h2><address className="shop-address"><MapPin aria-hidden="true" /><span><strong>{business.address}</strong>{business.postalCode} {business.city}</span></address><a className="shop-phone" href={business.phoneHref}><Phone size={20} aria-hidden="true" /> {business.phone}</a><dl className="shop-hours">{business.hours.map((item) => <div key={item.day}><dt>{item.day}</dt><dd>{item.shop}</dd></div>)}</dl></div>{/* Remplacer ce bloc par une photo de façade ou une carte lorsque les données seront confirmées. */}<div className="media-placeholder media-placeholder-shop" role="img" aria-label="Emplacement réservé à une future photo de façade ou carte"><Store size={44} aria-hidden="true" /><span><strong>La boutique de Phil</strong>Future photo de façade ou carte</span></div></Container></section>;
}
