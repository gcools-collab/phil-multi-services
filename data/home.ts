export const customerTypes = [
  {
    title: "Particuliers",
    description:
      "Pour un appareil en panne, une pièce détachée, une location ou du matériel reconditionné.",
  },
  {
    title: "Professionnels",
    description:
      "Pour l’équipement de votre commerce ou votre matériel professionnel, avec un contact direct.",
  },
] as const;

export const repairSteps = [
  { title: "Expliquez le problème", description: "Décrivez simplement l’appareil et la panne rencontrée." },
  { title: "Partagez les informations utiles", description: "Phil vous indique les éléments utiles ou vous accueille en boutique." },
  { title: "Phil étudie la situation", description: "Il recherche la solution la plus adaptée selon le matériel et le besoin." },
  { title: "Une solution selon le cas", description: "Réparation, pièce détachée ou conseil selon ce qui est possible." },
] as const;
