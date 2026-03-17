import { useMemo, useState } from "react";
import type { SyntheticEvent } from "react";

type PlanCategory = "individual" | "family";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  category: PlanCategory;
};

const plans: Plan[] = [
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

const levelOptions = [
  { value: "debutant", label: "Débutant - Je n'ai jamais joué" },
  { value: "initie", label: "Initié - Quelques bases" },
  { value: "intermediaire", label: "Intermédiaire - Je joue régulièrement" },
  { value: "avance", label: "Avancé - Bon niveau technique" },
  { value: "competiteur", label: "Compétiteur - Tournois et classement" },
];

const hearAboutOptions = [
  { value: "", label: "Sélectionnez une option" },
  { value: "ami", label: "Recommandation d'un ami" },
  { value: "internet", label: "Recherche Internet" },
  { value: "reseaux", label: "Réseaux sociaux" },
  { value: "passage", label: "En passant devant le club" },
  { value: "presse", label: "Article de presse" },
  { value: "autre", label: "Autre" },
];

const discountOptions = [
  { value: "", label: "Sélectionnez" },
  { value: "etudiant", label: "Étudiant (-20%)" },
  { value: "senior", label: "Senior (-15%)" },
  { value: "demandeur", label: "Demandeur d'emploi (-25%)" },
];

export default function SubscriptionFlow() {
  const [selectedCategory, setSelectedCategory] =
    useState<PlanCategory>("individual");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("excellence");
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availablePlans = useMemo(
    () => plans.filter((plan) => plan.category === selectedCategory),
    [selectedCategory],
  );

  // Rows (2 cols) + info "row has any badge"
  const planRows = useMemo(() => {
    const rows: { items: Plan[]; hasBadge: boolean }[] = [];

    for (let i = 0; i < availablePlans.length; i += 2) {
      const items = availablePlans.slice(i, i + 2);
      rows.push({
        items,
        hasBadge: items.some((p) => Boolean(p.badge)),
      });
    }

    return rows;
  }, [availablePlans]);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlanId) ?? availablePlans[0],
    [availablePlans, selectedPlanId],
  );

  const handleCategoryChange = (category: PlanCategory) => {
    setSelectedCategory(category);
    const next = plans.find((plan) => plan.category === category);
    if (next) {
      setSelectedPlanId(next.id);
    }
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setBirthDateError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const birthDateRaw = String(formData.get("birthDate") ?? "");
    if (!birthDateRaw) {
      setBirthDateError("Merci d’indiquer votre date de naissance.");
      return;
    }

    // Normalisation à minuit local (évite les surprises de timezone)
    const birthDate = new Date(birthDateRaw);
    const today = new Date();
    birthDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // Règle 1 : pas dans le futur
    if (birthDate > today) {
      setBirthDateError("La date de naissance ne peut pas être dans le futur.");
      return;
    }

    // Règle 2 : âge minimum 6 ans
    const minAgeYears = 6;
    const minBirthDate = new Date(today);
    minBirthDate.setFullYear(today.getFullYear() - minAgeYears);

    // Il faut être né AU PLUS TARD à minBirthDate
    if (birthDate > minBirthDate) {
      setBirthDateError("L’inscription nécessite un âge minimum de 6 ans.");
      return;
    }

    setSubmitted(true);

    window.dispatchEvent(
      new CustomEvent("tcgv:toast", {
        detail: {
          title: "Inscriptions",
          message: "Inscription simulee - voir console",
          variant: "success",
        },
      }),
    );
  };

  return (
    <div className="space-y-8 mt-4">
      <section className="card-premium still p-6 md:p-8">
        <div className="space-y-5">
          <header className="space-y-2">
            <h3 className="text-xl font-semibold text-left tracking-tight">
              Votre formule
            </h3>
          </header>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={`tcgv-pill tcgv-focus transition-colors ${
                selectedCategory === "individual"
                  ? "tcgv-pill--primary"
                  : "tcgv-pill--muted hover:tcgv-pill--soft"
              }`}
              aria-pressed={selectedCategory === "individual"}
              onClick={() => handleCategoryChange("individual")}
            >
              Individuel
            </button>
            <button
              type="button"
              className={`tcgv-pill tcgv-focus transition-colors ${
                selectedCategory === "family"
                  ? "tcgv-pill--primary"
                  : "tcgv-pill--muted hover:tcgv-pill--soft"
              }`}
              aria-pressed={selectedCategory === "family"}
              onClick={() => handleCategoryChange("family")}
            >
              Famille
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {planRows.flatMap((row) =>
              row.items.map((plan) => {
                const isActive = plan.id === selectedPlan?.id;

                return (
                  <div key={plan.id} className="flex flex-col">
                    {row.hasBadge ? (
                      <div className="hidden h-8 items-center md:flex">
                        {plan.badge ? (
                          <span className="tcgv-pill tcgv-pill--primary text-xs">
                            {plan.badge}
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      aria-pressed={isActive}
                      className={`card-premium tcgv-focus text-left transition-all ${
                        isActive
                          ? "border border-primary/40 shadow-md"
                          : "border border-transparent hover:border-clubblack/10"
                      } p-4`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold tracking-tight">
                            {plan.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {plan.price} € / {plan.period}
                          </p>
                        </div>

                        <span
                          className={`mt-1 grid size-5 place-items-center rounded-full border ${
                            isActive
                              ? "border-primary bg-primary/10"
                              : "border-clubblack/15"
                          }`}
                          aria-hidden="true"
                        >
                          <span
                            className={`block size-3 rounded-full ${
                              isActive ? "bg-primary" : "bg-transparent"
                            }`}
                          />
                        </span>
                      </div>
                    </button>
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </section>

      <section className="card-premium still p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Formule sélectionnée
            </p>
            <p className="text-base text-left text-muted-foreground">
              {selectedPlan?.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold tracking-tight">
              {selectedPlan?.price} €
            </p>
            <p className="text-sm text-muted-foreground">
              / {selectedPlan?.period}
            </p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="card-premium still p-6 md:p-8">
        <div className="space-y-8">
          <fieldset className="space-y-6 text-left">
            <legend className="text-lg font-semibold tracking-tight">
              Informations Personnelles
            </legend>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold">
                  Prénom <span className="text-primary">*</span>
                </span>
                <input
                  name="firstName"
                  type="text"
                  required
                  placeholder="Jean"
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-semibold">
                  Nom <span className="text-primary">*</span>
                </span>
                <input
                  name="lastName"
                  type="text"
                  required
                  placeholder="Dupont"
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-semibold">
                  Email <span className="text-primary">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="jean.dupont@email.com"
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-semibold">
                  Téléphone <span className="text-primary">*</span>
                </span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="06 12 34 56 78"
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm">
              <span className="font-semibold">
                Date de naissance <span className="text-primary">*</span>
              </span>
              <input
                name="birthDate"
                type="date"
                required
                max={new Date().toISOString().slice(0, 10)}
                aria-invalid={birthDateError ? "true" : "false"}
                onChange={() => setBirthDateError(null)}
                className="w-full rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
              />
              {birthDateError && (
                <p className="text-xs text-primary" role="alert">
                  {birthDateError}
                </p>
              )}
            </label>
          </fieldset>

          <fieldset className="space-y-6 text-left">
            <legend className="text-lg font-semibold tracking-tight">
              Adresse
            </legend>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="space-y-2 text-sm">
                <span className="font-semibold">
                  Adresse complète <span className="text-primary">*</span>
                </span>
                <input
                  name="address"
                  type="text"
                  required
                  placeholder="12 rue des Acacias"
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-semibold">
                  Ville <span className="text-primary">*</span>
                </span>
                <input
                  name="city"
                  type="text"
                  required
                  placeholder="Paris"
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="font-semibold">
                  Code postal <span className="text-primary">*</span>
                </span>
                <input
                  name="postalCode"
                  type="text"
                  required
                  placeholder="75001"
                  className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="flex flex-col justify-between space-y-6 text-left">
            <legend className="text-lg font-semibold tracking-tight">
              Informations Complémentaires
            </legend>

            <label className="space-y-2 text-sm">
              <span className="font-semibold">Votre niveau actuel</span>
              <select
                name="level"
                defaultValue="debutant"
                className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-semibold">
                Comment avez-vous connu le club ?
              </span>
              <select
                name="hearAbout"
                className="w-full mt-2 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
              >
                {hearAboutOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm">
              <span className="font-semibold">
                Qu'attendez-vous du club ? (optionnel)
              </span>
              <textarea
                name="motivation"
                rows={4}
                placeholder="Partagez vos objectifs, vos attentes..."
                className="w-full mt-2 resize-none rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
              />
            </label>
          </fieldset>

          <fieldset className="space-y-4 text-left">
            <legend className="text-lg font-semibold tracking-tight">
              Tarifs Réduits
            </legend>

            <label className="flex items-center gap-3 text-sm">
              <input
                name="hasDiscount"
                type="checkbox"
                checked={hasDiscount}
                onChange={(event) => setHasDiscount(event.target.checked)}
                className="size-5 rounded border-gray-200 text-primary tcgv-focus"
              />
              <span>Je bénéficie d'un tarif réduit</span>
            </label>

            {hasDiscount && (
              <div className="space-y-2 pl-8">
                <label className="space-y-2 text-sm">
                  <span className="font-semibold">Type de réduction</span>
                  <select
                    name="discountType"
                    aria-describedby="discount-hint"
                    className="w-full mt-1 rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
                  >
                    {discountOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <p id="discount-hint" className="text-xs text-muted-foreground">
                  Un justificatif vous sera demandé lors de la validation de
                  votre inscription
                </p>
              </div>
            )}
          </fieldset>

          <fieldset className="space-y-4 text-left">
            <legend className="text-lg font-semibold tracking-tight">
              Conditions
            </legend>

            <label className="flex items-start gap-3 text-sm">
              <input
                name="acceptTerms"
                type="checkbox"
                required
                className="mt-0.5 size-5 rounded border-gray-200 text-primary tcgv-focus"
              />
              <span>
                J'accepte les conditions générales et le règlement intérieur du
                club <span className="text-primary">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm">
              <input
                name="acceptNewsletter"
                type="checkbox"
                className="mt-0.5 size-5 rounded border-gray-200 text-primary tcgv-focus"
              />
              <span>
                J'accepte de recevoir la newsletter mensuelle et les
                informations du club
              </span>
            </label>
          </fieldset>

          <div className="space-y-3">
            <button
              type="submit"
              className="tcgv-btn tcgv-btn--cta tcgv-focus w-full justify-center cursor-pointer"
            >
              Valider mon inscription
            </button>
            {submitted && (
              <p className="text-sm text-muted-foreground" role="status">
                Merci ! Votre demande a bien été envoyée. Nous revenons vers
                vous rapidement.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
