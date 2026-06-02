import { checkboxTopAlignedClassName } from "./classNames";

type ConditionsFieldsetProps = {
  legend?: string;
  termsName?: string;
  termsLabel?: string;
  termsRequired?: boolean;
  newsletterName?: string;
  newsletterLabel?: string;
  showNewsletter?: boolean;
};

export function ConditionsFieldset({
  legend = "Conditions",
  termsName = "acceptTerms",
  termsLabel = "J'accepte les conditions générales et le règlement intérieur du club",
  termsRequired = true,
  newsletterName = "acceptNewsletter",
  newsletterLabel = "J'accepte de recevoir la newsletter mensuelle et les informations du club",
  showNewsletter = true,
}: ConditionsFieldsetProps) {
  return (
    <fieldset className="space-y-4 text-left">
      <legend className="text-lg font-semibold tracking-tight">{legend}</legend>

      <label className="flex items-start gap-3 text-sm">
        <input
          name={termsName}
          type="checkbox"
          required={termsRequired}
          className={checkboxTopAlignedClassName}
        />
        <span>
          {termsLabel}{" "}
          {termsRequired && <span className="text-primary">*</span>}
        </span>
      </label>

      {showNewsletter && (
        <label className="flex items-start gap-3 text-sm">
          <input
            name={newsletterName}
            type="checkbox"
            className={checkboxTopAlignedClassName}
          />
          <span>{newsletterLabel}</span>
        </label>
      )}
    </fieldset>
  );
}
