import { Dayjs } from "dayjs";
import useStore from "../store/zustand";

const Months: { [key: string]: { [key: string]: string } } = {
    'ru': {
        '01': 'Января',
        '02': 'Февраля',
        '03': 'Марта',
        '04': 'Апреля',
        '05': 'Мая',
        '06': 'Июня',
        '07': 'Июля',
        '08': 'Августа',
        '09': 'Сентября',
        '10': 'Октября',
        '11': 'Ноября',
        '12': 'Декабря',
    },
    'en': {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    }
}

const dateConversion = (data: Dayjs) => {

    const systemLanguage = useStore.getState().systemLocale ?? 'en'

    const days = data.format('DD')
    const months = Months[systemLanguage]?.[data.format('MM')] || ''
    const years = data.format('YYYY')

    return `${days} ${months} ${years}`
}

export default dateConversion