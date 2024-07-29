// eslint-disable-next-line no-undef
const svgToDataUri = require("mini-svg-data-uri");

const {
    default: flattenColorPalette,
    // eslint-disable-next-line no-undef
} = require("tailwindcss/lib/util/flattenColorPalette");

// tailwind.config.js
// eslint-disable-next-line no-undef
const {nextui} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",

        "./node_modules/@nextui-org/theme/dist/components/(button|progress|modal).js",
    ],
    theme: {
        screens: {
            xs: "400px",
            // => @media (min-width: 640px) { ... }

            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }
        },
        extend: {
            animation: {
                aurora: "aurora 60s linear infinite",
                "meteor-effect": "meteor 5s linear infinite",
            },
            keyframes: {
                aurora: {
                    from: {
                        backgroundPosition: "50% 50%, 50% 50%",
                    },
                    to: {
                        backgroundPosition: "90% 50%, 90% 50%",
                    },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui(),
        addVariablesForColors,
        function ({matchUtilities, theme}) {
            matchUtilities(
                {
                    "bg-grid": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                    "bg-grid-small": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                    "bg-dot": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
                        )}")`,
                    }),
                },
                {values: flattenColorPalette(theme("backgroundColor")), type: "color"}
            );
        },
    ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({addBase, theme}) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}
