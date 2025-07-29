import dayjs from "dayjs";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack } from "tamagui";
import FilteringButtonsTime from "./components/filtering_buttons_time/FilteringButtonsTime";
import SlidingCalendar from "./components/sliding_calendar/SlidingCalendar";
import dateConversion from "./utilities/dateConversion";

const { height, width } = Dimensions.get('window');


export default function Index() {

  const [selectDate, setSelectDate] = useState(dateConversion(dayjs()))
  const [selectFilter, setSelectFilter] = useState('all')

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