import React from "react"
import { Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, ViewStyle, YStack, YStackProps } from "tamagui"

interface IContainerWrapSettings {
	vw?: ViewStyle,
	ys?: YStackProps,
}

const width = Dimensions.get('window').width

const ContainerWrap = ({ children, config }: { children: React.ReactNode, config?: IContainerWrapSettings }) => {
	return (
		<View
			flex={1}
			width={width}
			backgroundColor={'$dark'} 
			{...config?.vw}
		>
			<SafeAreaView style={{flex: 1, width: '100%'}}>
				<YStack
					flex={1}
				>
					{children}
				</YStack>
			</SafeAreaView>
		</View>
	)
}

export default React.memo(ContainerWrap)