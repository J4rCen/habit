import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from '@tamagui/core';

const customTamaguiConfig = createTamagui({
	...defaultConfig,
	tokens: {
		...defaultConfig.tokens,
		color: {
			white: '#ffffff',
			green: '#229C15',
			red: '#791113',
			dark: '#222831',
			blue: '#194A98',
			gray: '#393E46',
		},
	},
	media: {
		...defaultConfig.media,
		sm: { maxWidth: 360 },
		md: { minWidth: 361, maxWidth: 420 },
		lg: { minWidth: 421 }
	},
	settings: {
		disableSSR: true,
	},
})

type Config = typeof customTamaguiConfig

declare module 'tamagui' {
	interface CustomTamaguiConfig extends Config { }
}

export default customTamaguiConfig