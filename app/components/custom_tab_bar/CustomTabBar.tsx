import { SCREEN_WIDTH } from "@/app/constants"
import { ClipboardIcon, Settings, Statistics } from "@/app/svgs/navigation"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { XStack } from "tamagui"

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {

	const icons = [ClipboardIcon, Statistics, Settings]
	const inset = useSafeAreaInsets().bottom

	const [insetHeight, setInsetHeight] = useState<number | null>(null)

	return (
		<XStack
			backgroundColor={'$gray'}
			borderTopLeftRadius={20}
			borderTopRightRadius={20}
			$sm={{
				height: 70 + inset
			}}
			$md={{
				height: 80 + inset
			}}
			$lg={{
				height: 90 + inset
			}}
			width={SCREEN_WIDTH}
			onLayout={e => setInsetHeight(e.nativeEvent.layout.height)}
		>
			{
				state.routes.map((item, index) => {
					const Icon = icons[index]
					const isFocus = state.index === index

					return (
						<XStack
							key={item.key}
							onPress={() => navigation.navigate(item.name)}
							flex={1}
							height={insetHeight ? insetHeight - inset : '90%'}
							justifyContent="center"
							alignItems="center"
						>
							<Icon 
								size='38'
								color={isFocus ? '#194A98' : '#222831'} 
							/>
						</XStack>
					)
				})
			}
		</XStack>
	)
}

export default CustomTabBar