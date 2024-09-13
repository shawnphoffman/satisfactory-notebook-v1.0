import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			screens: {
				// xs: '500px',
				// Print media
				// print: { raw: 'print' },
			},
			borderColor: {
				DEFAULT: colors.stone['400'],
			},
			colors: {
				primary: {
					// This is #F2C800 (Official Satisfactory)
					// It's closest to yellow-400 #FACC15
					DEFAULT: 'rgb(242 200 0)',
					// This is #ECAD00 (Official Satisfactory)
					// It's closest to yellow-500 #EAB308
					dark: 'rgb(236 173 0)',
				},
				secondary: {
					DEFAULT: colors.amber['500'],
					dark: colors.orange['600'],
				},
				sidebar: {
					DEFAULT: colors.stone['300'],
					dark: colors.stone['500'],
				},
				background: {
					DEFAULT: colors.stone['900'],
				},
				muted: colors.stone['700'],
				alt: {
					sky: colors.sky['600'],
					green: colors.green['600'],
					purple: colors.purple['600'],
				},
				// sidebar: colors.neutral['800']
			},
		},
	},
	plugins: [],
}
export default config

/**
 *
 *
 *
 */
