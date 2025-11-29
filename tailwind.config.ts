import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FCD34D',
        'purple': '#A855F7',
        'indigo': '#4338CA',
        'emerald': '#10B981',
        'rose': '#F472B6',
        'magenta': '#EC4899',
        'sky': '#7DD3FC',
      },
    },
  },
  plugins: [],
}
export default config
