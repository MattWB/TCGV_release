import type { PlanCategory } from "../../../data/subscriptionOptions";
import type { PlanRow } from "./planRows";
import { PlanCard } from "./PlanCard";

type PlanSelectionSectionProps = {
  selectedCategory: PlanCategory;
  selectedPlanId: string | undefined;
  planRows: PlanRow[];
  onCategoryChange: (category: PlanCategory) => void;
  onPlanSelect: (planId: string) => void;
};

const planCategories: { value: PlanCategory; label: string }[] = [
  { value: "individual", label: "Individuel" },
  { value: "family", label: "Famille" },
];

export function PlanSelectionSection({
  selectedCategory,
  selectedPlanId,
  planRows,
  onCategoryChange,
  onPlanSelect,
}: PlanSelectionSectionProps) {
  return (
    <section className="card-premium still p-6 md:p-8">
      <div className="space-y-5">
        <header className="space-y-2">
          <h3 className="text-xl font-semibold text-left tracking-tight">
            Votre formule
          </h3>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          {planCategories.map((category) => {
            const isActive = selectedCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                className={`tcgv-pill tcgv-focus transition-colors ${
                  isActive
                    ? "tcgv-pill--primary"
                    : "tcgv-pill--muted hover:tcgv-pill--soft"
                }`}
                aria-pressed={isActive}
                onClick={() => onCategoryChange(category.value)}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {planRows.flatMap((row) =>
            row.items.map((plan) => {
              const isActive = plan.id === selectedPlanId;

              return (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isActive={isActive}
                  showBadgeSlot={row.hasBadge}
                  onSelect={() => onPlanSelect(plan.id)}
                />
              );
            }),
          )}
        </div>
      </div>
    </section>
  );
}
