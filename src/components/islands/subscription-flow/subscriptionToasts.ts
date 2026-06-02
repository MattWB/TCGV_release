import { showToast } from "../../../utils/toast";

export function notifyBirthDateError(message: string) {
  showToast({
    title: "Date de naissance",
    message,
    variant: "error",
  });
}

export function notifySubscriptionSuccess() {
  showToast({
    title: "Inscriptions",
    message: "Inscription simulée pour ce cas d'étude.",
    variant: "success",
  });
}

export function notifyIncompleteForm() {
  showToast({
    title: "Formulaire incomplet",
    message: "Veuillez vérifier les champs signalés avant de valider.",
    variant: "error",
  });
}
