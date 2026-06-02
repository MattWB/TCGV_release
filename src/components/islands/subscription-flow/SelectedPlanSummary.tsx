import type { Plan } from "../../../data/subscriptionOptions";

type SelectedPlanSummaryProps = {
  plan: Plan | undefined;
};

export function SelectedPlanSummary({ plan }: SelectedPlanSummaryProps) {
  return (
    <section className="card-premium still p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold tracking-tight">
            Formule sélectionnée
          </p>
          <p className="text-base text-left text-muted-foreground">
            {plan?.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold tracking-tight">
            {plan?.price} €
          </p>
          <p className="text-sm text-muted-foreground">/ {plan?.period}</p>
        </div>
      </div>
    </section>
  );
}
