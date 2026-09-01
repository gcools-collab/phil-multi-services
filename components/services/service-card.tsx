import { PackageSearch, Recycle, Truck, Wrench } from "lucide-react";
import type { Service } from "@/data/services";
const icons = { repair: Wrench, parts: PackageSearch, rental: Truck, reconditioned: Recycle };
export function ServiceCard({ service }: { service: Service }) { const Icon = icons[service.icon]; return <article className="service-card"><div className="service-icon"><Icon size={24} /></div><h3>{service.title}</h3><p>{service.shortDescription}</p></article>; }
