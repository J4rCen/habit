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
    const { habitId, habitName, habitStart } = useLocalSearchParams()
    const habitConfig: IHabitTask['habitConfig'] | undefined = useStore(store => store.getHabitTask(habitId as string)?.habitConfig)
    const statistics: IHabitTask['habitStatic'] = useStore(store => store.getIsCompleat(habitId as string))
    const pastDays = dayjs().diff(dayjs(habitStart as string), 'day') + 1
    const dataStart = useStore(state => state.startDateUser)

    return (
        <View height={SCREEN_HEIGHT} backgroundColor={'$dark'}>
            <SafeAreaView>
                <XStack alignItems='center' marginTop={10} width={'90%'}>
                    <View onPress={() => router.back()}>
                        <ArrowBack size={36} />
                    </View>
                    <Text
                        marginLeft={5}
                        color={"$white"}
                        fontSize={26}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        flex={1}
                    >
                        {habitName}
                    </Text>
                </XStack>
                <YStack alignItems="center" marginTop={10}>
                    <ScrollView maxHeight={SCREEN_HEIGHT * 0.85} width={SCREEN_WIDTH - 20} showsVerticalScrollIndicator={false}>
                        <YStack gap={10}>

                            <CalendarChart
                                habitConfig={habitConfig as IHabitTask['habitConfig']}
                                statistics={statistics}
                                pastDays={pastDays}
                                habitStart={habitStart as string}
                            />

                            <PieChart
                                habitConfig={habitConfig as IHabitTask['habitConfig']}
                                habitStart={habitStart as string}
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