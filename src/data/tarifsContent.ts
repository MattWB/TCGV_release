// DATA
export const hero = {
  title: "Tarifs & Adhésions",
  subtitle: "Des formules adaptées à chaque profil de pratique",
  watermark: "Tarifs",
};

export const introParagraph = {
  text: "Débutants, joueurs réguliers et compétiteurs peuvent choisir une formule adaptée à leur niveau, leur rythme et leurs objectifs sportifs.",
};

export const pricingPlans = [
  {
    name: "Découverte",
    subtitle: "Pour s'initier",
    price: "45",
    period: "mois",
    description:
      "Idéal pour les débutants qui souhaitent découvrir le tennis ou le padel.",
    features: [
      "Accès aux courts aux heures creuses",
      "1 cours collectif par semaine",
      "Vestiaires et douches",
      "Accès club-house",
      "Réservation en ligne",
    ],
    highlight: false,
  },
  {
    name: "Excellence",
    subtitle: "La plus populaire",
    price: "85",
    period: "mois",
    description: "Notre formule complète pour les joueurs réguliers.",
    features: [
      "Accès illimité aux courts",
      "2 cours collectifs par semaine",
      "1 cours particulier par mois",
      "Participation aux tournois internes",
      "Vestiaires et spa",
      "Accès salle de fitness",
      "10% de réduction pro-shop",
    ],
    highlight: true,
  },
  {
    name: "Prestige",
    subtitle: "Formule complète",
    price: "150",
    period: "mois",
    description: "Pour les passionnés exigeants qui recherchent l'excellence.",
    features: [
      "Tous les avantages Excellence",
      "4 cours particuliers par mois",
      "Réservation prioritaire des courts",
      "Accès à l'espace VIP",
      "Coaching personnalisé",
      "Suivi performance avec analyse vidéo",
      "Participation gratuite aux stages",
      "Service de cordage gratuit (1/mois)",
    ],
    highlight: false,
  },
];

export const familyPlans = [
  {
    name: "Famille 3 personnes",
    price: "140",
    period: "mois",
    description: "Formule avantageuse pour toute la famille.",
    features: [
      "Accès illimité pour 3 personnes",
      "3 cours collectifs par semaine au total",
      "Participation aux animations familiales",
      "Vestiaires et douches",
      "Accès club-house",
    ],
    highlight: false,
  },
  {
    name: "Famille 4+ personnes",
    price: "180",
    period: "mois",
    description: "L'offre idéale pour les grandes familles.",
    features: [
      "Accès illimité pour 4 personnes ou plus",
      "5 cours collectifs par semaine au total",
      "Stages enfants inclus (vacances scolaires)",
      "Participation aux animations familiales",
      "Vestiaires et douches",
      "Accès club-house",
      "10% de réduction pro-shop",
    ],
    highlight: false,
  },
];

export const benefits = [
  {
    title: "Sans engagement",
    description:
      "Toutes nos formules sont mensuelles et résiliables à tout moment avec un préavis de 30 jours.",
  },
  {
    title: "Essai gratuit",
    description:
      "Profitez de 7 jours d'essai gratuit pour découvrir nos installations et notre ambiance.",
  },
  {
    title: "Paiement flexible",
    description:
      "Des modalités de paiement mensuelles ou annuelles sont proposées lors de l'adhésion.",
  },
  {
    title: "Conditions d'adhésion",
    description:
      "Les conditions d'inscription, de résiliation et les modalités associées sont précisées lors de votre adhésion.",
  },
  {
    title: "Frais d'adhésion",
    description:
      "Inscription unique de 50€ incluant votre carte de membre et votre pack de bienvenue.",
  },
  {
    title: "Tarifs réduits",
    description:
      "Tarifs préférentiels pour étudiants (-20%), seniors (-15%) et demandeurs d'emploi (-25%).",
  },
];

export const practical = {
  title: "Informations pratiques",
  blocks: [
    {
      title: "Modalités d'inscription",
      body: "L'inscription se fait en ligne ou sur place à l'accueil. Vous recevrez votre carte de membre sous 48h et pourrez immédiatement profiter de nos installations.",
    },
    {
      title: "Documents à fournir",
      list: [
        "Pièce d'identité en cours de validité",
        "Certificat médical de non contre-indication (moins de 1 an)",
        "Photo d'identité pour votre carte de membre",
        "RIB pour le prélèvement automatique (optionnel)",
      ],
    },
    {
      title: "Services additionnels",
      body: "Location de matériel, cours particuliers supplémentaires, stages intensifs, coaching personnalisé… De nombreux services à la carte sont disponibles pour compléter votre formule.",
    },
    {
      title: "Nous contacter",
      body: "Une question sur nos tarifs ? Notre équipe est à votre disposition pour vous renseigner et vous accompagner dans le choix de la formule la plus adaptée.",
    },
  ],
};
