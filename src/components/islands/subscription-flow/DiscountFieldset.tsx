import { discountOptions as defaultDiscountOptions } from "../../../data/subscriptionOptions";
import { checkboxClassName, compactFieldClassName } from "./classNames";

type DiscountOption = {
  value: string;
  label: string;
};

type DiscountFieldsetProps = {
  hasDiscount: boolean;
  onHasDiscountChange: (hasDiscount: boolean) => void;
  legend?: string;
  checkboxName?: string;
  checkboxLabel?: string;
  selectName?: string;
  selectLabel?: string;
  options?: DiscountOption[];
  hint?: string;
  hintId?: string;
};

export function DiscountFieldset({
  hasDiscount,
  onHasDiscountChange,
  legend = "Tarifs Réduits",
  checkboxName = "hasDiscount",
  checkboxLabel = "Je bénéficie d'un tarif réduit",
  selectName = "discountType",
  selectLabel = "Type de réduction",
  options = defaultDiscountOptions,
  hint = "Un justificatif vous sera demandé lors de la validation de votre inscription",
  hintId = "discount-hint",
}: DiscountFieldsetProps) {
  return (
    <fieldset className="space-y-4 text-left">
      <legend className="text-lg font-semibold tracking-tight">{legend}</legend>

      <label className="flex items-center gap-3 text-sm">
        <input
          name={checkboxName}
          type="checkbox"
          checked={hasDiscount}
          onChange={(event) => onHasDiscountChange(event.target.checked)}
          className={checkboxClassName}
        />
        <span>{checkboxLabel}</span>
      </label>

      {hasDiscount && (
        <div className="space-y-2 pl-8">
          <label className="space-y-2 text-sm">
            <span className="font-semibold">{selectLabel}</span>
            <select
              name={selectName}
              aria-describedby={hintId}
              className={compactFieldClassName}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        </div>
      )}
    </fieldset>
  );
}
