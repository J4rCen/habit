import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/app/constants"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, ViewStyle, YStack, YStackProps } from "tamagui"

interface IContainerWrapSettings {
	vw?: ViewStyle,
	ys?: YStackProps,
}

const ContainerWrap = ({ children, config }: { children: React.ReactNode, config?: IContainerWrapSettings }) => {
	return (
		<View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT} {...config?.vw}>
			<SafeAreaView>
				<YStack
					height={SCREEN_HEIGHT}
					width={SCREEN_WIDTH}
					justifyContent="center"
					alignItems="center"
					{...config?.ys}
				>
					{children}
				</YStack>
			</SafeAreaView>
		</View>
	)
}

export default React.memo(ContainerWrap)