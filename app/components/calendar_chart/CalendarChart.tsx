import { DATE_FORMAT } from "@/app/constants";
import { IHabitTask } from "@/app/store/zustand";
import { ArrowLeft, ArrowRight } from "@/app/svgs/arrowBarCart";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";
import { View, YStack } from "tamagui";

interface ICalendarChart {
    habitConfig: IHabitTask['habitConfig']
    statistics: IHabitTask['habitStatic']
    pastDays: number
    habitStart: string | undefined
}

dayjs.extend(customParseFormat)

const CalendarChart = ({ statistics, pastDays, habitStart, habitConfig }: ICalendarChart) => {
    const currentMonth = dayjs().format(DATE_FORMAT)
    const [endMonth, setEndMonth] = useState(currentMonth);
    

    const disableArrowLeft = useMemo(() => {
        return dayjs(endMonth).isSame(habitStart, 'year') && dayjs(endMonth).isSame(habitStart, 'month')
    }, [endMonth, habitStart]);

    const onMonthChange = (month: { dateString: string }) => {
        setEndMonth(month.dateString);
    };

    const markedDates = useMemo(() => {

        const marks: Record<string, { selected: boolean; selectedColor: string }> = {};

        if (habitConfig.interval_execution === 'every_day') {
            for (let i = 0; i < pastDays; i++) {
                const day = dayjs(habitStart).add(i, 'day').format(DATE_FORMAT);
                const completed = statistics?.[day]?.isCompleat === 1;
                marks[day] = { selected: true, selectedColor: completed ? 'green' : 'darkred' };
            }
        }

        if (habitConfig.interval_execution === 'certain_days') {
            for (let i = 0; i < pastDays; i++) {
                const day = dayjs(habitStart).add(i, 'day');
  
                if (habitConfig.days_of_week?.includes(day.locale('en').format('ddd').toLowerCase())) {
                    const completed = statistics?.[day.format(DATE_FORMAT)]?.isCompleat === 1;
                    marks[day.format(DATE_FORMAT)] = { selected: true, selectedColor: completed ? 'green' : 'darkred' };
                }
            }
        }

        if (habitConfig.interval_execution === 'gap') {
            const { days_in_row, skip_days } = habitConfig.gap_interval as { days_in_row: number, skip_days: number }
            const cycleDay = days_in_row + skip_days
            const diffDay = dayjs().diff(dayjs(habitConfig.day_of_create, DATE_FORMAT), 'day')

            for (let i = 0; i <= diffDay; i++) {
                const cycleLength = i % cycleDay

                if (cycleLength < days_in_row) {
                    const day = dayjs(habitStart).add(i, 'day').format(DATE_FORMAT);
                    const completed = statistics?.[day]?.isCompleat === 1;
                    marks[day] = { selected: true, selectedColor: completed ? 'green' : 'darkred' };
                }
            }

        }

        return marks;

    }, [pastDays, habitStart, statistics]);

    return (
        <YStack>
            <Calendar
                current={currentMonth}
                renderArrow={(direction) => 
                    direction === 'left' ?
                    disableArrowLeft ? <View padding={10}/> : <ArrowLeft color='#fff' size={20}/> :
                    <ArrowRight color='#fff' size={20}/>
                }
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
