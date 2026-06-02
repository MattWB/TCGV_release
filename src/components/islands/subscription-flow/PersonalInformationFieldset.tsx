import { getTodayLocalDateInputValue } from "../../../utils/subscriptionValidation";
import { fieldClassName, fieldWithoutMarginClassName } from "./classNames";

type PersonalInformationFieldsetProps = {
  birthDateError: string | null;
  onBirthDateChange: () => void;
  legend?: string;
  firstNameName?: string;
  firstNameLabel?: string;
  firstNamePlaceholder?: string;
  lastNameName?: string;
  lastNameLabel?: string;
  lastNamePlaceholder?: string;
  emailName?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneName?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  birthDateName?: string;
  birthDateLabel?: string;
  maxBirthDate?: string;
  showBirthDate?: boolean;
  required?: boolean;
};

export function PersonalInformationFieldset({
  birthDateError,
  onBirthDateChange,
  legend = "Informations Personnelles",
  firstNameName = "firstName",
  firstNameLabel = "Prénom",
  firstNamePlaceholder = "Jean",
  lastNameName = "lastName",
  lastNameLabel = "Nom",
  lastNamePlaceholder = "Dupont",
  emailName = "email",
  emailLabel = "Email",
  emailPlaceholder = "jean.dupont@email.com",
  phoneName = "phone",
  phoneLabel = "Téléphone",
  phonePlaceholder = "06 12 34 56 78",
  birthDateName = "birthDate",
  birthDateLabel = "Date de naissance",
  maxBirthDate = getTodayLocalDateInputValue(),
  showBirthDate = true,
  required = true,
}: PersonalInformationFieldsetProps) {
  return (
    <fieldset className="space-y-6 text-left">
      <legend className="text-lg font-semibold tracking-tight">{legend}</legend>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {firstNameLabel}{" "}
            {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={firstNameName}
            type="text"
            required={required}
            placeholder={firstNamePlaceholder}
            className={fieldClassName}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {lastNameLabel}{" "}
            {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={lastNameName}
            type="text"
            required={required}
            placeholder={lastNamePlaceholder}
            className={fieldClassName}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {emailLabel} {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={emailName}
            type="email"
            autoComplete="email"
            required={required}
            placeholder={emailPlaceholder}
            className={fieldClassName}
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {phoneLabel} {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={phoneName}
            type="tel"
            autoComplete="tel"
            required={required}
            placeholder={phonePlaceholder}
            className={fieldClassName}
          />
        </label>
      </div>

      {showBirthDate && (
        <label className="space-y-2 text-sm">
          <span className="font-semibold">
            {birthDateLabel}{" "}
            {required && <span className="text-primary">*</span>}
          </span>
          <input
            name={birthDateName}
            type="date"
            required={required}
            max={maxBirthDate}
            aria-invalid={birthDateError ? "true" : "false"}
            onChange={onBirthDateChange}
            className={fieldWithoutMarginClassName}
          />
          {birthDateError && (
            <p className="text-xs text-primary" role="alert">
              {birthDateError}
            </p>
          )}
        </label>
      )}
    </fieldset>
  );
}
