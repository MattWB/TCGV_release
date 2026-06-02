type SubmitSectionProps = {
  submitted: boolean;
  submitLabel: string;
  successMessage: string;
};

export function SubmitSection({
  submitted,
  submitLabel,
  successMessage,
}: SubmitSectionProps) {
  return (
    <div className="space-y-3">
      <button
        type="submit"
        className="tcgv-btn tcgv-btn--cta tcgv-focus w-full justify-center cursor-pointer"
      >
        {submitLabel}
      </button>
      {submitted && (
        <p className="text-sm text-muted-foreground" role="status">
          {successMessage}
        </p>
      )}
    </div>
  );
}
