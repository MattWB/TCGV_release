module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  safelist: [
    "translate-x-0",
    "translate-x-full",
    "-translate-x-full",
    "opacity-0",
    "opacity-100",
    "z-10",
    "z-20",
    "duration-700",
    "ease-in-out",
  ],
};
