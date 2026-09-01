import { business } from "@/data/business";
// Base prête à être injectée lorsque l’URL publique et les données facultatives auront été confirmées.
export function getLocalBusinessSchema() { return { "@context": "https://schema.org", "@type": "LocalBusiness", name: business.businessName, telephone: business.phone, address: { "@type": "PostalAddress", streetAddress: business.address, postalCode: business.postalCode, addressLocality: business.city, addressCountry: "FR" }, sameAs: [business.socialLinks.facebook].filter((url): url is string => Boolean(url)) }; }
