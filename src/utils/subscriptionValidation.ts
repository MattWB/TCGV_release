const minimumSubscriptionAgeYears = 6;

function parseLocalDateInput(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  date.setHours(0, 0, 0, 0);

  return date;
}

function formatLocalDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayLocalDateInputValue() {
  return formatLocalDateInputValue(new Date());
}

export function validateBirthDate(value: string): string | null {
  if (!value) {
    return "Merci d’indiquer votre date de naissance.";
  }

  const birthDate = parseLocalDateInput(value);

  if (!birthDate) {
    return "Merci d’indiquer votre date de naissance.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birthDate > today) {
    return "La date de naissance ne peut pas être dans le futur.";
  }

  const minBirthDate = new Date(today);
  minBirthDate.setFullYear(today.getFullYear() - minimumSubscriptionAgeYears);

  if (birthDate > minBirthDate) {
    return "L’inscription nécessite un âge minimum de 6 ans.";
  }

  return null;
}
