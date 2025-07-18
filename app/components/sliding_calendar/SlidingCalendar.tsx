import { ArrowBack } from "@/app/svgs/arrowBack";
import dayjs, { Dayjs } from "dayjs";
import localeRu from "dayjs/locale/ru";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, XStack, YStack } from "tamagui";
import dateConversion from "../../utilities/dateConversion";

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.locale(localeRu);

interface ISlidingCalendar {
  selectDate: string;
  setSelectDate: Dispatch<SetStateAction<string>>;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const PAGE_INDEX = [0, 1, 2] as const;

const getWeek = (startOfWeek: Dayjs) =>
  Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

const SlidingCalendar = ({ selectDate, setSelectDate }: ISlidingCalendar) => {
  const [currentWeek, setCurrentWeek] = useState(() => dayjs().startOf("isoWeek"));
  const flatListRef = useRef<FlatList>(null);
  const isFlag = useRef(false);

  const today = useMemo(() => dateConversion(dayjs()), []);
  const weekDates = useMemo(() => {
    return PAGE_INDEX.map((index) => {
      if (index === 1) return getWeek(currentWeek);
      return getWeek(currentWeek.add(index - 1, "week"));
    });
  }, [currentWeek]);

  const onSelectDate = (day: Dayjs) => setSelectDate(dateConversion(day));

  const renderItem = useCallback(
    ({ index }: { index: number }) => (
      <XStack style={styles.dates}>
        {weekDates[index].map((day) => {
          const dateStr = dateConversion(day);
          const isSelected = dateStr === selectDate;

          return (
            <TouchableOpacity
              key={dateStr}
              style={[
                styles.dayContainer,
                isSelected && { backgroundColor: "#194A98" },
              ]}
              onPress={() => onSelectDate(day)}
            >
              <Text style={styles.dayText}>{day.format("DD")}</Text>
            </TouchableOpacity>
          );
        })}
      </XStack>
    ),
    [selectDate, weekDates]
  );

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isFlag.current) return;
      isFlag.current = true;

      const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      if (index === 1) return (isFlag.current = false);

      setCurrentWeek((prev) =>
        index === 0 ? prev.subtract(1, "week") : prev.add(1, "week")
      );

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: false });
        isFlag.current = false;
      });
    },
    []
  );

  const returnToday = () => {
    const todayDate = dayjs().startOf("isoWeek");
    setCurrentWeek(todayDate);
    setSelectDate(dateConversion(dayjs()));
  };

  return (
    <YStack>
      <XStack style={styles.calendarHeader}>
        <Text marginLeft={10} color={"$white"} fontSize={24}>
          {selectDate}
        </Text>
        {selectDate !== today && (
          <TouchableOpacity style={styles.buttonReturnToday} onPress={returnToday}>
            <XStack>
              <ArrowBack size={32} />
              <Text color={"$white"} fontSize={22}>
                Сегодня
              </Text>
            </XStack>
          </TouchableOpacity>
        )}
      </XStack>

      <YStack>
        <XStack style={styles.weekDaysRow}>
          {WEEK_DAYS.map((day, i) => (
            <Text style={styles.weekDaysText} key={i}>
              {day}
            </Text>
          ))}
        </XStack>

        <FlatList
          ref={flatListRef}
          data={PAGE_INDEX}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          initialScrollIndex={1}
          onMomentumScrollEnd={handleScrollEnd}
          keyExtractor={(item) => item.toString()}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
        />
      </YStack>
    </YStack>
  );
};

export default SlidingCalendar;

const styles = StyleSheet.create({
  dates: {
    width: SCREEN_WIDTH,
    justifyContent: "space-around",
    padding: 12,
  },
  dayText: {
    color: "#fff",
    fontSize: 18,
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 8,
  },
  weekDaysText: {
    fontSize: 18,
    color: "#fff",
  },
  dayContainer: {
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
  },
  buttonReturnToday: {
    padding: 18,
    backgroundColor: "#194A98",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    width: 145,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
  },
});
