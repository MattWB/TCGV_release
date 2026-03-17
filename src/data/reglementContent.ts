// ICONS
import IconFileText from "@components/icons/IconFileText.astro";
import IconCalendar from "@components/icons/IconCalendar.astro";
import IconShield from "@components/icons/IconShield.astro";
import IconUsers from "@components/icons/IconUsers.astro";
import IconKey from "@components/icons/IconKey.astro";
import IconAlertCircle from "@components/icons/IconAlertCircle.astro";
import IconAward from "@components/icons/IconAward.astro";

// DATA
export const hero = {
  title: "Règlement intérieur",
  subtitle: "Les règles de vie de notre club",
  watermark: "Règlement",
};

export const meta = {
  versionLabel: "Version du 1er janvier 2026",
  badgeLabel: "Document officiel",
  intro:
    "Le présent règlement intérieur définit les règles de fonctionnement, les droits et les obligations de chaque membre du club. Il a été adopté par le conseil d'administration et approuvé en assemblée générale.",
};

export const toc = [
  {
    id: "adhesion",
    label: "Article 1 — Adhésion et cotisations",
    Icon: IconUsers,
  },
  { id: "acces", label: "Article 2 — Accès aux installations", Icon: IconKey },
  {
    id: "comportement",
    label: "Article 3 — Comportement et respect",
    Icon: IconShield,
  },
  {
    id: "reservation",
    label: "Article 4 — Réservation des courts",
    Icon: IconCalendar,
  },
  {
    id: "enseignement",
    label: "Article 5 — Enseignement et cours",
    Icon: IconAward,
  },
  {
    id: "securite",
    label: "Article 6 — Sécurité et responsabilité",
    Icon: IconAlertCircle,
  },
  {
    id: "final",
    label: "Article 7 — Dispositions finales",
    Icon: IconFileText,
  },
];

export const articles = [
  {
    id: "adhesion",
    number: "1",
    title: "Adhésion et cotisations",
    Icon: IconUsers,
    sections: [
      {
        number: "1.1",
        title: "Conditions d'adhésion",
        paragraphs: [
          "L'adhésion au club est ouverte à toute personne physique, sans discrimination d'âge, de sexe, d'origine ou de niveau de jeu. Les mineurs doivent être représentés par leur représentant légal lors de l'inscription.",
        ],
      },
      {
        number: "1.2",
        title: "Cotisations",
        paragraphs: [
          "Les cotisations annuelles sont fixées par le conseil d'administration et votées en assemblée générale. Elles comprennent :",
        ],
        bullets: [
          "La cotisation de base donnant accès aux installations",
          "Les éventuels frais d'inscription et licences fédérales",
          "Les suppléments optionnels (cours, stages, compétitions)",
        ],
      },
      {
        number: "1.3",
        title: "Démission et radiation",
        paragraphs: [
          "Toute démission doit être notifiée par écrit au secrétariat. En cas de non-paiement de la cotisation ou de manquement grave au règlement, le conseil d'administration peut prononcer la radiation du membre après l'avoir entendu.",
        ],
      },
    ],
  },
  {
    id: "acces",
    number: "2",
    title: "Accès aux installations",
    Icon: IconKey,
    sections: [
      {
        number: "2.1",
        title: "Horaires d'ouverture",
        paragraphs: [
          "Le club est ouvert tous les jours de 8h à 22h, sauf jours fériés et fermeture annuelle. Les horaires peuvent être modifiés ponctuellement pour des événements spéciaux ou des travaux de maintenance.",
        ],
      },
      {
        number: "2.2",
        title: "Badge d'accès",
        paragraphs: [
          "Chaque membre reçoit un badge personnel d'accès aux installations. Ce badge est strictement personnel et ne doit être prêté à aucun tiers. En cas de perte, un nouveau badge sera délivré moyennant un forfait de remplacement de 15€.",
        ],
      },
      {
        number: "2.3",
        title: "Invités",
        paragraphs: [
          "Chaque membre peut inviter un non-membre dans la limite de 3 fois par an et par invité, moyennant un droit de jeu. L'invité doit être accompagné par le membre et inscrit à l'accueil avant de jouer.",
        ],
      },
    ],
  },
  {
    id: "comportement",
    number: "3",
    title: "Comportement et respect",
    Icon: IconShield,
    sections: [
      {
        number: "3.1",
        title: "Tenue et attitude",
        paragraphs: [
          "Une tenue sportive correcte et appropriée est exigée sur les courts. Les chaussures doivent être adaptées au type de surface (terre battue, dur, padel). Sont notamment interdits :",
        ],
        bullets: [
          "Les chaussures à semelles noires ou marquantes",
          "Les comportements agressifs ou irrespectueux",
          "Les propos discriminatoires de toute nature",
        ],
      },
      {
        number: "3.2",
        title: "Respect des installations",
        paragraphs: [
          "Chaque membre s'engage à respecter les installations, le matériel mis à disposition et à maintenir la propreté des lieux. Toute dégradation volontaire sera facturée au responsable et pourra entraîner des sanctions.",
        ],
      },
      {
        number: "3.3",
        title: "Esprit sportif",
        paragraphs: [
          "Le fair-play et l'esprit sportif doivent guider le comportement de chaque membre, tant sur les courts qu'en dehors. Le club promeut des valeurs de respect, de convivialité et de solidarité.",
        ],
      },
    ],
  },
  {
    id: "reservation",
    number: "4",
    title: "Réservation des courts",
    Icon: IconCalendar,
    sections: [
      {
        number: "4.1",
        title: "Système de réservation",
        paragraphs: [
          "Les réservations se font exclusivement via l'application mobile du club ou le site internet. Les membres peuvent réserver jusqu'à 7 jours à l'avance, dans la limite de 3 créneaux par semaine en période de forte affluence.",
        ],
      },
      {
        number: "4.2",
        title: "Annulation",
        paragraphs: [
          "Toute annulation doit être effectuée au moins 24 heures à l'avance pour libérer le créneau. Les annulations tardives répétées (plus de 3 par trimestre) peuvent entraîner une limitation temporaire des droits de réservation.",
        ],
      },
      {
        number: "4.3",
        title: "Retard et durée",
        paragraphs: [
          "Les créneaux sont d'1h30 en simple et 2h en double. Un retard de plus de 15 minutes entraîne la libération automatique du court. Les joueurs doivent libérer le court à l'heure prévue si une réservation suit.",
        ],
      },
    ],
  },
  {
    id: "enseignement",
    number: "5",
    title: "Enseignement et cours",
    Icon: IconAward,
    sections: [
      {
        number: "5.1",
        title: "Enseignants diplômés",
        paragraphs: [
          "Tous les cours dispensés au club sont assurés par des enseignants diplômés d'État. Il est interdit de donner des cours rémunérés au sein du club sans autorisation expresse du conseil d'administration.",
        ],
      },
      {
        number: "5.2",
        title: "Inscription aux cours",
        paragraphs: [
          "Les inscriptions aux cours collectifs et stages se font auprès du secrétariat selon les modalités et tarifs en vigueur. Les cours particuliers peuvent être réservés directement auprès des enseignants.",
        ],
      },
      {
        number: "5.3",
        title: "Assiduité",
        paragraphs: [
          "La régularité et l'assiduité sont essentielles à la progression. Les cours non pris ne sont ni remboursés ni reportés, sauf en cas d'absence prolongée justifiée (maladie, accident).",
        ],
      },
    ],
  },
  {
    id: "securite",
    number: "6",
    title: "Sécurité et responsabilité",
    Icon: IconAlertCircle,
    sections: [
      {
        number: "6.1",
        title: "Assurance",
        paragraphs: [
          "Tous les membres doivent être couverts par une assurance responsabilité civile. La licence fédérale inclut cette assurance. Le club décline toute responsabilité en cas d'accident ou de vol dans ses installations.",
        ],
      },
      {
        number: "6.2",
        title: "Aptitude médicale",
        paragraphs: [
          "La pratique sportive nécessite une bonne condition physique. Il est recommandé de consulter un médecin avant toute pratique intensive. Un certificat médical peut être demandé pour les compétitions officielles.",
        ],
      },
      {
        number: "6.3",
        title: "Situations d'urgence",
        paragraphs: [
          "Un défibrillateur automatique est disponible à l'accueil. En cas d'urgence, prévenir immédiatement le personnel du club qui contactera les services de secours. Les numéros d'urgence sont affichés dans tous les locaux.",
        ],
      },
    ],
  },
];

