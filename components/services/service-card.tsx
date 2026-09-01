import { ArrowUpRight, PackageSearch, Recycle, Truck, Wrench } from "lucide-react";
import type { Service } from "@/data/services";
const icons = { repair: Wrench, parts: PackageSearch, rental: Truck, reconditioned: Recycle };
export function ServiceCard({ service, number }: { service: Service; number?: number }) {
  const Icon = icons[service.icon];
  return <article className="service-card"><div className="service-card-top"><div className="service-icon"><Icon size={24} aria-hidden="true" /></div>{number && <span className="service-number" aria-hidden="true">0{number}</span>}</div><h3>{service.title}</h3><p>{service.shortDescription}</p>{number && <ArrowUpRight className="service-arrow" size={19} aria-hidden="true" />}</article>;
}
