/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Mali"', "cursive", "sans-serif"],
        mali: ['"Mali"', "cursive", "sans-serif"],
      },
      colors: {
        kei: {
          purple: "#8504cf",
          purpleDark: "#6a02a8",
          lilac: "#B589D6",
          pink: "#f6c8df",
          pinkLight: "#ffe7f8",
          fuchsia: "#f13076",
          yellow: "#fddf59",
          gold: "#FFD166",
          mint: "#1ec9a0",
          teal: "#2dd4bf",
          ink: "#474747",
          muted: "#79716b",
        },
      },
    },
  },
  plugins: [],
};
