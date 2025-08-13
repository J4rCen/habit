import { DATE_FORMAT, SCREEN_WIDTH, SCREEN_WIDTH_400, WEEK_DAYS } from "@/app/constants";
import useStore from "@/app/store/zustand";
import ArrowBack from "@/app/svgs/arrowBack";
import dateConversion from "@/app/utilities/dateConversion";
import dayjs, { Dayjs } from "dayjs";
import localeRu from "dayjs/locale/ru";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekday from "dayjs/plugin/weekday";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	FlatList,
	ListRenderItem,
	StyleSheet,
	TouchableOpacity
} from "react-native";
import { Text, XStack, YStack } from "tamagui";

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore);
dayjs.locale(localeRu);

interface ISlidingCalendar {
	selectDate: string;
	setSelectDate: (date: string) => void;
}

const getWeek = (startOfWeek: Dayjs): Dayjs[] => {
	return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
};

const generateInitialWeeks = (startDate: Dayjs, endDate: Dayjs = dayjs()): Dayjs[][] => {
	const weeks: Dayjs[][] = [];

	let currentWeekStart = startDate.startOf("isoWeek");
	const finalWeekStart = endDate.startOf("isoWeek");

	while (currentWeekStart.isSameOrBefore(finalWeekStart)) {
		weeks.push(getWeek(currentWeekStart));
		currentWeekStart = currentWeekStart.add(1, "week");
	}

	return weeks;
};

type WeekItem = Dayjs[] | string;

const keyConversion = (data: Dayjs) => {
	return data.format(DATE_FORMAT)
}

const SlidingCalendar = memo(({ selectDate, setSelectDate }: ISlidingCalendar) => {
	const flatListRef = useRef<FlatList>(null);
	const startDateUser = useStore(store => store.startDateUser);
	const scrollTriggered = useRef(false);
	const todayIndexRef = useRef<number | null>(null);

	const [weeks, setWeeks] = useState<WeekItem[]>([]);

	useEffect(() => {
		if (startDateUser) {
			const generatedWeeks = generateInitialWeeks(dayjs(startDateUser, DATE_FORMAT));
			const todayStr = keyConversion(dayjs());

			const todayWeekIndex = generatedWeeks.findIndex((week) =>
				week.some((day) => keyConversion(day) === todayStr)
			);

			const allWeeks: WeekItem[] = ['На прошлой неделе вы не пользовались приложением', ...generatedWeeks];
			setWeeks(allWeeks);

			if (todayWeekIndex !== -1) {
				todayIndexRef.current = todayWeekIndex + 1;
			}
		}
	}, [startDateUser]);

	const todayFormatted = useMemo(() => keyConversion(dayjs()), []);

	const handleSelectDate = useCallback(
		(day: Dayjs) => setSelectDate(keyConversion(day)),
		[setSelectDate]
	);

	const handleReadyToScroll = () => {
		if (
			!scrollTriggered.current &&
			todayIndexRef.current !== null &&
			flatListRef.current
		) {
			scrollTriggered.current = true;
			flatListRef.current.scrollToIndex({
				index: todayIndexRef.current,
				animated: false,
			});
		}
	};

	const renderItem: ListRenderItem<WeekItem> = useCallback(
		({ item }) => {
			if (typeof item === 'string') {
				return (
					<XStack width={SCREEN_WIDTH} style={styles.dayContainer} alignItems='center' justifyContent="center">
						<Text textAlign="center" color={'$white'} fontSize={18}>
							{item}
						</Text>
					</XStack>
				);
			}

			return (
				<XStack style={styles.dates}>
					{item.map((day) => {
						const dateStr = keyConversion(day);
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
		const todayDateStr = keyConversion(dayjs());

		const todayWeekIndex = weeks.findIndex(week =>
			Array.isArray(week) &&
			week.some(day => keyConversion(day) === todayDateStr)
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
		return Array.isArray(item) ? item[0].format(DATE_FORMAT) : `msg-${index}`;
	}, []);

	return (
		<YStack>
			<XStack style={styles.calendarHeader}>
				<Text marginLeft={10} color={"$white"} fontSize={SCREEN_WIDTH_400 ? 20 : 24}>
					{dateConversion(dayjs(selectDate, DATE_FORMAT))}
				</Text>
				{selectDate !== todayFormatted && (
					<TouchableOpacity
						style={styles.buttonReturnToday}
						onPress={scrollToToday}
					>
						<XStack justifyContent="center" alignContent="center">
							<ArrowBack size={SCREEN_WIDTH_400 ? 26 : 32} />
							<Text color={"$white"} fontSize={SCREEN_WIDTH_400 ? 18 : 22}>
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
					showsHorizontalScrollIndicator={false}
					windowSize={3}
					maxToRenderPerBatch={3}
					updateCellsBatchingPeriod={50}
					getItemLayout={(_, index) => ({
						length: SCREEN_WIDTH,
						offset: SCREEN_WIDTH * index,
						index,
					})}
					onScrollToIndexFailed={({ index }) => {
						setTimeout(() => {
							if (flatListRef.current && weeks.length > index) {
								flatListRef.current.scrollToIndex({ index, animated: true });
							}
						}, 300);
					}}
					onLayout={handleReadyToScroll}
					onContentSizeChange={handleReadyToScroll}
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
		fontSize: SCREEN_WIDTH_400 ? 14 : 18,
	},
	weekDaysRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginHorizontal: 8,
	},
	weekDaysText: {
		fontSize: SCREEN_WIDTH_400 ? 16 : 18,
		color: "#fff",
	},
	dayContainer: {
		alignItems: "center",
		padding: SCREEN_WIDTH_400 ? 12 : 14,
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
		width: SCREEN_WIDTH_400 ? 125 : 145,
		height: SCREEN_WIDTH_400 ? 45 : 50,
		alignItems: "center",
		justifyContent: "center",
	},
	calendarHeader: {
		alignItems: "center",
		justifyContent: "space-between",
		height: 70,
	},
});

export default React.memo(SlidingCalendar);