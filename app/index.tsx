import dayjs from "dayjs";
import { useState } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack } from "tamagui";
import SlidingCalendar from "./components/sliding_calendar/SlidingCalendar";
import dateConversion from "./utilities/dateConversion";

export default function Index() {

  const [selectDate, setSelectDate] = useState(dateConversion(dayjs()))

  const { height } = Dimensions.get('window');

  return (
    <SafeAreaView>
      <YStack height={height} backgroundColor='$dark'>
        <SlidingCalendar
          selectDate={selectDate}
          setSelectDate={setSelectDate}
        />

      </YStack>
    </SafeAreaView>
  );
}
