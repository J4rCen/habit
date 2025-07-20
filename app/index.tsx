import dayjs from "dayjs";
import { useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack } from "tamagui";
import FilteringButtonsTime from "./components/filtering_buttons_time/FilteringButtonsTime";
import SlidingCalendar from "./components/sliding_calendar/SlidingCalendar";
import dateConversion from "./utilities/dateConversion";

export default function Index() {

  type Filter = 'all' | 'morning' | 'day' | 'evening'

  const [selectDate, setSelectDate] = useState(dateConversion(dayjs()))
  const [selectFilter, setSelectFilter] = useState('all')
  const { height } = Dimensions.get('window');

  return (
    <SafeAreaView>
      <YStack height={height} backgroundColor='$dark'>
        <SlidingCalendar
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />
        <FilteringButtonsTime
          selectFilter={selectFilter}
          setSelectFilter={setSelectFilter}
        />
      </YStack>
    </SafeAreaView>
  );
}
