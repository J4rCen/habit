import { DATE_FORMAT } from "@/app/constants";
import { IHabitTask } from "@/app/store/zustand";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { YStack } from "tamagui";

LocaleConfig.locales.ru = {
    monthNames: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ],
    monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня'
};
LocaleConfig.defaultLocale = 'ru';

interface ICalendarChart {
    dataStart: string;
    statistics: IHabitTask['habitStatic'];
    pastDays: number;
    habitStart: string;
}

const CalendarChart = ({ dataStart, statistics, pastDays, habitStart }: ICalendarChart) => {
    const [currentMonth, setCurrentMonth] = useState(dataStart);

    const disableArrowLeft = useMemo(
        () => dayjs(currentMonth).subtract(1, 'month').isBefore(dataStart),
        [currentMonth, dataStart]
    );

    const onMonthChange = (month: { dateString: string }) => {
        setCurrentMonth(month.dateString);
    };

    const markedDates = useMemo(() => {
        const marks: Record<string, { selected: boolean; selectedColor: string }> = {};
        for (let i = 0; i < pastDays; i++) {
            const day = dayjs(habitStart).add(i, 'day').format(DATE_FORMAT);
            const completed = statistics?.[day]?.isCompleat === 1;
            marks[day] = { selected: true, selectedColor: completed ? 'green' : 'darkred' };
        }
        return marks;
    }, [pastDays, habitStart, statistics]);

    return (
        <YStack>
            <Calendar
                current={currentMonth}
                onMonthChange={onMonthChange}
                disableArrowLeft={disableArrowLeft}
                firstDay={1}
                hideExtraDays
                markedDates={markedDates}
                theme={{
                    backgroundColor: '#393E46',
                    calendarBackground: '#393E46',
                    dayTextColor: '#fff',
                    monthTextColor: '#fff',
                }}
                style={{ borderRadius: 10 }}
            />
        </YStack>
    );
};

export default React.memo(CalendarChart);
