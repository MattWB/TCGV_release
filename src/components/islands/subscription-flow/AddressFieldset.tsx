import { fieldClassName } from "./classNames";

type AddressFieldsetProps = {
  legend?: string;
  addressName?: string;
  addressLabel?: string;
  addressPlaceholder?: string;
  cityName?: string;
  cityLabel?: string;
  cityPlaceholder?: string;
  postalCodeName?: string;
  postalCodeLabel?: string;
  postalCodePlaceholder?: string;
  required?: boolean;
};

export function AddressFieldset({
  legend = "Adresse",
  addressName = "address",
  addressLabel = "Adresse complète",
  addressPlaceholder = "12 rue des Acacias",
  cityName = "city",
  cityLabel = "Ville",
  cityPlaceholder = "Paris",
  postalCodeName = "postalCode",
  postalCodeLabel = "Code postal",
  postalCodePlaceholder = "75001",
  required = true,
}: AddressFieldsetProps) {
  return (
    <fieldset className="space-y-6 text-left">
      <legend className="text-lg font-semibold tracking-tight">{legend}</legend>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {addressLabel} {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={addressName}
            type="text"
            required={required}
            placeholder={addressPlaceholder}
            className={fieldClassName}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {cityLabel} {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={cityName}
            type="text"
            required={required}
            placeholder={cityPlaceholder}
            className={fieldClassName}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {postalCodeLabel}{" "}
            {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={postalCodeName}
            type="text"
            required={required}
            placeholder={postalCodePlaceholder}
            className={fieldClassName}
          />
        </label>
      </div>
    </fieldset>
  );
}
