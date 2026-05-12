import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import localEn from './locales/en'
import localRu from './locales/ru'

const resources = {
    'ru': {translation: localRu},
    'en': {translation: localEn}
}

if (!i18n.isInitialized) {
    i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })
}

export default i18n