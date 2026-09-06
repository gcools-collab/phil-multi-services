import { business } from "@/data/business";
import { philPhotos } from "@/data/photos";
import { siteUrl } from "@/data/site";

const weekdays: Record<string, string> = {
  lundi: "Monday",
  mardi: "Tuesday",
  mercredi: "Wednesday",
  jeudi: "Thursday",
  vendredi: "Friday",
  samedi: "Saturday",
  dimanche: "Sunday",
};

function openingHours() {
  return business.hours.flatMap((item) => {
    const match = item.shop.match(/(\d{2}:\d{2})–(\d{2}:\d{2})/);
    const dayOfWeek = weekdays[item.day];
    if (!match || !dayOfWeek) return [];

    return [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens: match[1],
      closes: match[2],
    }];
  });
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.businessName,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    image: `${siteUrl}${philPhotos.hero.src}`,
    founder: {
      "@type": "Person",
      name: business.ownerName,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      postalCode: business.postalCode,
      addressLocality: business.city,
      addressCountry: "FR",
    },
    areaServed: business.city,
    sameAs: [business.socialLinks.facebook].filter((url): url is string => Boolean(url)),
    openingHoursSpecification: openingHours(),
  };
}
