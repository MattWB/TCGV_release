import { useMemo, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { plans, type PlanCategory } from "../../../data/subscriptionOptions";
import { validateBirthDate } from "../../../utils/subscriptionValidation";
import { getPlanRows } from "./planRows";
import {
  notifyBirthDateError,
  notifyIncompleteForm,
  notifySubscriptionSuccess,
} from "./subscriptionToasts";

export function useSubscriptionFlow() {
  const [selectedCategory, setSelectedCategory] =
    useState<PlanCategory>("individual");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("excellence");
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const invalidToastShownRef = useRef(false);

  const availablePlans = useMemo(
    () => plans.filter((plan) => plan.category === selectedCategory),
    [selectedCategory],
  );

  const planRows = useMemo(() => getPlanRows(availablePlans), [availablePlans]);

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
    setSubmitted(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const birthDateRaw = String(formData.get("birthDate") ?? "");
    const nextBirthDateError = validateBirthDate(birthDateRaw);

    if (nextBirthDateError) {
      setBirthDateError(nextBirthDateError);
      notifyBirthDateError(nextBirthDateError);
      return;
    }

    setSubmitted(true);
    notifySubscriptionSuccess();
  };

  const handleInvalidCapture = () => {
    setSubmitted(false);

    if (invalidToastShownRef.current) {
      return;
    }

    invalidToastShownRef.current = true;
    notifyIncompleteForm();

    window.setTimeout(() => {
      invalidToastShownRef.current = false;
    }, 0);
  };

  return {
    selectedCategory,
    selectedPlan,
    planRows,
    birthDateError,
    hasDiscount,
    submitted,
    setBirthDateError,
    setHasDiscount,
    setSelectedPlanId,
    handleCategoryChange,
    handleSubmit,
    handleInvalidCapture,
  };
}
