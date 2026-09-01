import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { repairSteps } from "@/data/home";

export function RepairProcess() {
  return <section className="section process-section"><Container><SectionHeading eyebrow="Comment ça se passe ?" title="On commence par en parler simplement." description="Chaque situation est différente. Ces étapes permettent à Phil de comprendre le besoin et d’étudier la solution possible." /><ol className="process-list">{repairSteps.map((step, index) => <li key={step.title}><span className="step-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol><ButtonLink href="/contact">Parler de ma panne à Phil <ArrowRight size={18} aria-hidden="true" /></ButtonLink></Container></section>;
}
