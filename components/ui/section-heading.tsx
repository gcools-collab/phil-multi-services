type Props = { eyebrow: string; title: string; description?: string; centered?: boolean };
export function SectionHeading({ eyebrow, title, description, centered = false }: Props) { return <div className={`section-heading${centered ? " is-centered" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>; }
