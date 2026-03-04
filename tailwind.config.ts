import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#f0f7ff',
                    100: '#e0effe',
                    200: '#bae0fd',
                    300: '#7dcbfc',
                    400: '#38b1f8',
                    500: '#0e97e9',
                    600: '#0279c7',
                    700: '#0360a1',
                    800: '#075285',
                    900: '#0c446e',
                    950: '#082b49',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

export default config
