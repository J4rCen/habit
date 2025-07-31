import { Dayjs } from "dayjs";

const Months: { [key: string]: string } = {
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
}

const dateConversion = (data: Dayjs) => {

    const days = data.format('DD')
    const months = Months[data.format('MM')]
    const years = data.format('YYYY')

    return `${days} ${months} ${years}`
}

export default dateConversion