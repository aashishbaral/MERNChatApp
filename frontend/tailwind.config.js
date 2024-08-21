/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        right: "3px 0 3px #D3D3D3",
        "custom-shadow": "0 6px 12px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        primary: {
          DEFAULT: "#B0E0E6",
          light: "#B0E0E6",
        },
        secondary: {
          DEFAULT: "#AEC6CF",
          light: "#AEC6CF",
        },
        accent: {
          DEFAULT: "#e1aeae",
          light: "#e9c3c3",
          lighter: "#e5cec2",
        },
        lighter: {
          DEFAULT: "#f1f5f9",
        },
        gold: {
          DEFAULT: "#FBBF24",
        },
        softGray: {
          DEFAULT: "#D3D3D3",
        },
        darker: {
          DEFAULT: "#020617",
        },
        green: {
          DEFAULT: "#066c60",
        },
        rose: {
          DEFAULT: "#e11d48",
        },
      },
      fontSize: {
        xxs: ["0.5rem", { lineHeight: "0.75rem" }],
        title: "clamp(1.3rem, 2vw, 1.6rem)",
        p: "clamp(0.8rem, 2vw, 1.3rem)",
        small: "clamp(0.7rem, 1vw, 1rem)",
      },
      spacing: {
        fluid: "clamp(2rem, 1vw, 3.5rem)",
        fluid2: "clamp(1rem, 1vw, 2rem)",
      },
      screens: {
        xxs: "275px",
        xs: "475px",
        xxl: "1560px",
      },
    },
  },
  plugins: [],
};
