import { KEY_APP_OPEN_ADS } from '@/app/constants';
import { useEffect, useRef } from "react";
import {
	AdRequestConfiguration,
	AppOpenAdLoader,
	MobileAds,
} from "yandex-mobile-ads";

export function useAppOpenAd() {
	const appOpenRef = useRef<any>(null);

	const loadAd = async () => {

		try {
			const loader = await AppOpenAdLoader.create().catch((err) => {
				console.error("Ошибка AppOpenAdLoader:", err)
				return
			});
			if (!loader) return;

			const config = new AdRequestConfiguration({
				adUnitId: KEY_APP_OPEN_ADS,
				contextQuery: "habits-app",
			});

			const ad = await loader.loadAd(config).catch((err: any) => {
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

		} catch (error) {
			console.error(error)
		}
	};

	useEffect(() => {
		(async () => {

			await MobileAds.initialize()
			await loadAd();
			
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
