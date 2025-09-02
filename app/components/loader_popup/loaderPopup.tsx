import { SCREEN_WIDTH } from "@/app/constants"
import React, { useEffect } from "react"
import { TouchableOpacity, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { AlertDialog, Text, XStack, YStack } from "tamagui"

const LoadingScreen: React.FC = () => {
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
			<Text fontSize="$6" marginBottom="$4" color='white'>Загрузка...</Text>
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

interface ILoaderPopup {
	title: string
	message: string
	isLoader: boolean
	openPopup: boolean,
	setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
	startLoader: boolean,
	setStartLoader: React.Dispatch<React.SetStateAction<boolean>>
}

const LoaderPopup = (title: string, message: string, isLoader: boolean, openPopup: boolean, setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>) => {
	return (
		<AlertDialog open={openPopup}>
			<AlertDialog.Overlay
				key="overlay"
				opacity={0}
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
					isLoader ?
						<LoadingScreen /> :
						<YStack gap={'$4'}>
							<AlertDialog.Title fontSize={22} color={'white'}>{title}</AlertDialog.Title>
							<AlertDialog.Description fontSize={18} color={'white'}>
								{message}
							</AlertDialog.Description>
							<YStack
								alignItems="center"
								justifyContent="center"
							>

								
								<AlertDialog.Cancel asChild onPress={() => setOpenPopup(false)}>
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

								<XStack gap={10}>
									<AlertDialog.Cancel asChild onPress={() => setOpenPopup(false)}>
										<TouchableOpacity
											style={{
												height: 40,
												width: '40%',
												backgroundColor: '#393E46',
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
									<AlertDialog.Action asChild>
										<TouchableOpacity
											style={{
												height: 40,
												width: '40%',
												backgroundColor: '#194A98',
												borderRadius: 10,
												justifyContent: 'center',
												alignItems: 'center'
											}}
										>
											<Text color={'white'} fontSize={16}>
												Ок
											</Text>
										</TouchableOpacity>
									</AlertDialog.Action>
								</XStack>

							</YStack>
						</YStack>
				}
			</AlertDialog.Content>
		</AlertDialog>
	)
}

export default LoaderPopup