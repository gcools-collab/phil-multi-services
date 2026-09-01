import { MessageSquareQuote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";

export function GoogleReviewsPlaceholder() {
  if (business.socialLinks.googleBusinessProfile) return null;
  return <section className="reviews-section" aria-label="Avis Google"><Container className="reviews-placeholder"><MessageSquareQuote size={28} aria-hidden="true" /><div><p className="eyebrow">Avis Google</p><h2>Les avis vérifiés seront bientôt présentés ici.</h2><p>La note, le nombre d’avis et les extraits seront ajoutés lorsque la fiche Google Business Profile aura été confirmée.</p></div></Container></section>;
}
