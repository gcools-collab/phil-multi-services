import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { communityPartners } from "@/data/community-partners";

export function CommunityPartners() {
  return (
    <section className="section community-partners-section">
      <Container>
        <SectionHeading eyebrow="Partenaires locaux" title="Des savoir-faire qui font vivre le territoire." description="Phil Multi-Services soutient et recommande ces entreprises et initiatives locales." />
        <div className="community-partner-grid">
          {communityPartners.map((partner) => (
            <article className="community-partner-card" key={partner.name}>
              <div className="community-partner-logo"><Image src={partner.logo} alt={`Logo ${partner.name}`} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 20vw" /></div>
              <div className="community-partner-content">
                <h3>{partner.name}</h3>
                <div className="community-partner-links">
                  {partner.links.map((link) => <a href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}><ArrowUpRight size={16} aria-hidden="true" />{link.label}</a>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
