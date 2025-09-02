import { DATE_FORMAT, REFRESH_NOTIFICATION } from '@/app/constants';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import * as BackgroundTask from 'expo-background-task';
import * as Notifications from 'expo-notifications';
import { router } from "expo-router";
import * as TaskManager from 'expo-task-manager';
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, YStack } from "tamagui";
import FilteringButtonsTime from "../components/filtering_buttons_time/FilteringButtonsTime";
import HabitsRender from '../components/habits_render/HabitsRender';
import SlidingCalendar from "../components/sliding_calendar/SlidingCalendar";
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "../constants";
import useStore, { IHabitTask } from "../store/zustand";
import getNextRenderBaseDate from '../utilities/calculatorDays';
import SetNotifications from '../utilities/notifications';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(customParseFormat)

export default function Index() {

    const store = useStore(state => state.habitTask)
    const initApp = useStore(state => state.initializeApp)

    const [selectDate, setSelectDate] = useState(dayjs().format(DATE_FORMAT))
    const [selectFilter, setSelectFilter] = useState('all')
    const [habitsStore, setHabitStore] = useState<IHabitTask[]>(Object.values(store) ?? [])

    useEffect(() => {
        initApp()
        const registerBackgroundTask = async () => {
            try {
                await BackgroundTask.registerTaskAsync(REFRESH_NOTIFICATION, {
                    minimumInterval: 60 * 60 * 24
                })
            } catch (error) { }
        }

        registerBackgroundTask()

    }, [])

    useEffect(() => {
        setHabitStore(Object.values(store) ?? [])
    }, [store])

    TaskManager.defineTask(REFRESH_NOTIFICATION, async () => {
        try {

            const scheduled = await Notifications.getAllScheduledNotificationsAsync()
            const updateHabitTask = useStore.getState().updateHabitTask

            const habitNotif = scheduled.reduce<Record<string, string | null>>((acc, item) => {
                const data = item.content.data as any
                const untilDay = data['untilDay'] as string | undefined

                if (!untilDay) return acc

                if (data['habitId']) {
                    if (
                        !acc[data.habitId] ||
                        dayjs(untilDay, DATE_FORMAT).isAfter(dayjs(acc[data.habitId]))
                    ) {
                        acc[data.habitId] = untilDay
                    }
                }

                return acc

            }, {})

            for (const [key, value] of Object.entries(habitNotif)) {
                if (dayjs(value, DATE_FORMAT).diff(dayjs(), 'day') <= 10) {
                    const habit = useStore.getState().getHabitTask(key)
                    if (habit && habit.habitConfig.reminder) {
                        const { skip_days, days_in_row } = habit.habitConfig.gap_interval as { skip_days: number, days_in_row: number }
                        const newDataOfCreate = getNextRenderBaseDate(habit.habitConfig.day_of_create, days_in_row, skip_days)
                        const notid = await SetNotifications('gap', habit?.habitConfig.reminder && habit.habitConfig.reminder_time ? habit?.habitConfig.reminder_time : '00:00', {
                            name: habit?.habitConfig.name,
                            habitId: key,
                            notid: habit.habitConfig.notificationsId,
                            skipDays: skip_days,
                            daysInRow: days_in_row,
                            dayOfCreate: newDataOfCreate
                        })

                        if (notid) {
                            const updateConfig: IHabitTask = {
                                ...habit,
                                habitConfig: {
                                    ...habit.habitConfig,
                                    notificationsId: notid
                                }
                            }
                            updateHabitTask(key, updateConfig)
                        }
                    }
                }
            }
            return BackgroundTask.BackgroundTaskResult.Success
        } catch (error) {
            console.error(error)
            return BackgroundTask.BackgroundTaskResult.Failed
        }
    })

    return (
        <View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
            <SafeAreaView>
                <YStack height={SCREEN_HEIGHT} backgroundColor='$dark'>
                    <SlidingCalendar
                        selectDate={selectDate}
                        setSelectDate={setSelectDate}
                    />
                    <YStack alignItems="center">
                        <FilteringButtonsTime
                            selectFilter={selectFilter}
                            setSelectFilter={setSelectFilter}
                        />
                        <TouchableOpacity
                            style={styles.buttonCreateNewHabit}
                            onPress={() => router.navigate('/screens/create_new_habits')}
                        >
                            <Text
                                color={'$white'}
                                fontSize={18}
                            >Добавить привычку</Text>
                        </TouchableOpacity>

                        <HabitsRender
                            habitsStore={habitsStore}
                            selectDate={selectDate}
                            selectFilter={selectFilter}
                        />
                    </YStack>
                </YStack>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonCreateNewHabit: {
        borderRadius: 10,
        backgroundColor: '#194A98',
        width: SCREEN_WIDTH - 40,
        height: SCREEN_WIDTH_400 ? 40 : 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
})