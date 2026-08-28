import ContainerWrap from "@/app/components/container_wrap/ContainerWrap"
import CustomTimePicker from "@/app/components/timepicker/CustomTimePicker"
import { SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants"
import useStore, { TDayInterval } from "@/app/store/zustand"
import ArrowBack from "@/app/svgs/arrowBack"
import { DaySvg, EveningSvg, MorningSvg } from "@/app/svgs/filtersButtonSvgs"
import { router } from "expo-router"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, ScrollView, Text, View, XStack, YStack } from "tamagui"


const IntervalDay = () => {

	const dayInterval = useStore(state => state.dayInterval)
	const setDayInterval = useStore(state => state.setDayInterval)
	const { t } = useTranslation()

	const [morningTime, setMorningTime] = useState<string>(
		dayInterval.morningTime ? dayInterval.morningTime : '08:00'
	)
	const [dayTime, setDayTime] = useState<string>(
		dayInterval.dayTime ? dayInterval.dayTime : '12:00'
	)
	const [eveningTime, setEveningTime] = useState<string>(
		dayInterval.eveningTime ? dayInterval.eveningTime : '18:00'
	)

	const saveNewInterval = () => {
		const data: TDayInterval = {
			morningTime: morningTime,
			dayTime: dayTime,
			eveningTime: eveningTime
		}

		setDayInterval(data)
		router.back()
	}

	return (
		<ContainerWrap>
			<XStack alignItems='center' marginTop={10} marginBottom={20}>
				<View onPress={() => router.back()}>
					<ArrowBack size={36} />
				</View>
				<Text
					marginLeft={5}
					color={"$white"}
					fontSize={26}
				>
					{t('settings.dailyInterval')}
				</Text>
			</XStack>
			<YStack flex={1} backgroundColor='$dark' alignItems="center" paddingBottom={20}>
				<ScrollView height={'80%'} style={{ backgroundColor: '#222831' }} showsVerticalScrollIndicator={false}>
					<YStack width={SCREEN_WIDTH - 20} gap={20} alignItems="center" paddingTop={10}>
						<XStack gap={10} width={'100%'} display="flex" justifyContent='space-between'>
							<XStack alignItems="center" justifyContent='flex-start'>
								<MorningSvg size={SCREEN_WIDTH_400 ? 28 : 32} />
								<Text color={'white'} fontSize={SCREEN_WIDTH_400 ? 20 : 24}>{t('createHabit.morning')}</Text>
							</XStack>
							<CustomTimePicker
								width={SCREEN_WIDTH * 0.6}
								height={50}
								value={morningTime}
								onChange={setMorningTime}
								placeholder={t('settings.morningStart')}
							/>
						</XStack>
						<XStack gap={10} width={'100%'} display="flex" justifyContent='space-between'>
							<XStack alignItems="center" justifyContent='flex-start'>
								<DaySvg size={SCREEN_WIDTH_400 ? 28 : 32} />
								<Text color={'white'} fontSize={SCREEN_WIDTH_400 ? 20 : 24}>{t('createHabit.day')}</Text>
							</XStack>
							<CustomTimePicker
								width={SCREEN_WIDTH * 0.6}
								height={50}
								value={dayTime}
								onChange={setDayTime}
								placeholder={t('settings.dayStart')}
							/>
						</XStack>
						<XStack gap={10} width={'100%'} display="flex" justifyContent='space-between'>
							<XStack alignItems="center" justifyContent='flex-start'>
								<EveningSvg size={SCREEN_WIDTH_400 ? 22 : 26} />
								<Text color={'white'} fontSize={SCREEN_WIDTH_400 ? 20 : 24}>{t('createHabit.evening')}</Text>
							</XStack>
							<CustomTimePicker
								width={SCREEN_WIDTH * 0.6}
								height={50}
								value={eveningTime}
								onChange={setEveningTime}
								placeholder={t('settings.eveningStart')}
							/>
						</XStack>
					</YStack>
				</ScrollView>
				<YStack gap={10} alignItems="center">
					<Button
						fontSize={16}
						color={'white'}
						width={SCREEN_WIDTH - 20}
						size={'$5'}
						backgroundColor={'$blue'}
						onPress={() => saveNewInterval()}
					>
						{t('createHabit.save')}
					</Button>
					<Button
						fontSize={16}
						color={'white'}
						width={SCREEN_WIDTH - 20}
						size={'$5'}
						backgroundColor={'$gray'}
						onPress={() => router.back()}
					>
						{t('createHabit.cancel')}
					</Button>
				</YStack>
			</YStack>
		</ContainerWrap>
	)
}

export default React.memo(IntervalDay)