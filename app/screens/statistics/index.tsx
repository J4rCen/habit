import BarChart from "@/app/components/bar_chart/BarChart"
import CalendarChart from "@/app/components/calendar_chart/CalendarChart"
import PieChart from "@/app/components/pie_chart/PieChart"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/app/constants"
import useStore, { IHabitTask } from "@/app/store/zustand"
import ArrowBack from "@/app/svgs/arrowBack"
import dayjs from "dayjs"
import localeRu from "dayjs/locale/ru"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isoWeek from "dayjs/plugin/isoWeek"
import weekday from "dayjs/plugin/weekday"
import { router, useLocalSearchParams } from "expo-router"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(customParseFormat)
dayjs.locale(localeRu);

const Statistics = () => {
    const {habitId, habitName, dataStart, habitStart} = useLocalSearchParams()
    const statistics: IHabitTask['habitStatic'] = useStore(store => store.getIsCompleat(habitId as string))
    const pastDays = dayjs().diff(dayjs(habitStart as string), 'day') + 1
    
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
                    <ScrollView maxHeight={SCREEN_HEIGHT * 0.8} width={SCREEN_WIDTH - 20} showsVerticalScrollIndicator={false} >
                        <YStack gap={10}>
                            
                            <CalendarChart
                                dataStart={dataStart as string}
                                statistics={statistics}
                                pastDays={pastDays}
                                habitStart={habitStart as string}
                            />

                            <PieChart
                                pastDays={pastDays}
                                statistics={statistics}
                            />

                            <BarChart
                                habitStart={habitStart as string}
                                statistics={statistics}
                            />

                        </YStack>
                    </ScrollView>
                </YStack>
            </SafeAreaView>
        </View>
    )
}

export default React.memo(Statistics)