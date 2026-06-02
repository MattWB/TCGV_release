export type PlanCategory = "individual" | "family";

export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  category: PlanCategory;
};

export const plans: Plan[] = [
  {
    id: "decouverte",
    name: "Découverte",
    price: "45",
    period: "mois",
    category: "individual",
  },
  {
    id: "excellence",
    name: "Excellence",
    price: "85",
    period: "mois",
    badge: "Populaire",
    category: "individual",
  },
  {
    id: "prestige",
    name: "Prestige",
    price: "150",
    period: "mois",
    category: "individual",
  },
  {
    id: "famille3",
    name: "Famille 3 personnes",
    price: "140",
    period: "mois",
    category: "family",
  },
  {
    id: "famille4",
    name: "Famille 4+ personnes",
    price: "180",
    period: "mois",
    badge: "Meilleur rapport",
    category: "family",
  },
];

export const levelOptions = [
  { value: "debutant", label: "Débutant - Je n'ai jamais joué" },
  { value: "initie", label: "Initié - Quelques bases" },
  { value: "intermediaire", label: "Intermédiaire - Je joue régulièrement" },
  { value: "avance", label: "Avancé - Bon niveau technique" },
  { value: "competiteur", label: "Compétiteur - Tournois et classement" },
];

export const hearAboutOptions = [
  { value: "", label: "Sélectionnez une option" },
  { value: "ami", label: "Recommandation d'un ami" },
  { value: "internet", label: "Recherche Internet" },
  { value: "reseaux", label: "Réseaux sociaux" },
  { value: "passage", label: "En passant devant le club" },
  { value: "presse", label: "Article de presse" },
  { value: "autre", label: "Autre" },
];

export const discountOptions = [
  { value: "", label: "Sélectionnez" },
  { value: "etudiant", label: "Étudiant (-20%)" },
  { value: "senior", label: "Senior (-15%)" },
  { value: "demandeur", label: "Demandeur d'emploi (-25%)" },
];
