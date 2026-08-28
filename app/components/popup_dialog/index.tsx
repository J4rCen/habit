import { SCREEN_WIDTH } from "@/app/constants"
import useStore from "@/app/store/zustand"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Modal, TouchableOpacity, View } from "react-native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { Text, YStack } from "tamagui"

export const LoadingScreen: React.FC = ({ customLoaderTitle }: { customLoaderTitle?: string }) => {
	const progress = useSharedValue(0)
	const { t } = useTranslation()

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

	const load = t('settings.loading')

	return (
		<YStack justifyContent="center" alignItems="center" backgroundColor="$dark" padding="$4">
			<Text fontSize="$6" marginBottom="$4" color='white'>
				{
					customLoaderTitle ?
						customLoaderTitle :
						load
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

const PopUpDialog = () => {
	const { t } = useTranslation()
	const dialog = useStore(state => state.dialog)
	const setDialog = useStore(state => state.setConfigDialog)

	return (
		<Modal
			visible={dialog.open}
			transparent={true}
			animationType="fade"
			statusBarTranslucent={true}
			onRequestClose={() => setDialog({ open: false })}
		>
			<TouchableOpacity
				activeOpacity={1}
				style={{
					flex: 1,
					backgroundColor: 'rgba(0,0,0,0.6)',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					activeOpacity={1}
					onPress={(e) => e.stopPropagation()}
					style={{
						width: SCREEN_WIDTH - 20,
						backgroundColor: '#222831',
						borderRadius: 10,
						borderWidth: 1.5,
						borderColor: '#194A98',
						padding: 16,
						position: 'absolute',
						top: '50%',
						transform: [{ translateY: -100 }],
					}}
				>
					{dialog.isLoading ? (
						<LoadingScreen />
					) : (
						<YStack gap={'$4'}>
							<Text fontSize={22} color={'white'}>
								{t(`${dialog.title}`)}
							</Text>

							<Text fontSize={18} color={'white'}>
								{t(`${dialog.message}`)}
							</Text>

							<YStack alignItems="center" justifyContent="center">
								<TouchableOpacity
									onPress={() => setDialog({ open: false })}
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
										{t('settings.close')}
									</Text>
								</TouchableOpacity>
							</YStack>
						</YStack>
					)}
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	)
}

export default React.memo(PopUpDialog)