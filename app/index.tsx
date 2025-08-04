import dayjs from "dayjs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, YStack } from "tamagui";
import FilteringButtonsTime from "./components/filtering_buttons_time/FilteringButtonsTime";
import HabitsRender from './components/habits_render/HabitsRender';
import SlidingCalendar from "./components/sliding_calendar/SlidingCalendar";
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "./constants";
import useStore, { IHabitTask } from "./store/zustand";


export default function Index() {

    const store = useStore(state => state.habitTask)

    const [selectDate, setSelectDate] = useState(dayjs().format('DD-MM-YYYY'))
    const [selectFilter, setSelectFilter] = useState('all')
    const [habitsStore, setHabitStore] = useState<IHabitTask[]>((Array.from(store.values()) ?? []))

    useEffect(() => {
        setHabitStore((Array.from(store.values()) ?? []))
    }, [store])

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