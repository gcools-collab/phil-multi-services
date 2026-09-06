export type CommunityPartnerLink = {
  label: string;
  url: string;
  type: "facebook" | "instagram" | "website";
};

export type CommunityPartner = {
  name: string;
  logo: string;
  links: CommunityPartnerLink[];
};

export const communityPartners: CommunityPartner[] = [
  {
    name: "Cakes by Chris",
    logo: "/images/partners/cakes-by-chris.jpeg",
    links: [
      { label: "Facebook", url: "https://www.facebook.com/cakesbychris59", type: "facebook" },
      { label: "Instagram", url: "https://www.instagram.com/cakesbychris59", type: "instagram" },
    ],
  },
  {
    name: "O'Studio by Justyne",
    logo: "/images/partners/o-studio-by-justyne.png",
    links: [
      { label: "Prendre rendez-vous", url: "https://www.planity.com/ostudio-by-justyne-59230-saint-amand-les-eaux", type: "website" },
      { label: "Facebook", url: "https://www.facebook.com/share/1DPNWtuWjG/", type: "facebook" },
      { label: "Instagram", url: "https://www.instagram.com/ostudiobyjustyne", type: "instagram" },
    ],
  },
  {
    name: "Le Jardin des Bennes",
    logo: "/images/partners/le-jardin-des-bennes.jpg",
    links: [
      { label: "Facebook", url: "https://www.facebook.com/lejardin.desbennes.9/", type: "facebook" },
    ],
  },
  {
    name: "Ma Verte Forêt",
    logo: "/images/partners/ma-verte-foret.jpeg",
    links: [
      { label: "Site internet", url: "https://maverteforet.fr/", type: "website" },
      { label: "Facebook", url: "https://www.facebook.com/share/1DYRm1rnwT/", type: "facebook" },
    ],
  },
  {
    name: "La Ronde des Sources",
    logo: "/images/partners/la-ronde-des-sources.jpg",
    links: [
      { label: "Découvrir", url: "https://saint-amand-les-eaux.fr/la-ronde-des-sources-2", type: "website" },
    ],
  },
];
