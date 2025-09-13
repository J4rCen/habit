import customTamaguiConfig from "@/tamagui.config";
import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider, View } from "tamagui";
import LoadingScreen from "./screens/loadingScreen";
import { useAppOpenAd } from './screens/yandex_ads';

export default function RootLayout() {

	const [showLoading, setShowLoading] = useState(true);
	const appOpenAd = useAppOpenAd();
	
	return (
		<SafeAreaProvider>
			<TamaguiProvider config={customTamaguiConfig}>

				<Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#222831' } }}>
					<Stack.Screen name="(tabs)" />
				</Stack>

				{ showLoading &&
					<View style={{
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}}>
						<LoadingScreen
							onFinish={async () => {
								setShowLoading(false);
								appOpenAd.show()
							}}
						/>
					</View>
				}
			</TamaguiProvider>
		</SafeAreaProvider>
	);
}