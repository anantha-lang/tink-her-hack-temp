/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Sora', 'system-ui', 'sans-serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
}
