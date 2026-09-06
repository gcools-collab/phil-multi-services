export type PartnerMediaType = "logo" | "photo";

export type PartnerReference = {
  name: string;
  profession: string;
  intervention: string;
  url: string;
  logo: string;
  mediaType: PartnerMediaType;
  objectPosition?: string;
};

export const partners: PartnerReference[] = [
  { name: "O’poil près", profession: "Salon de toilettage canin et félin", intervention: "Aspirateur professionnel", url: "https://www.facebook.com/p/Opoil-pr%C3%A8s-Salon-de-toilettage-Canin-F%C3%A9lin-61554010783252/?locale=fr_FR", logo: "/images/professionals/o-poil-pres.jpg", mediaType: "logo" },
  { name: "Maison Lorthioir", profession: "Épicerie fine & produits frais", intervention: "Trancheuse à charcuterie", url: "https://www.facebook.com/p/Maison-Lorthioir-100092376049696/", logo: "/images/professionals/maison-lorthioir.jpg", mediaType: "photo", objectPosition: "center 78%" },
  { name: "Ô Saint-Martin", profession: "Brasserie traditionnelle", intervention: "Sèche-linge", url: "https://www.o-saint-martin.com/", logo: "/images/professionals/o-saint-martin.png", mediaType: "logo" },
  { name: "Le Parvis Gourmand", profession: "Restauration", intervention: "Équipement frigorifique", url: "https://www.facebook.com/p/Le-Parvis-Gourmand-61559807567539/?locale=fr_FR", logo: "/images/professionals/le-parvis-gourmand.jpg", mediaType: "logo" },
  { name: "Les Caves de l’Abbaye", profession: "Caviste", intervention: "Lave-verres", url: "https://lescavesdelabbaye.fr/", logo: "/images/professionals/les-caves-de-l-abbaye.png", mediaType: "logo" },
];
