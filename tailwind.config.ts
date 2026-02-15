import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Landing page colors
                "primary": "#fa2742", // Crimson Red
                "primary-dark": "#d01932",
                "background-light": "#e8eae3", // Cream Base
                "background-dark": "#373833", // Charcoal Base
                "surface-dark": "#2d2e2a", // Slightly darker charcoal for cards
                "surface-darker": "#242522", // Deep contrast
                "accent-secondary": "#373833", // Charcoal as secondary accent
                "text-main": "#373833", // Charcoal text
                "text-light": "#e8eae3", // Cream text

                // Dashboard colors (aliases for consistency)
                "cream": "#e8eae3",
                "charcoal": "#373833",
                "charcoal-light": "#4a4b45",
                "crimson": "#fa2742",
                "crimson-dark": "#d41f36",
                "crimson-light": "#ff5c70",
                "surface": "#ffffff",
                "surface-alt": "#f4f5f2",
                "border-color": "#d1d3cd",

                // Editorial/Practice test colors
                "editorial-cream": "#e8eae3",
                "editorial-charcoal": "#373833",
                "editorial-text": "#1a1a18",
                "editorial-bg-question": "#f0f2ed",
                "editorial-bg-answer": "#e8eae3",
                "editorial-surface": "#ffffff",
            },
            fontFamily: {
                "sans": ["var(--font-inter)", "sans-serif"],
                "serif": ["var(--font-merriweather)", "serif"],
                "display": ["var(--font-inter)", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0px",
                "sm": "2px",
                "md": "4px",
                "lg": "2px",
                "xl": "4px",
                "2xl": "8px",
                "full": "9999px"
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            boxShadow: {
                'subtle': '0 1px 2px rgba(55, 56, 51, 0.05)',
                'card': '4px 4px 0px 0px rgba(55, 56, 51, 1)',
                'card-hover': '2px 2px 0px 0px rgba(55, 56, 51, 1)',
            }
        },
    },
    plugins: [],
};
export default config;
