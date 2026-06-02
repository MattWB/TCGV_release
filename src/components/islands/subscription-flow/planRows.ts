import type { Plan } from "../../../data/subscriptionOptions";

export type PlanRow = {
  items: Plan[];
  hasBadge: boolean;
};

export function getPlanRows(plans: Plan[]): PlanRow[] {
  const rows: PlanRow[] = [];

  for (let i = 0; i < plans.length; i += 2) {
    const items = plans.slice(i, i + 2);
    rows.push({
      items,
      hasBadge: items.some((plan) => Boolean(plan.badge)),
    });
  }

  return rows;
}
