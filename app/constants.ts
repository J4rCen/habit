import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_WIDTH_400 = SCREEN_WIDTH < 400
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const DATE_FORMAT = 'YYYY-MM-DD'
export const REFRESH_NOTIFICATION = 'REFRESH_NOTIFICATION'
export const ACCESS_TOKEN = 'access_token'
export const KEY_APP_OPEN_ADS = "demo-appopenad-yandex" //"R-M-17186042-1";