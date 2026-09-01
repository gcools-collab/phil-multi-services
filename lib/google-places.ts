import "server-only";
export type GooglePlaceReview = { name?: string; relativePublishTimeDescription?: string; rating?: number; text?: { text?: string; languageCode?: string }; googleMapsUri?: string; publishTime?: string; visitDate?: { year?: number; month?: number; day?: number }; authorAttribution?: { displayName?: string; uri?: string; photoUri?: string } };
export type GooglePlace = { id?: string; displayName?: { text?: string; languageCode?: string }; rating?: number; userRatingCount?: number; reviews?: GooglePlaceReview[]; googleMapsUri?: string; googleMapsLinks?: { placeUri?: string; writeAReviewUri?: string; reviewsUri?: string; directionsUri?: string } };
const fieldMask = "id,displayName,rating,userRatingCount,reviews,googleMapsUri,googleMapsLinks";
export async function getGooglePlace(): Promise<GooglePlace | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;
  try {
    const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`);
    url.searchParams.set("languageCode", "fr");
    url.searchParams.set("regionCode", "FR");
    const response = await fetch(url, { headers: { "X-Goog-Api-Key": apiKey, "X-Goog-FieldMask": fieldMask }, cache: "no-store" });
    if (!response.ok) { console.warn(`Google Places indisponible (statut ${response.status}).`); return null; }
    return await response.json() as GooglePlace;
  } catch { console.warn("Google Places est temporairement indisponible."); return null; }
}
