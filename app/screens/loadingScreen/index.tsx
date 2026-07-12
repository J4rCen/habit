import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/app/constants"
import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Animated, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, YStack } from "tamagui"

export const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {

	const [progress] = useState(new Animated.Value(0))
	const opacity = useRef(new Animated.Value(1)).current;
	const {t} = useTranslation()

	useEffect(() => {
		Animated.timing(progress, {
			toValue: SCREEN_WIDTH - 20,
			duration: 3000,
			useNativeDriver: false,
		}).start(() => {
			Animated.timing(opacity, {
				toValue: 0,
				duration: 600,
				useNativeDriver: true,
			}).start(onFinish);
		});
	}, []);

	return (
		<Animated.View style={{ opacity }}>
			<View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
				<SafeAreaView>
					<View height={SCREEN_HEIGHT} backgroundColor='$dark' >
						<YStack height={SCREEN_HEIGHT * 0.9} alignItems="center">
							<View height={'80%'} justifyContent="center">
								<Image source={require('@/assets/images/adaptive-icon.png')} style={styles.logo} />
							</View>
							<View height={'20%'} justifyContent="center">
								<Text
									color={'white'}
									fontSize={24}
									textAlign="center"
								>
									{t('loadingScreen.loading')}
								</Text>
								<View
									height={15}
									width={SCREEN_WIDTH - 20}
									alignItems="flex-start"
									overflow="hidden"
									borderRadius={10}
									backgroundColor="#393E46"
								>
									<Animated.View
										style={[
											styles.progressBar,
											{
												width: progress,
											},
										]}
									/>
								</View>
							</View>
						</YStack>
					</View>
				</SafeAreaView>
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	logo: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
	progressBar: {
		height: "100%",
		backgroundColor: "#194A98",
	},
});

export default React.memo(LoadingScreen)