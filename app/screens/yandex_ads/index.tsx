import { KEY_APP_OPEN_ADS } from '@/app/constants';
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import {
	AdRequestConfiguration,
	AppOpenAdLoader,
} from "yandex-mobile-ads";

export function useAppOpenAd() {
	const appOpenRef = useRef<any>(null);
	const loaderRef = useRef<any>(null);
	const appStateRef = useRef(AppState.currentState);

	const loadAd = async () => {
		if (!loaderRef.current) return;

		const config = new AdRequestConfiguration({
			adUnitId: KEY_APP_OPEN_ADS,
			contextQuery: "habits-app",
		});

		const ad = await loaderRef.current.loadAd(config).catch((err: any) => {
			console.error("Ошибка loadAd:", err);
			return null;
		});

		if (!ad) return;

		appOpenRef.current = ad;

		ad.onAdShown = () => console.log("AppOpen: показано");

		ad.onAdDismissed = () => {
			console.log("AppOpen: закрыто");
			appOpenRef.current = null;
			loadAd();
		};

		ad.onAdFailedToShow = (err: any) => {
			console.warn("AppOpen: ошибка показа", err);
			appOpenRef.current = null;
			loadAd();
		};
	};

	useEffect(() => {
		(async () => {
			const loader = await AppOpenAdLoader.create().catch((err) =>
				console.error("Ошибка AppOpenAdLoader:", err)
			);
			if (!loader) return;
			loaderRef.current = loader;

			await loadAd();

			const sub = AppState.addEventListener("change", (state) => {
				if (state === "active" && appOpenRef.current) {
					appOpenRef.current.show();
				}
				appStateRef.current = state;
			});

			return () => sub.remove();
		})();
	}, []);

	return {
		show: () => {
			if (appOpenRef.current) {
				try {
					appOpenRef.current.show();
				} catch (err) {
					console.warn("Ошибка show:", err);
				}
			} else {
				console.log("AppOpenAd пока не загружено");
			}
		},
	};
}
