module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        primary: "#0050cb",
        "primary-container": "#0066ff",
        "on-primary": "#ffffff",
        background: "#faf8ff",
        "on-surface": "#191b24",
        "on-surface-variant": "#424656",
        "surface-container-low": "#f2f3ff",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#c2c6d8",
        "secondary-container": "#6cfe9f",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "tertiary-fixed": "#ffdcc2",
      },
      animation: {
        "fadeIn": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(-6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
