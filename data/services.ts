import { philPhotos } from "@/data/photos";

export type ServiceIcon = "repair" | "parts" | "rental" | "reconditioned";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  description: string;
  highlights: readonly string[];
  icon: ServiceIcon;
  photo?: {
    src: string;
    alt: string;
    caption: string;
    detail: string;
  };
};

export const services: Service[] = [
  {
    slug: "reparation-electromenager",
    title: "Réparation électroménager",
    shortTitle: "Réparation",
    shortDescription: "Petit et gros électroménager, pour particuliers et professionnels.",
    description: "Expliquez la panne et les informations dont vous disposez. Philippe étudie ensuite la situation pour chercher la solution la plus adaptée.",
    highlights: ["Petit et gros électroménager", "Particuliers et professionnels", "Conseil selon la situation"],
    icon: "repair",
    photo: {
      src: philPhotos.repair.src,
      alt: philPhotos.repair.alt,
      caption: "Philippe, au travail",
      detail: "Réparation en atelier",
    },
  },
  {
    slug: "pieces-detachees",
    title: "Pièces détachées",
    shortTitle: "Pièces",
    shortDescription: "Une aide locale pour trouver la pièce adaptée à votre appareil.",
    description: "Phil Multi-Services vous aide à identifier une pièce détachée à partir des informations de votre appareil.",
    highlights: ["Vente de pièces détachées", "Recherche selon les informations de l’appareil", "Conseil et accompagnement"],
    icon: "parts",
  },
  {
    slug: "location-materiel",
    title: "Location de matériel",
    shortTitle: "Location",
    shortDescription: "Du matériel pour un besoin ponctuel, en boutique.",
    description: "Location de matériel pour un besoin ponctuel, selon les disponibilités du moment en boutique.",
    highlights: ["Pour les particuliers", "Pour les professionnels", "Matériel selon disponibilité"],
    icon: "rental",
  },
  {
    slug: "vente-reconditionne",
    title: "Vente & reconditionné",
    shortTitle: "Occasion",
    shortDescription: "Du matériel d’occasion et reconditionné, selon les arrivages.",
    description: "Matériel d’occasion ou reconditionné proposé localement, selon ce qui est disponible au moment de votre passage.",
    highlights: ["Matériel d’occasion", "Matériel reconditionné", "Disponibilité à confirmer en boutique"],
    icon: "reconditioned",
  },
];
