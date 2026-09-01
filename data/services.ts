export type ServiceIcon = "repair" | "parts" | "rental" | "reconditioned";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  highlights: readonly string[];
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    slug: "reparation-electromenager",
    title: "Réparation électroménager",
    shortDescription: "Petit et gros électroménager, pour particuliers et professionnels.",
    description: "Présentez votre panne et les informations dont vous disposez. La situation est ensuite étudiée afin de rechercher la solution la plus adaptée.",
    highlights: ["Petit et gros électroménager", "Particuliers et professionnels", "Conseil selon la situation"],
    icon: "repair",
  },
  {
    slug: "pieces-detachees",
    title: "Pièces détachées",
    shortDescription: "Une aide locale pour trouver la pièce adaptée à votre appareil.",
    description: "Phil Multi-Services vous accompagne dans la recherche d’une pièce détachée adaptée aux informations de votre appareil.",
    highlights: ["Vente de pièces détachées", "Recherche selon les informations de l’appareil", "Conseil et accompagnement"],
    icon: "parts",
  },
  {
    slug: "location-materiel",
    title: "Location de matériel",
    shortDescription: "Du matériel pour vos besoins professionnels ou particuliers.",
    description: "Un service de location de matériel destiné aux besoins des particuliers comme des professionnels.",
    highlights: ["Pour les particuliers", "Pour les professionnels", "Matériel selon disponibilité"],
    icon: "rental",
  },
  {
    slug: "vente-reconditionne",
    title: "Vente & reconditionné",
    shortDescription: "Du matériel d’occasion et reconditionné disponible localement.",
    description: "Retrouvez du matériel d’occasion ou reconditionné proposé localement selon les disponibilités du moment.",
    highlights: ["Matériel d’occasion", "Matériel reconditionné", "Disponibilité à confirmer en boutique"],
    icon: "reconditioned",
  },
];
