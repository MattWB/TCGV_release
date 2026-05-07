import type { SyntheticEvent } from "react";

export default function LoginForm() {
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    window.dispatchEvent(
      new CustomEvent("tcgv:toast", {
        detail: {
          title: "Connexion",
          message: "Connexion simulée pour ce cas d'étude.",
          variant: "info",
        },
      }),
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block space-y-2 text-sm">
        <span className="font-semibold">Adresse email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="vous@exemple.com"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
        />
      </label>

      <label className="relative block space-y-2 text-sm">
        <span className="font-semibold">Mot de passe</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Mot de passe"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-clubwhite px-4 py-3 text-sm tcgv-focus"
        />
        <span className="absolute right-1 top-10 tcgv-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input
          name="remember"
          type="checkbox"
          className="mt-0.5 size-5 rounded border-gray-200 text-club tcgv-focus"
        />
        <span>Se souvenir de moi</span>
      </label>

      <button
        type="submit"
        className="tcgv-btn tcgv-btn--alt-outline tcgv-focus w-full justify-center cursor-pointer"
      >
        Se connecter
      </button>
    </form>
  );
}
