import { BriefcaseBusiness, Home, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { customerTypes } from "@/data/home";

export function CustomerTypes() {
  const icons = [Home, BriefcaseBusiness];
  return <section className="section customer-section"><Container><p className="eyebrow">Pour les particuliers et les professionnels</p><h2 className="display-heading">De votre lave-linge à l’équipement de votre commerce.</h2><div className="customer-grid">{customerTypes.map((customer, index) => { const Icon = icons[index]; return <article className="customer-card" key={customer.title}><div className="customer-icon"><Icon aria-hidden="true" /></div><div><h3>{customer.title}</h3><p>{customer.description}</p></div><Wrench className="customer-watermark" aria-hidden="true" /></article>; })}</div></Container></section>;
}
