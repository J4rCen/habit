import useStore from "@/app/store/zustand";
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
  StyleSheet,
  TouchableOpacity
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

const getWeek = (startOfWeek: Dayjs) => {
  return  Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
}

const initWeek = (startWeek: Dayjs | null, endWeek: Dayjs = dayjs().startOf('isoWeek')) => {
  const weekList = []

  do {
    weekList.push(getWeek(dayjs(startWeek).startOf('isoWeek')))
    startWeek?.add(1, 'week')
  } while (startWeek?.isBefore(endWeek));

  return weekList

}

type Week = string | Dayjs[]

const SlidingCalendar = ({ selectDate, setSelectDate }: ISlidingCalendar) => {
  const [currentWeek, setCurrentWeek] = useState(() => dayjs().startOf("isoWeek"));
  const flatListRef = useRef<FlatList>(null);
  const isFlag = useRef(false);
  
  const {startDateUser, setStartDateUser} = useStore(store => store)
  if (!startDateUser) setStartDateUser(dayjs())

  const [weekList, setWeekList] = useState(['Вы еще не пользовались приложением', ...initWeek(dayjs(startDateUser))]) 


  const today = useMemo(() => dateConversion(dayjs()), []);

  const onSelectDate = (day: Dayjs) => setSelectDate(dateConversion(day));

  const renderItem = useCallback(
    ({ item }: { item: Week }) => {
      
      if (!Array.isArray(item)) {
        return <XStack width={SCREEN_WIDTH} alignItems='center' justifyContent="center">
          <Text
            color={'$white'}
            fontSize={18}
          >{item}</Text>
        </XStack>
      }
      
      return <XStack style={styles.dates}>
        {item.map((day) => {
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
    },
    [selectDate]
  );

  const returnToday = () => {
  const todayDate = dayjs().startOf("isoWeek");
  const formattedToday = dateConversion(dayjs());

  // Найти индекс недели с сегодняшней датой
  const todayWeekIndex = weekList.findIndex(item =>
    Array.isArray(item) &&
    item.some(day => dateConversion(day) === formattedToday)
  );

  // Если неделя с сегодняшним днем не найдена, добавить её
  if (todayWeekIndex === -1) {
      const newWeek = getWeek(todayDate);
      const updatedList = [...weekList, newWeek];
      setWeekList(updatedList);

      // Scroll после обновления списка
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: updatedList.length - 1,
          animated: true,
        });
      }, 0);
    } else {
      // Scroll к найденной неделе
      flatListRef.current?.scrollToIndex({
        index: todayWeekIndex,
        animated: true,
      });
    }

    setCurrentWeek(todayDate);
    setSelectDate(formattedToday);
  };

  const endReached = () => {
    const newWeek = currentWeek.add(1, 'week')
    setWeekList(list => [...list, getWeek(newWeek)])
    setCurrentWeek(newWeek)
  }

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
          data={weekList}
          renderItem={renderItem}
          onEndReached={endReached}
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
          onScrollToIndexFailed={({ index }) => {
            // Попробовать прокрутить повторно через 300 мс
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({ index, animated: true });
            }, 300);
          }}
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
