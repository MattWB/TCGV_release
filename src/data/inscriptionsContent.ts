import IconCheck from "@components/icons/IconCheck.astro";
import IconShield from "@components/icons/IconShield.astro";
import IconCalendar from "@components/icons/IconCalendar.astro";
import IconUsers from "@components/icons/IconUsers.astro";

export const hero = {
  title: "Votre inscription",
  subtitle: "Complétez votre inscription en quelques minutes",
  reassurance: ["Sans engagement", "Réponse sous 24h", "Premier cours offert"],
};

export const formules = {
  title: "Choisissez Votre Formule",
  subtitle: "Sélectionnez la formule qui correspond à vos besoins",
  note: "Tarifs mensuels • Sans engagement • Résiliation avec préavis de 30 jours",
  individuels: [
    {
      name: "Découverte",
      price: "45",
      period: "mois",
      features: [
        "Accès heures creuses",
        "1 cours collectif/semaine",
        "Vestiaires et douches",
        "Accès club-house",
      ],
    },
    {
      name: "Excellence",
      price: "85",
      period: "mois",
      badge: "Populaire",
      features: [
        "Accès illimité",
        "2 cours collectifs/semaine",
        "1 cours particulier/mois",
        "Tournois internes",
        "Spa et fitness",
        "Réduction pro-shop 10%",
      ],
    },
    {
      name: "Prestige",
      price: "150",
      period: "mois",
      features: [
        "Avantages Excellence",
        "4 cours particuliers/mois",
        "Réservation prioritaire",
        "Espace VIP",
        "Coaching personnalisé",
        "Analyse vidéo",
        "Stages gratuits",
      ],
    },
  ],
  familles: [
    {
      name: "Famille 3 personnes",
      price: "140",
      period: "mois",
      features: [
        "Accès illimité 3 personnes",
        "3 cours collectifs/semaine",
        "Animations familiales",
        "Vestiaires et douches",
        "Accès club-house",
      ],
    },
    {
      name: "Famille 4+ personnes",
      price: "180",
      period: "mois",
      badge: "Meilleur rapport",
      features: [
        "Accès illimité 4+ personnes",
        "5 cours collectifs/semaine",
        "Stages enfants inclus",
        "Animations familiales",
        "Réduction pro-shop 10%",
      ],
    },
  ],
};

export const inscription = {
  title: "Vos Informations",
  subtitle: "Complétez le formulaire pour finaliser votre inscription",
};

export const garanties = {
  title: "Nos Garanties",
  subtitle: "Une inscription simple, rapide et sécurisée",
  items: [
    {
      icon: IconShield,
      title: "Inscription Sécurisée",
      description:
        "Vos données sont protégées et traitées conformément au RGPD",
    },
    {
      icon: IconCheck,
      title: "Sans Engagement",
      description:
        "Résiliez à tout moment avec un simple préavis de 30 jours",
    },
    {
      icon: IconCalendar,
      title: "Activation Rapide",
      description:
        "Votre compte est activé sous 24h après validation de votre dossier",
    },
    {
      icon: IconUsers,
      title: "Accompagnement Personnalisé",
      description:
        "Notre équipe vous guide dès votre arrivée pour un démarrage optimal",
    },
  ],
  faqTitle: "Questions Fréquentes",
  faq: [
    {
      question: "Quand puis-je commencer ?",
      answer:
        "Dès réception de votre paiement et validation de votre dossier, vous pouvez accéder aux installations dans les 24h.",
    },
    {
      question: "Puis-je changer de formule ?",
      answer:
        "Oui, vous pouvez modifier votre formule à tout moment. Le changement sera effectif le mois suivant.",
    },
    {
      question: "Le matériel est-il fourni ?",
      answer:
        "Les raquettes peuvent être louées à l’accueil. Les balles sont fournies gratuitement pour les cours collectifs.",
    },
    {
      question: "Y a-t-il une période d’essai ?",
      answer:
        "Oui ! Nous offrons un cours d’essai gratuit avant votre inscription définitive pour découvrir nos installations.",
    },
  ],
};
