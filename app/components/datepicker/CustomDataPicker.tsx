import { DATE_FORMAT, SCREEN_WIDTH } from "@/app/constants"
import useStore from "@/app/store/zustand"
import { ArrowLeft, ArrowRight } from "@/app/svgs/arrowBarCart"
import dayjs from "dayjs"
import React, { Dispatch, SetStateAction, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Pressable } from "react-native"
import { Calendar } from "react-native-calendars"
import { Button, Dialog, Text, View, XStack, YStack } from "tamagui"
import CustomInput from "../custom_input/CustomInput"

interface ICustomDataPicker {
	height: number,
	width: number,
	placeholder: string
	oneTimeDay: string,
	setOneTimeDay: Dispatch<SetStateAction<string>>
}

const CustomDataPicker = (props: ICustomDataPicker) => {

	const currentMonth = dayjs().format(DATE_FORMAT)
	const [endMonth, setEndMonth] = useState(currentMonth);
	const {t} = useTranslation()
	const systemLanguage = useStore(state => state.systemLocale)

	const disableArrowLeft = useMemo(() => {
		return dayjs(endMonth).isSame(dayjs().format(DATE_FORMAT), 'year') && dayjs(endMonth).isSame(dayjs().format(DATE_FORMAT), 'month')
	}, [endMonth]);

	const onMonthChange = (month: { dateString: string }) => {
		setEndMonth(month.dateString);
	};

	return (
		<Dialog>
			<Dialog.Trigger asChild>
				<Pressable>
					<CustomInput
						placeholder={props.placeholder}
						width={props.width}
						height={props.height}
						value={dayjs(props.oneTimeDay).locale(systemLanguage ?? 'en').format('DD MMMM YYYY')}
						onReadonly
						center
					/>
				</Pressable>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay
					key="overlay"
					backgroundColor="$shadow6"
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>
				<Dialog.Content
					width={SCREEN_WIDTH - 20}
					backgroundColor="$dark"
					borderColor="$blue"
					borderWidth="$1.5"
				>
					<YStack gap={20}>
						<Calendar
							onMonthChange={onMonthChange}
							disableArrowLeft={disableArrowLeft}
							minDate={dayjs().format(DATE_FORMAT)}
							renderArrow={(direction) =>
								direction === 'left' ?
									disableArrowLeft ? <View padding={10} /> : <ArrowLeft color='#fff' size={20} /> :
									<ArrowRight color='#fff' size={20} />
							}
							onDayPress={day => props.setOneTimeDay(day.dateString)}
							markedDates={{
								[props.oneTimeDay]: { selected: true, disableTouchEvent: true, selectedColor: '#194A98' }
							}}
							firstDay={1}
							hideExtraDays
							theme={{
								backgroundColor: '#393E46',
								calendarBackground: '#393E46',
								dayTextColor: '#fff',
								monthTextColor: '#fff',
							}}
							style={{ borderRadius: 10 }}
						/>

						<XStack justifyContent="center" gap={10}>
							<Dialog.Close asChild>
								<Button backgroundColor="$gray">
									<Text color="white" fontSize={16}>
										{t('createHabit.cancel')}
									</Text>
								</Button>
							</Dialog.Close>
							<Dialog.Close asChild>
								<Button
									backgroundColor="$blue"
								>
									<Text color="white" fontSize={16}>
										{t('createHabit.confirm')}
									</Text>
								</Button>
							</Dialog.Close>
						</XStack>
					</YStack>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	)
}

export default React.memo(CustomDataPicker)