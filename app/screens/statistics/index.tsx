import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/app/constants"
import useStore, { IHabitTask } from "@/app/store/zustand"
import ArrowBack from "@/app/svgs/arrowBack"
import dayjs from "dayjs"
import localeRu from "dayjs/locale/ru"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isoWeek from "dayjs/plugin/isoWeek"
import weekday from "dayjs/plugin/weekday"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { SafeAreaView } from "react-native-safe-area-context"
import { Circle, ScrollView, Text, View, XStack, YStack } from "tamagui"

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(customParseFormat)
dayjs.locale(localeRu);

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

const DATA = () =>
  Array.from({ length: 5 }, (_, index) => ({
    value: Math.floor(Math.random() * 100) + 50,
    color: '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0'),
    label: `Item ${index + 1}`,
  }));

const Statistics = () => {

    const {habitId, habitName, dataStart, habitStart} = useLocalSearchParams()
    const statistics: IHabitTask['habitStatic'] = useStore(store => store.getIsCompleat(habitId as string))

    const [currentMonth, setCurrentMonth] = useState<string>(dataStart as string)
    const [disableArrowLeft, setDisableArrowLeft] = useState<boolean>(dayjs(dayjs(currentMonth).subtract(1, 'month')).isBefore(dataStart as string))

    const [data3, setData3] = useState([
        { x: "chrome", y: 30 },
        { x: "safari", y: 180 },
        { x: "firefox", y: 200 },
        { x: "edge", y: 120 },
        { x: "others", y: 100 }
    ]);

    const onMonthChange = (month: {dateString: string}) => {

        const newData = month.dateString
        setCurrentMonth(newData)

        if (dayjs(dayjs(newData).subtract(1, 'month')).isBefore(dataStart as string)) {
            setDisableArrowLeft(true)
            return
        }
        
        setDisableArrowLeft(false)
    }
    
    const checkingProgress = () => {
        const statistic: Record<string, {selected: boolean, selectedColor: string}> = {}

        const days = dayjs(habitStart as string).diff(dayjs(), 'day')
        
        Array.from({length: days == 0 ? 1 : days}, (_, i) => {
            const day: string = dayjs(habitStart as string).add(i).format('YYYY-MM-DD')
            const status = statistics === null ? 'darkred' : statistics[`${day}`].isCompleat === 1 ? 'green' : 'darkred'
            statistic[`${day}`] = { selected: true, selectedColor: status }
        })

        return statistic
    }

    return (
        <View height={SCREEN_HEIGHT} backgroundColor={'$dark'}>
            <SafeAreaView>
                <XStack alignItems='center' marginTop={10}>
                    <View onPress={() => router.back()}>
                        <ArrowBack size={36}/>
                    </View>
                    <Text
                        marginLeft={5}
                        color={"$white"}
                        fontSize={26}
                    >
                        {habitName}
                    </Text>
                </XStack>
                <YStack alignItems="center" marginTop={10}>
                    <ScrollView maxHeight={SCREEN_HEIGHT * 0.9} showsVerticalScrollIndicator={false}>
                        <YStack gap={10} height={SCREEN_HEIGHT}>
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

                            <YStack backgroundColor={'$gray'} borderRadius={10}>
                                <View position='relative'  alignItems="center" justifyContent="center">
                                    <Circle position='absolute' height={60} width={60} borderRadius={100} backgroundColor={'$gray'} zIndex={10}/>
                                    <PieChart
                                        data={[
                                            { name: 'Завершено', population: 5, color: 'green', legendFontColor: '#ffffffff', legendFontSize: 15 },
                                            { name: 'Пропущено', population: 3, color: 'darkred', legendFontColor: '#ffffffff', legendFontSize: 15 }
                                        ]}
                                        width={SCREEN_WIDTH - 40}
                                        height={200}
                                        chartConfig={{
                                            color: () => `white`,
                                        }}
                                        accessor="population"
                                        backgroundColor="transparent"
                                        paddingLeft="15"
                                        absolute
                                        center={[50, 0]}
                                        hasLegend={false}
                                    />
                                </View>

                            </YStack>
                            
                            <YStack backgroundColor={'$gray'} borderRadius={10} padding={10} >
                                <BarChart
                                    data={{
                                        labels: ['1', '2', '3', '4', '5'],
                                        datasets: [{ data: [0, 2, 0, 0, 9] }]
                                    }}
                                    width={SCREEN_WIDTH - 40}
                                    height={220}
                                    chartConfig={{
                                        backgroundColor: '#393E46',
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        barPercentage: 0.5,
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }} 
                                    yAxisLabel={""} 
                                    yAxisSuffix={""}
                                />
                            </YStack>
                        </YStack>
                    </ScrollView>
                </YStack>    
            </SafeAreaView>
        </View>
    )
}

export default React.memo(Statistics)