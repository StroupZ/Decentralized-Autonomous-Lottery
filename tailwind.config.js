/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                bungeeHairline: ["Bungee Hairline", "cursive"],
                textMeOne: ["Text Me One", "sans-serif"],
            },
        },
    },
    plugins: [],
}
