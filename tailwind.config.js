/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        'color-change': {
          '0%, 100%': { backgroundColor: '#3490dc' },  // Blue
          '25%': { backgroundColor: '#38b2ac' },  // Teal
          '50%': { backgroundColor: '#f56565' },  // Red
          '75%': { backgroundColor: '#ecc94b' },  // Yellow
        },
      },
      animation: {
        'color-change': 'color-change 3s ease-in-out infinite',
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
}

