import { DATE_FORMAT } from "@/app/constants";
import { IHabitTask } from "@/app/store/zustand";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { YStack } from "tamagui";

LocaleConfig.locales['ru'] = {
    monthNames: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    monthNamesShort: [
        'Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь',
        'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'
    ],
    dayNames: [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня'
};
LocaleConfig.defaultLocale = 'ru';

interface ICalendarChart {
    dataStart: string,
    statistics: IHabitTask['habitStatic'],
    pastDays: number,
    habitStart: string
}

const CalendarChart = ({ dataStart, statistics, pastDays, habitStart}: ICalendarChart) => {

    const [currentMonth, setCurrentMonth] = useState<string>(dataStart as string)
    const [disableArrowLeft, setDisableArrowLeft] = useState<boolean>(dayjs(dayjs(currentMonth).subtract(1, 'month')).isBefore(dataStart as string))


    const onMonthChange = (month: { dateString: string }) => {

        const newData = month.dateString
        setCurrentMonth(newData)

        if (dayjs(dayjs(newData).subtract(1, 'month')).isBefore(dataStart as string)) {
            setDisableArrowLeft(true)
            return
        }

        setDisableArrowLeft(false)
    }

    const checkingProgress = () => {
        const statistic: Record<string, { selected: boolean, selectedColor: string }> = {}

        Array.from({ length: pastDays }, (_, i) => {
            const day: string = dayjs(habitStart as string).add(i, 'day').format(DATE_FORMAT)
            let status = 'darkred'

            if (statistics !== null && statistics[`${day}`] && statistics[`${day}`].isCompleat === 1) {
                status = 'green'
            }

            statistic[`${day}`] = { selected: true, selectedColor: status }
        })

        return statistic
    }

    return (
        <YStack>
            <Calendar
                current={currentMonth}
                onMonthChange={onMonthChange}
                disableArrowLeft={disableArrowLeft}
                firstDay={1}
                hideExtraDays={true}
                markedDates={checkingProgress()}
                theme={{
                    backgroundColor: '#393E46',
                    calendarBackground: '#393E46',
                    dayTextColor: '#fff',
                    monthTextColor: '#fff',
                }}
                style={{
                    borderRadius: 10,
                }}
            />
        </YStack>
    )
}

export default React.memo(CalendarChart)