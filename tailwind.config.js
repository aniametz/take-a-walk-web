/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#343a36",
      secondary: "#567868",
      background: "#e3e0d9",
      danger: "#8f3a37",
      slate: "#9cafb3",
      offWhite: "#f8f7f6",
    },
    minWidth: {
      xl: "28px",
    },
  },
  plugins: [],
};
