import { AdditionalInformationFieldset } from "./subscription-flow/AdditionalInformationFieldset";
import { AddressFieldset } from "./subscription-flow/AddressFieldset";
import { ConditionsFieldset } from "./subscription-flow/ConditionsFieldset";
import { DiscountFieldset } from "./subscription-flow/DiscountFieldset";
import { PersonalInformationFieldset } from "./subscription-flow/PersonalInformationFieldset";
import { PlanSelectionSection } from "./subscription-flow/PlanSelectionSection";
import { SelectedPlanSummary } from "./subscription-flow/SelectedPlanSummary";
import { SubmitSection } from "./subscription-flow/SubmitSection";
import { useSubscriptionFlow } from "./subscription-flow/useSubscriptionFlow";

export default function SubscriptionFlow() {
  const {
    selectedCategory,
    selectedPlan,
    planRows,
    birthDateError,
    hasDiscount,
    submitted,
    setSelectedPlanId,
    setHasDiscount,
    setBirthDateError,
    handleCategoryChange,
    handleSubmit,
    handleInvalidCapture,
  } = useSubscriptionFlow();

  const handleBirthDateChange = () => {
    setBirthDateError(null);
  };

  return (
    <div className="space-y-8 mt-4">
      <PlanSelectionSection
        selectedCategory={selectedCategory}
        selectedPlanId={selectedPlan?.id}
        planRows={planRows}
        onCategoryChange={handleCategoryChange}
        onPlanSelect={setSelectedPlanId}
      />

      <SelectedPlanSummary plan={selectedPlan} />
      <form
        onSubmit={handleSubmit}
        onInvalidCapture={handleInvalidCapture}
        className="card-premium still p-6 md:p-8"
      >
        <div className="space-y-8">
          <PersonalInformationFieldset
            birthDateError={birthDateError}
            onBirthDateChange={handleBirthDateChange}
          />

          <AddressFieldset />

          <AdditionalInformationFieldset />

          <DiscountFieldset
            hasDiscount={hasDiscount}
            onHasDiscountChange={setHasDiscount}
          />

          <ConditionsFieldset />

          <SubmitSection
            submitted={submitted}
            submitLabel="Valider mon inscription"
            successMessage="Merci ! Votre demande a bien été envoyée. Nous revenons vers vous rapidement."
          />
        </div>
      </form>
    </div>
  );
}
