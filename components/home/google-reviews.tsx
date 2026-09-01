import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { business } from "@/data/business";
import { getGooglePlace, type GooglePlaceReview } from "@/lib/google-places";

function visitLabel(review: GooglePlaceReview) { const { year, month } = review.visitDate ?? {}; return year && month ? new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(year, month - 1)) : null; }

export async function GoogleReviews() {
  const place = await getGooglePlace();
  const mapsUrl = place?.googleMapsLinks?.reviewsUri ?? business.googleReviewUrl;
  if (!place) return mapsUrl ? <section className="reviews-link-section"><Container><a className="text-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Voir les avis sur Google <ArrowUpRight size={17} aria-hidden="true" /></a></Container></section> : null;
  const reviews = place.reviews?.slice(0, 5) ?? [];
  if (!reviews.length && !mapsUrl) return null;
  return <section className="section reviews-section" aria-labelledby="google-reviews-title"><Container><div className="reviews-heading"><div><p className="eyebrow">Avis Google</p><h2 id="google-reviews-title">Ce que disent les clients</h2>{place.rating != null && place.userRatingCount != null && <p><strong>{place.rating.toLocaleString("fr-FR")}/5</strong> — {place.userRatingCount.toLocaleString("fr-FR")} avis</p>}</div><div className="review-actions">{place.googleMapsLinks?.reviewsUri && <a href={place.googleMapsLinks.reviewsUri} target="_blank" rel="noopener noreferrer">Voir tous les avis</a>}{place.googleMapsLinks?.writeAReviewUri && <a href={place.googleMapsLinks.writeAReviewUri} target="_blank" rel="noopener noreferrer">Écrire un avis</a>}</div></div>{reviews.length > 0 && <div className="review-grid">{reviews.map((review, index) => { const author = review.authorAttribution; const visit = visitLabel(review); return <article className="review-card" key={review.name ?? `${author?.displayName}-${index}`}><header>{author?.photoUri && <Image className="review-avatar" src={author.photoUri} width={44} height={44} alt="" />}<div>{author?.uri ? <a href={author.uri} target="_blank" rel="noopener noreferrer"><strong>{author.displayName ?? "Auteur Google"}</strong></a> : <strong>{author?.displayName ?? "Auteur Google"}</strong>}<div className="review-stars" aria-label={`${review.rating ?? 0} étoiles`}>{Array.from({ length: 5 }, (_, star) => <Star key={star} size={15} fill={star < (review.rating ?? 0) ? "currentColor" : "none"} aria-hidden="true" />)}</div></div></header>{review.text?.text && <p>{review.text.text}</p>}<div className="review-meta">{visit && <span>Visite en {visit}</span>}{review.relativePublishTimeDescription && <span>{review.relativePublishTimeDescription}</span>}</div>{review.googleMapsUri && <a className="review-original" href={review.googleMapsUri} target="_blank" rel="noopener noreferrer">Voir l’avis sur Google Maps <ArrowUpRight size={15} aria-hidden="true" /></a>}</article>; })}</div>}<p className="google-attribution">Google · Avis Google classés par pertinence.</p></Container></section>;
}
