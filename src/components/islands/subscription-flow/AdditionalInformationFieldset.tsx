import {
  hearAboutOptions as defaultHearAboutOptions,
  levelOptions as defaultLevelOptions,
} from "../../../data/subscriptionOptions";
import { fieldClassName, textareaClassName } from "./classNames";

type SelectOption = {
  value: string;
  label: string;
};

type AdditionalInformationFieldsetProps = {
  legend?: string;
  levelName?: string;
  levelLabel?: string;
  levelOptions?: SelectOption[];
  defaultLevel?: string;
  showLevel?: boolean;
  hearAboutName?: string;
  hearAboutLabel?: string;
  hearAboutOptions?: SelectOption[];
  showHearAbout?: boolean;
  motivationName?: string;
  motivationLabel?: string;
  motivationPlaceholder?: string;
  motivationRows?: number;
  showMotivation?: boolean;
};

export function AdditionalInformationFieldset({
  legend = "Informations Complémentaires",
  levelName = "level",
  levelLabel = "Votre niveau actuel",
  levelOptions = defaultLevelOptions,
  defaultLevel = "debutant",
  showLevel = true,
  hearAboutName = "hearAbout",
  hearAboutLabel = "Comment avez-vous connu le club ?",
  hearAboutOptions = defaultHearAboutOptions,
  showHearAbout = true,
  motivationName = "motivation",
  motivationLabel = "Qu'attendez-vous du club ? (optionnel)",
  motivationPlaceholder = "Partagez vos objectifs, vos attentes...",
  motivationRows = 4,
  showMotivation = true,
}: AdditionalInformationFieldsetProps) {
  return (
    <fieldset className="flex flex-col justify-between space-y-6 text-left">
      <legend className="text-lg font-semibold tracking-tight">{legend}</legend>

      {showLevel && (
        <label className="space-y-2 text-sm">
          <span className="font-semibold">{levelLabel}</span>
          <select
            name={levelName}
            defaultValue={defaultLevel}
            className={fieldClassName}
          >
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      )}

      {showHearAbout && (
        <label className="space-y-2 text-sm">
          <span className="font-semibold">{hearAboutLabel}</span>
          <select name={hearAboutName} className={fieldClassName}>
            {hearAboutOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      )}

      {showMotivation && (
        <label className="space-y-2 text-sm">
          <span className="font-semibold">{motivationLabel}</span>
          <textarea
            name={motivationName}
            rows={motivationRows}
            placeholder={motivationPlaceholder}
            className={textareaClassName}
          />
        </label>
      )}
    </fieldset>
  );
}