export const finalArticle = {
  id: "final",
  numberLabel: "Article 7",
  label: "Dispositions finales",
  paragraphs: [
    {
      number: "7.1",
      strong: "Modification du règlement :",
      text: " Le présent règlement peut être modifié par le conseil d'administration. Les modifications sont portées à la connaissance des membres par affichage et publication sur le site internet du club.",
    },
    {
      number: "7.2",
      strong: "Acceptation :",
      text: " L'adhésion au club implique l'acceptation pleine et entière du présent règlement intérieur. Chaque membre s'engage à le respecter et à le faire respecter.",
    },
    {
      number: "7.3",
      strong: "Sanctions :",
      text: " En cas de manquement au règlement, le conseil d'administration peut prononcer des sanctions allant de l'avertissement à l'exclusion définitive, après avoir entendu le membre concerné.",
    },
    {
      number: "7.4",
      strong: "Litiges :",
      text: " En cas de litige concernant l'interprétation ou l'application du présent règlement, le conseil d'administration statue en dernier ressort, conformément aux statuts de l'association.",
    },
  ],
};

export const legal = {
  title: "Informations légales",
  items: [
    {
      strong: "Document officiel :",
      text: " Le présent règlement intérieur a été adopté par le conseil d'administration en date du 15 décembre 2025 et approuvé par l'assemblée générale ordinaire du 20 décembre 2025.",
    },
    {
      strong: "Version :",
      text: " Version 3.0 — Entrée en vigueur le 1er janvier 2026. Ce document annule et remplace toutes les versions précédentes.",
    },
    {
      strong: "Consultation :",
      text: " Le règlement intérieur est affiché dans les locaux du club et disponible en permanence sur le site internet. Il peut être consulté ou téléchargé à tout moment.",
    },
    {
      strong: "Contact :",
      text: " Pour toute question concernant l'interprétation ou l'application du présent règlement, vous pouvez contacter le secrétariat du club ou le président.",
    },
  ],
  lastUpdate: "Dernière mise à jour : 1er janvier 2026",
};
