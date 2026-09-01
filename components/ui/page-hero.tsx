import { Container } from "@/components/ui/container";
export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <section className="page-hero"><Container><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></Container></section>; }
