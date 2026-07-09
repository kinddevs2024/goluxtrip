/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101820",
        navy: "#02213D",
        asphalt: "#26323f",
        line: "#e5e7eb",
        lightbg: "#f8f9fa",
        gltBlue: "#2877b2",
        gltOrange: "#e45118"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(16, 24, 32, 0.10)"
      }
    }
  },
  plugins: []
};

