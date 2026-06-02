import type { Plan } from "../../../data/subscriptionOptions";

type PlanCardProps = {
  plan: Plan;
  isActive: boolean;
  showBadgeSlot: boolean;
  onSelect: () => void;
};

export function PlanCard({
  plan,
  isActive,
  showBadgeSlot,
  onSelect,
}: PlanCardProps) {
  return (
    <div className="flex flex-col">
      {showBadgeSlot ? (
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
        onClick={onSelect}
        aria-pressed={isActive}
        className={`card-premium tcgv-focus text-left transition-all ${
          isActive
            ? "border border-primary/40 shadow-md"
            : "border border-transparent hover:border-clubblack/10"
        } p-4`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold tracking-tight">{plan.name}</p>
            <p className="text-sm text-muted-foreground">
              {plan.price} € / {plan.period}
            </p>
          </div>

          <span
            className={`mt-1 grid size-5 place-items-center rounded-full border ${
              isActive ? "border-primary bg-primary/10" : "border-clubblack/15"
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
}
