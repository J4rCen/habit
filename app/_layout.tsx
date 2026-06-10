import PopUpDialog from '@/app/components/popup_dialog';
import customTamaguiConfig from "@/tamagui.config";
import * as Localization from 'expo-localization';
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PortalProvider, TamaguiProvider, View } from "tamagui";
import i18n from "./i18/i18";
import LoadingScreen from "./screens/loadingScreen";
import { useAppOpenAd } from './screens/yandex_ads';

import LocaleConfig from "./calendarsLocalConfig";
import useStore from "./store/zustand";

export default function RootLayout() {

	const [showLoading, setShowLoading] = useState(true);
	const appOpenAd = useAppOpenAd();
	const systemLanguage = useStore(state => state.systemLocale)
	const setSystemLanguage = useStore(state => state.setSystemLocal)
	const language = Localization.getLocales()[0]['languageCode']

	LocaleConfig.defaultLocale = systemLanguage;

	useEffect(() => {
		if (systemLanguage !== null) {
			i18n.changeLanguage(systemLanguage)
			return
		}

		if (systemLanguage === null && language) {
			setSystemLanguage(language)
			i18n.changeLanguage(language)
		}
	}, [systemLanguage])


	return (
		<SafeAreaProvider>
			<TamaguiProvider config={customTamaguiConfig}>
				<PortalProvider shouldAddRootHost>
					<PopUpDialog />
					<Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#222831' } }}>
						<Stack.Screen name="(tabs)" />
					</Stack>

					{showLoading &&
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
									// appOpenAd.show()
								}}
							/>
						</View>
					}
				</PortalProvider>
			</TamaguiProvider>
		</SafeAreaProvider>
	);
}