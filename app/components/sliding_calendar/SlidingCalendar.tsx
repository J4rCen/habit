import useStore from "@/app/store/zustand";
import ArrowBack from "@/app/svgs/arrowBack";
import dayjs, { Dayjs } from "dayjs";
import localeRu from "dayjs/locale/ru";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
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
  setSelectDate: (date: string) => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const getWeek = (startOfWeek: Dayjs): Dayjs[] => {
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
};

const generateInitialWeeks = (startDate: Dayjs, endDate: Dayjs = dayjs()): Dayjs[][] => {
  const weeks: Dayjs[][] = [];
  let currentWeekStart = startDate.startOf("isoWeek");

  while (currentWeekStart.isBefore(endDate)) {
    weeks.push(getWeek(currentWeekStart));
    currentWeekStart = currentWeekStart.add(1, "week");
  }

  return weeks;
};

type WeekItem = Dayjs[] | string;

const SlidingCalendar = memo(({ selectDate, setSelectDate }: ISlidingCalendar) => {
  const flatListRef = useRef<FlatList>(null);
  const { startDateUser, setStartDateUser } = useStore(store => store);
  
  const initialStartDate = useMemo(() => startDateUser || dayjs(), [startDateUser]);
  if (!startDateUser) setStartDateUser(initialStartDate);

  const [weeks, setWeeks] = useState<WeekItem[]>(() => [
    'На прошлой неделе вы не пользовались приложением',
    ...generateInitialWeeks(dayjs(initialStartDate))
  ]);

  const todayFormatted = useMemo(() => dateConversion(dayjs()), []);

  const handleSelectDate = useCallback(
    (day: Dayjs) => setSelectDate(dateConversion(day)),
    [setSelectDate]
  );

  const renderItem: ListRenderItem<WeekItem> = useCallback(
    ({ item }) => {
      if (typeof item === 'string') {
        return (
          <XStack width={SCREEN_WIDTH} alignItems='center' justifyContent="center">
            <Text textAlign="center" color={'$white'} fontSize={18}>
              {item}
            </Text>
          </XStack>
        );
      }

      return (
        <XStack style={styles.dates}>
          {item.map((day) => {
            const dateStr = dateConversion(day);
            const isSelected = dateStr === selectDate;

            return (
              <TouchableOpacity
                key={dateStr}
                style={[
                  styles.dayContainer,
                  isSelected && styles.selectedDay,
                ]}
                onPress={() => handleSelectDate(day)}
              >
                <Text style={styles.dayText}>{day.format("DD")}</Text>
              </TouchableOpacity>
            );
          })}
        </XStack>
      );
    },
    [selectDate, handleSelectDate]
  );

  const scrollToToday = useCallback(() => {
    const todayWeek = dayjs().startOf("isoWeek");
    const todayDateStr = dateConversion(dayjs());

    const todayWeekIndex = weeks.findIndex(week =>
      Array.isArray(week) &&
      week.some(day => dateConversion(day) === todayDateStr)
    );

    if (todayWeekIndex === -1) {
      const newWeek = getWeek(todayWeek);
      const updatedWeeks = [...weeks, newWeek];
      setWeeks(updatedWeeks);

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({
          index: updatedWeeks.length - 1,
          animated: true,
        });
      });
    } else {
      flatListRef.current?.scrollToIndex({
        index: todayWeekIndex,
        animated: true,
      });
    }

    setSelectDate(todayDateStr);
  }, [weeks, setSelectDate]);

  const handleEndReached = useCallback(() => {
    const lastWeek = weeks[weeks.length - 1];
    if (Array.isArray(lastWeek)) {
      const newWeekStart = lastWeek[0].add(1, 'week');
      setWeeks(prev => [...prev, getWeek(newWeekStart)]);
    }
  }, [weeks]);

  const keyExtractor = useCallback((item: WeekItem, index: number) => {
    return Array.isArray(item) ? item[0].format('YYYY-MM-DD') : `msg-${index}`;
  }, []);

  return (
    <YStack>
      <XStack style={styles.calendarHeader}>
        <Text marginLeft={10} color={"$white"} fontSize={24}>
          {selectDate}
        </Text>
        {selectDate !== todayFormatted && (
          <TouchableOpacity 
            style={styles.buttonReturnToday} 
            onPress={scrollToToday}
          >
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
          {WEEK_DAYS.map((day) => (
            <Text style={styles.weekDaysText} key={day}>
              {day}
            </Text>
          ))}
        </XStack>

        <FlatList
          ref={flatListRef}
          data={weeks}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.25}
          horizontal
          pagingEnabled
          initialScrollIndex={1}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          windowSize={5}
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={50}
          onScrollToIndexFailed={({ index }) => {
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({ index, animated: true });
            }, 300);
          }}
        />
      </YStack>
    </YStack>
  );
});

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
  selectedDay: {
    backgroundColor: "#194A98",
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

export default SlidingCalendar;