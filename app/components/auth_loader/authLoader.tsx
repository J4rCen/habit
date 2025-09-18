import { SCREEN_WIDTH } from "@/app/constants"
import React, { useEffect } from "react"
import { TouchableOpacity, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { AlertDialog, Text, YStack } from "tamagui"

export const LoadingScreen: React.FC = ({customLoaderTitle}: {customLoaderTitle?: string}) => {
	const progress = useSharedValue(0)

	useEffect(() => {
		progress.value = withRepeat(
			withTiming(1, {
				duration: 1500,
				easing: Easing.inOut(Easing.ease),
			}),
			-1,
			true
		)
	}, [])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scaleX: progress.value }],
	}))

	return (
		<YStack justifyContent="center" alignItems="center" backgroundColor="$dark" padding="$4">
			<Text fontSize="$6" marginBottom="$4" color='white'>
				{
					customLoaderTitle ?
					customLoaderTitle :
					'Загрузка...'
				
				}
			</Text>
			<View
				style={{
					height: 8,
					width: 200,
					backgroundColor: '#222831',
					borderRadius: 4,
					overflow: 'hidden',
				}}
			>
				<Animated.View
					style={[
						{
							height: '100%',
							backgroundColor: '#194A98',
							borderRadius: 4,
							transform: [{ scaleX: 0 }],
						},
						animatedStyle,
					]}
				/>
			</View>
		</YStack>
	)
}

const AuthLoader = (props: {
	title: string,
	message: string
	open: boolean
	isLoading: boolean
	setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
	customLoaderTitle?: string
}) => {
	return (
		<AlertDialog open={props.open}>
			<AlertDialog.Overlay
				key="overlay"
				backgroundColor="$shadow6"
				enterStyle={{ opacity: 0 }}
				exitStyle={{ opacity: 0 }}
			/>
			<AlertDialog.Content
				width={SCREEN_WIDTH - 20}
				backgroundColor="$dark"
				borderColor="$blue"
				borderWidth="$1.5"
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: [{ translateX: -((SCREEN_WIDTH - 20) / 2) }, { translateY: -100 }],
				}}
			>
				{
					props.isLoading ?
						<LoadingScreen /> :
						<YStack gap={'$4'}>
							<AlertDialog.Title fontSize={22} color={'white'}>
								{
									props.title
								}
							</AlertDialog.Title>

							<AlertDialog.Description fontSize={18} color={'white'}>
								{
									props.message
								}
							</AlertDialog.Description>

							<YStack
								alignItems="center"
								justifyContent="center"
							>
								<AlertDialog.Cancel asChild onPress={() => props.setOpenPopup(false)}>
									<TouchableOpacity
										style={{
											height: 40,
											width: '70%',
											backgroundColor: '#194A98',
											borderRadius: 10,
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<Text color={'white'} fontSize={16}>
											Закрыть
										</Text>
									</TouchableOpacity>
								</AlertDialog.Cancel>
							</YStack>
						</YStack>
				}
			</AlertDialog.Content>
		</AlertDialog>
	)
}

export default React.memo(AuthLoader)