import dayjs from "dayjs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack } from "tamagui";
import FilteringButtonsTime from "./components/filtering_buttons_time/FilteringButtonsTime";
import HabitsRender from './components/habits_render/HabitsRender';
import SlidingCalendar from "./components/sliding_calendar/SlidingCalendar";
import useStore, { IHabitTask } from "./store/zustand";
import dateConversion from "./utilities/dateConversion";

const { height, width } = Dimensions.get('window');


export default function Index() {

    const store = useStore(state => state.habitTask)

    const [selectDate, setSelectDate] = useState(dateConversion(dayjs()))
    const [selectFilter, setSelectFilter] = useState('all')
    const [habitsStore, setHabitStore] = useState<IHabitTask[]>((Array.from(store.values()) ?? []))

    useEffect(() => {
        setHabitStore((Array.from(store.values()) ?? []))
    }, [store])

    return (
        <SafeAreaView>
        <YStack height={height} backgroundColor='$dark'>
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
                onPress={() => router.push('./screens/create_new_habits')}
            >
                <Text
                color={'$white'}
                fontSize={18}
                >Добавить привычку</Text>
            </TouchableOpacity>

            <HabitsRender
                habitsStore={habitsStore}
                selectDate={selectDate}
            />

            </YStack>
        </YStack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonCreateNewHabit: {
        borderRadius: 10,
        backgroundColor: '#194A98',
        width: width - 40,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
})