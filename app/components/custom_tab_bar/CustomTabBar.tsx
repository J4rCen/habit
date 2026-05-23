import { SCREEN_WIDTH } from "@/app/constants"
import { ClipboardIcon, Settings, Statistics } from "@/app/svgs/navigation"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useMedia, XStack } from "tamagui"

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {

	const icons = [ClipboardIcon, Statistics, Settings]
	const media = useMedia()

	return (
		<XStack
			backgroundColor={'$gray'}
			borderTopLeftRadius={20}
			borderTopRightRadius={20}
			$sm={{
				height: 70
			}}
			$md={{
				height: 80
			}}
			$lg={{
				height: 90
			}}
			width={SCREEN_WIDTH}
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
							height={'100%'}
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