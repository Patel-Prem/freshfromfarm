/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                destructive: "hsl(var(--destructive))",

                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    border: "hsl(var(--primary-border))",
                },

                secondary: "hsl(var(--secondary))",

                border: {
                    DEFAULT: "hsl(var(--border))",
                },

                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--foreground))",
                    border: "hsl(var(--card-border))"
                },

                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                    background: "hsl(var(--muted-background))",
                }
            },
        },
    },
    plugins: [],
}
