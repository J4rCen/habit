import ContainerWrap from '@/app/components/container_wrap/ContainerWrap';
import CustomInput from '@/app/components/custom_input/CustomInput';
import CustomSelect from '@/app/components/custom_select/CustomSelect';
import CustomDataPicker from '@/app/components/datepicker/CustomDataPicker';
import ReminderToggle from '@/app/components/reminder_toggle/ReminderToggle';
import CustomTimePicker from '@/app/components/timepicker/CustomTimePicker';
import { DATE_FORMAT, SCREEN_WIDTH, SCREEN_WIDTH_400, WEEK_DAYS } from '@/app/constants';
import useStore, { IHabitTask } from '@/app/store/zustand';
import ArrowBack from '@/app/svgs/arrowBack';
import SetNotifications, { CancelNotificationAsync, GetPermissionAccess } from '@/app/utilities/notifications';
import { PortalProvider } from '@tamagui/portal';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import { nanoid } from 'nanoid/non-secure';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Button, ScrollView, Stack, Text, View, XStack, YStack } from "tamagui";
import { optionIntervalExecution, optionTimesOfDay, optionTypeOfTask } from './setDefaultData';


const CreateNewHabits = () => {
    const { habitId } = useLocalSearchParams()
    const habitConfig = habitId ? useStore(store => store.getHabitTask(habitId as string)?.habitConfig) : undefined
    const habitStatic = habitId ? useStore(store => store.getHabitTask(habitId as string)?.habitStatic) : undefined
    const [habitName, setHabitName] = useState(habitConfig ? habitConfig.name : '')
    const dayOfCreate = habitConfig?.day_of_create ? habitConfig?.day_of_create : dayjs().format(DATE_FORMAT)
    const [typeOfHabit, setTypeOfHabit] = useState<'reusable' | 'onetime'>(habitConfig ? habitConfig.type_of_habit : 'reusable')
    const [intervalExecution, setIntervalExecution] = useState<string>(habitConfig && habitConfig.interval_execution ? habitConfig.interval_execution : "every_day")
    const [timesOfDay, setTimesOfDay] = useState<string>(habitConfig && habitConfig.times_of_day ? habitConfig.times_of_day : "all")
    const [typeOfTask, setTypeOfTask] = useState<string>(habitConfig && habitConfig.type_of_task ? habitConfig.type_of_task : "single_mark")
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>(habitConfig && habitConfig.days_of_week ? habitConfig.days_of_week : [])
    const [daysInRow, setDaysInRow] = useState<number | string>(habitConfig && habitConfig.gap_interval?.days_in_row ? habitConfig.gap_interval.days_in_row : '')
    const [skipDays, setSkipDays] = useState<number | string>(habitConfig && habitConfig.gap_interval?.skip_days ? habitConfig.gap_interval.skip_days : '')
    const [quantity, setQuantity] = useState<number | string>(habitConfig && habitConfig.quantity ? habitConfig.quantity : '')
    const [timerTime, setTimerTime] = useState(habitConfig && habitConfig.timer_time ? habitConfig.timer_time : '00:00')
    const [reminderOn, setReminderOn] = useState(habitConfig && habitConfig.reminder ? habitConfig.reminder : false)
    const [oneTimeDay, setOneTimeDay] = useState<string>(habitConfig && habitConfig.oneTimeDay ? habitConfig.oneTimeDay : dayjs().format(DATE_FORMAT))
    const [reminderTime, setReminderTime] = useState(
        habitConfig && habitConfig.reminder_time ? habitConfig.reminder_time :
            `${new Date().getHours().toString().padStart(2, '0')
            }:${new Date().getMinutes().toString().padStart(2, '0')
            }`
    )
    const [oneActive, setOneActive] = useState<number>(0)
    const [alertShow, setAlertShow] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const notificationsId = useRef(habitConfig && reminderOn ? habitConfig.notificationsId : null)
    const { t } = useTranslation()

    const store = useStore(state => state)

    useEffect(() => {

        if (!alertShow) return

        const interval = setInterval(() => {
            setAlertShow(false)
        }, 3000)

        return () => clearInterval(interval)
    }, [alertShow])

    const reminder = async () => {

        const permission = await GetPermissionAccess()

        if (permission === 'granted' && !reminderOn) {
            setReminderOn(true)
        } else {

            if (permission === 'denied') {
                setAlertMessage(t('createHabit.notificationsMustBeEnabled'))
                setAlertShow(true)
            }

            setReminderOn(false)
        }

    }

    const saveHabit = async () => {

        if (typeOfHabit === 'reusable') {
            if (habitName.length === 0) {
                setAlertMessage(t('createHabit.errorHabitNameEmpty'))
                setAlertShow(true)
                return
            }

            if (intervalExecution === 'certain_days' && daysOfWeek.length === 0) {
                setAlertMessage(t('createHabit.errorDaysOfWeekEmpty'))
                setAlertShow(true)
                return
            }

            if (intervalExecution === 'gap' && typeof daysInRow === 'string') {
                setAlertMessage(t('createHabit.errorDaysMustBeNumber'))
                setAlertShow(true)
                return
            }

            if (intervalExecution === 'gap' && Number(daysInRow) === 0) {
                setAlertMessage(t('createHabit.errorActiveDaysShouldNotBeZero'))
                setAlertShow(true)
                return
            }

            if (intervalExecution === 'gap' && typeof skipDays === 'string') {
                setAlertMessage(t('createHabit.errorRestValueMustBeNumber'))
                setAlertShow(true)
                return
            }

            if (intervalExecution === 'gap' && Number(skipDays) === 0) {
                setAlertMessage(t('createHabit.errorRestDaysMustNotBeZero'))
                setAlertShow(true)
                return
            }

            if (typeOfTask === 'reusable_mark' && typeof quantity === 'string') {
                setAlertMessage(t('createHabit.errorQuantityMustBeNumber'))
                setAlertShow(true)
                return
            }

            if (typeOfTask === 'reusable_mark' && Number(quantity) === 0) {
                setAlertMessage(t('createHabit.errorQuantityMustNotBeZero'))
                setAlertShow(true)
                return
            }
        }

        const hid = habitId ? habitId as string : nanoid()

        if (reminderOn) {
            try {
                const id = await SetNotifications(intervalExecution, reminderTime, {
                    name: habitName,
                    habitId: hid,
                    notid: notificationsId.current,
                    daysOfWeek,
                    daysInRow: Number(daysInRow),
                    skipDays: Number(skipDays),
                    dayOfCreate,
                    oneTimeDay,
                    typeOfHabit
                })

                notificationsId.current = id
            } catch (error) {
                console.error(error)
            }
        }

        if (reminderOn === false && habitConfig?.notificationsId) {
            try {
                await CancelNotificationAsync(intervalExecution, habitConfig?.notificationsId, hid, typeOfHabit)
                notificationsId.current = null
            } catch (error) {
                console.error(error)
            }
        }

        const newHabitData: IHabitTask = {
            habitId: hid,
            habitConfig: {
                name: habitName,
                day_of_create: dayOfCreate,
                type_of_habit: typeOfHabit,
                oneTimeDay: typeOfHabit === 'onetime' ? oneTimeDay : null,
                interval_execution:
                    typeOfHabit === 'reusable' ?
                        intervalExecution as 'every_day' | 'certain_days' | 'gap' :
                        null,
                days_of_week:
                    intervalExecution === 'certain_days' ?
                        daysOfWeek :
                        null,
                gap_interval:
                    intervalExecution === 'gap' ?
                        { days_in_row: Number(daysInRow), skip_days: Number(skipDays) } :
                        null,
                times_of_day: timesOfDay as 'all' | 'morning' | 'day' | 'evening',
                type_of_task: typeOfTask as 'single_mark' | 'reusable_mark' | 'timer',
                timer_time:
                    typeOfTask === 'timer' ?
                        timerTime :
                        null,
                quantity:
                    typeOfTask === 'reusable_mark' ?
                        Number(quantity) :
                        null,
                reminder: reminderOn,
                reminder_time: reminderOn ? reminderTime : null,
                notificationsId: reminderOn ? notificationsId.current : null
            },
            habitStatic: habitStatic ? habitStatic : null
        }

        if (habitId) {
            store.updateHabitTask(newHabitData.habitId, newHabitData)
        } else {
            store.setHabitTask(newHabitData.habitId, newHabitData)
        }

        router.back()
    }

    const deleteHabit = () => {
        Alert.alert(
            t('createHabit.deleteHabit'),
            t('createHabit.removeHabitWantToContinue'),
            [
                { text: t('createHabit.cancel'), style: "cancel" },
                {
                    text: t('createHabit.delete'),
                    style: "destructive",
                    onPress: async () => {

                        if (habitConfig?.notificationsId) {
                            await CancelNotificationAsync(intervalExecution, habitConfig?.notificationsId, habitId as string, typeOfHabit)
                            notificationsId.current = null
                        }

                        store.removeHabitTask(habitId as string)
                        router.back()
                    },
                },
            ]
        );
    }

    const toggleDay = (day: string) => {
        setDaysOfWeek((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        )
    }

    const choiceOfDays = useMemo(() => {
        return (
            <XStack
                justifyContent="space-evenly"
                width={SCREEN_WIDTH - 20}
                marginBottom={5}
                flexWrap="wrap"
            >
                {WEEK_DAYS.map((day, index) => {
                    const isSelected = daysOfWeek.includes(day)
                    return (
                        <Stack
                            key={index}
                            onPress={() => toggleDay(day)}
                            padding={SCREEN_WIDTH_400 ? 10 : 12}
                            borderRadius={10}
                            backgroundColor={isSelected ? '#194A98' : '#393E46'}
                            alignItems="center"
                            justifyContent="center"
                            marginVertical={5}
                            marginHorizontal={4}
                            hoverStyle={{
                                opacity: 0.85,
                            }}
                            pressStyle={{
                                scale: 0.96,
                            }}
                        >
                            <Text color="white" fontSize={SCREEN_WIDTH_400 ? 14 : 16}>
                                {t(`listHabit.${day}`)}
                            </Text>
                        </Stack>
                    )
                })}
            </XStack>
        )
    }, [daysOfWeek])

    const choiceOfGapInterval = useMemo(() => {
        return (
            <YStack alignItems='center' gap={5}>
                <XStack gap={15} justifyContent='space-between'>
                    <CustomInput
                        value={daysInRow}
                        placeholder={t('createHabit.active')}
                        height={50}
                        width={SCREEN_WIDTH / 2 - 20}
                        onChange={(e) => {
                            setDaysInRow(e)
                        }}
                        center={true}
                        numbersOnly={true}
                    />
                    <CustomInput
                        value={skipDays}
                        placeholder={t('createHabit.rest')}
                        height={50}
                        width={SCREEN_WIDTH / 2 - 20}
                        onChange={(e) => {
                            setSkipDays(e)
                        }}
                        center={true}
                        numbersOnly={true}
                    />
                </XStack>
                <Text color={'white'} fontSize={12}>{t('createHabit.valueIsIndicatedInDays')}</Text>
            </YStack>
        )
    }, [daysInRow, skipDays])

    const choiceQuantity = useMemo(() => {
        return (
            <YStack>
                <CustomInput
                    value={quantity}
                    placeholder={t('createHabit.quantity')}
                    height={50}
                    width={SCREEN_WIDTH / 2 - 20}
                    onChange={(e) => {
                        setQuantity(e)
                    }}
                    center={true}
                    numbersOnly={true}
                />
            </YStack>
        )
    }, [quantity])

    return (
        <ContainerWrap>
            <PortalProvider>
                <YStack flex={1}>

                    <XStack alignItems='center' marginTop={10} marginBottom={5}>
                        <View onPress={() => router.back()}>
                            <ArrowBack size={36} />
                        </View>
                        <Text
                            marginLeft={5}
                            color={"$white"}
                            fontSize={26}
                        >
                            {habitId === undefined ? t('createHabit.addHabit') : t('createHabit.changeHabit')}
                        </Text>
                    </XStack>

                    <ScrollView
                        style={{ backgroundColor: '#222831' }}
                        showsVerticalScrollIndicator={false}
                        height={'80%'}
                    >
                        <YStack width={SCREEN_WIDTH} position='relative' justifyContent='center'>


                            <YStack
                                flex={1}
                                alignItems="center"
                                marginTop={20}
                            >
                                <CustomInput
                                    value={habitName}
                                    height={50}
                                    width={SCREEN_WIDTH - 20}
                                    placeholder={t('createHabit.habitName')}
                                    onChange={(e) => {
                                        if (typeof e === 'string') setHabitName(e)
                                    }}
                                />
                                <XStack margin={10} justifyContent='center'>
                                    <Button
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={0}
                                        backgroundColor={typeOfHabit === 'reusable' ? '$blue' : "$gray"}
                                        onPress={() => setTypeOfHabit('reusable')}
                                        width={SCREEN_WIDTH / 2 - 20}
                                    >
                                        <Text
                                            color={'$white'}
                                            fontSize={16}
                                        >
                                            {t('createHabit.regular')}
                                        </Text>
                                    </Button>
                                    <Button
                                        borderTopLeftRadius={0}
                                        borderBottomLeftRadius={0}
                                        backgroundColor={typeOfHabit === 'onetime' ? '$blue' : "$gray"}
                                        onPress={() => {
                                            setTypeOfHabit('onetime')
                                        }}
                                        width={SCREEN_WIDTH / 2 - 20}
                                    >
                                        <Text
                                            color={'$white'}
                                            fontSize={16}
                                        >
                                            {t('createHabit.onetime')}
                                        </Text>
                                    </Button>
                                </XStack>

                                <YStack marginTop={20} gap={15}>
                                    {typeOfHabit === 'reusable' ?
                                        <CustomSelect
                                            id={1}
                                            placeholder={t('createHabit.executionInterval')}
                                            height={50}
                                            width={SCREEN_WIDTH - 20}
                                            options={optionIntervalExecution}
                                            value={intervalExecution}
                                            onChange={(e) => setIntervalExecution(e)}
                                            isOpen={oneActive === 1 ? isOpen : false}
                                            setIsOpen={(e) => setIsOpen(e)}
                                            setOneActive={(e) => setOneActive(e)}
                                        /> : <CustomDataPicker
                                            height={50}
                                            width={SCREEN_WIDTH - 20}
                                            placeholder={t('createHabit.selectDate')}
                                            oneTimeDay={oneTimeDay}
                                            setOneTimeDay={setOneTimeDay}
                                        />
                                    }

                                    {
                                        typeOfHabit === 'reusable' &&
                                        intervalExecution === 'certain_days' &&
                                        choiceOfDays
                                    }

                                    {
                                        typeOfHabit === 'reusable' &&
                                        intervalExecution === 'gap' &&
                                        choiceOfGapInterval
                                    }

                                    <CustomSelect
                                        id={2}
                                        placeholder={t('createHabit.timesOfDay')}
                                        height={50}
                                        width={SCREEN_WIDTH - 20}
                                        options={optionTimesOfDay}
                                        value={timesOfDay}
                                        onChange={(e) => setTimesOfDay(e)}
                                        isOpen={oneActive === 2 ? isOpen : false}
                                        setIsOpen={(e) => setIsOpen(e)}
                                        setOneActive={(e) => setOneActive(e)}
                                    />
                                    <CustomSelect
                                        id={3}
                                        placeholder={t('createHabit.taskType')}
                                        height={50}
                                        width={SCREEN_WIDTH - 20}
                                        options={optionTypeOfTask}
                                        value={typeOfTask}
                                        onChange={(e) => setTypeOfTask(e)}
                                        isOpen={oneActive === 3 ? isOpen : false}
                                        setIsOpen={(e) => setIsOpen(e)}
                                        setOneActive={(e) => setOneActive(e)}
                                    />

                                    {
                                        typeOfTask === 'reusable_mark' &&
                                        choiceQuantity
                                    }

                                    {
                                        typeOfTask === 'timer' &&
                                        <CustomTimePicker
                                            width={SCREEN_WIDTH / 2}
                                            height={50}
                                            value={timerTime}
                                            onChange={setTimerTime}
                                            placeholder={t('createHabit.time')}
                                        />
                                    }

                                    <ReminderToggle
                                        value={reminderOn}
                                        onChange={reminder}
                                    />

                                    {
                                        reminderOn &&
                                        <CustomTimePicker
                                            width={SCREEN_WIDTH - 20}
                                            height={50}
                                            value={reminderTime}
                                            onChange={setReminderTime}
                                            placeholder={t('createHabit.specifyTime')}

                                        />
                                    }

                                </YStack>

                            </YStack>
                        </YStack>
                    </ScrollView>
                    <YStack gap={10} alignItems='center' marginBottom={10}>
                        <View height={50} width={SCREEN_WIDTH - 20}>
                            {alertShow && <Text fontSize={SCREEN_WIDTH_400 ? 14 : 16} color={'red'}>{`${alertMessage}`}</Text>}
                        </View>
                        <XStack width={SCREEN_WIDTH - 20} justifyContent='center' alignItems='baseline'>
                            <Button
                                fontSize={16}
                                flex={1}
                                borderBottomRightRadius={0}
                                borderTopRightRadius={0}
                                color={'white'}
                                size={'$5'}
                                backgroundColor={'$gray'}
                                onPress={() => router.back()}
                            >
                                {t('createHabit.cancel')}
                            </Button>
                            <Button
                                fontSize={16}
                                flex={1}
                                borderBottomLeftRadius={0}
                                borderTopLeftRadius={0}
                                color={'white'}
                                size={'$5'}
                                backgroundColor={'$blue'}
                                onPress={() => saveHabit()}
                            >
                                {t('createHabit.save')}
                            </Button>
                        </XStack>
                        {
                            habitId &&
                            <Button
                                fontSize={16}
                                color={'white'}
                                width={SCREEN_WIDTH - 20}
                                size={'$5'}
                                backgroundColor={'red'}
                                onPress={() => deleteHabit()}
                            >
                                {t('createHabit.delete')}
                            </Button>
                        }
                    </YStack>
                </YStack>
            </PortalProvider>
        </ContainerWrap>
    )
}

export default React.memo(CreateNewHabits)