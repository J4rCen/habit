import CustomInput from '@/app/components/custom_input/CustomInput';
import CustomSelect from '@/app/components/custom_select/CustomSelect';
import CustomDataPicker from '@/app/components/datepicker/CustomDataPicker';
import ReminderToggle from '@/app/components/reminder_toggle/ReminderToggle';
import CustomTimePicker from '@/app/components/timepicker/CustomTimePicker';
import { DATE_FORMAT, SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400, WEEK_DAYS } from '@/app/constants';
import useStore, { IHabitTask } from '@/app/store/zustand';
import ArrowBack from '@/app/svgs/arrowBack';
import SetNotifications, { CancelNotificationAsync, GetPermissionAccess } from '@/app/utilities/notifications';
import { PortalProvider } from '@tamagui/portal';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import { nanoid } from 'nanoid/non-secure';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
                setAlertMessage('Для работы напоминаний необходимо разрешить уведомления')
                setAlertShow(true)
            }

            setReminderOn(false)
        }

    }

    const saveHabit = async () => {

        if (habitName.length === 0) {
            setAlertMessage('Ошибка сохранения: Название привычке не может быть пустым')
            setAlertShow(true)
            return
        }

        if (intervalExecution === 'certain_days' && daysOfWeek.length === 0) {
            setAlertMessage('Ошибка сохранения: Необходимо выбрать хотя бы один день недели')
            setAlertShow(true)
            return
        }

        if (intervalExecution === 'gap' && typeof daysInRow === 'string') {
            setAlertMessage('Ошибка сохранения: Количество дней активности должно быть числом')
            setAlertShow(true)
            return
        }

        if (intervalExecution === 'gap' && Number(daysInRow) === 0) {
            setAlertMessage('Ошибка сохранения: Количество дней активности не должны быть равны нулю')
            setAlertShow(true)
            return
        }

        if (intervalExecution === 'gap' && typeof skipDays === 'string') {
            setAlertMessage('Ошибка сохранения: Значение для отдыха должно быть числом')
            setAlertShow(true)
            return
        }

        if (intervalExecution === 'gap' && Number(skipDays) === 0) {
            setAlertMessage('Ошибка сохранения: Количество дней отдыха не должны быть равны нулю')
            setAlertShow(true)
            return
        }

        if (typeOfTask === 'reusable_mark' && typeof quantity === 'string') {
            setAlertMessage('Ошибка сохранения: Количество должно быть числом')
            setAlertShow(true)
            return
        }

        if (typeOfTask === 'reusable_mark' && Number(quantity) === 0) {
            setAlertMessage('Ошибка сохранения: Количество не должны быть равны нулю')
            setAlertShow(true)
            return
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
            "Удаление привычке",
            "Данное действие полностью удалит привычку, хотите продолжить ?",
            [
                { text: "Отмена", style: "cancel" },
                {
                    text: "Удалить",
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
                                {day}
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
                        placeholder='Активность'
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
                        placeholder='Отдых'
                        height={50}
                        width={SCREEN_WIDTH / 2 - 20}
                        onChange={(e) => {
                            setSkipDays(e)
                        }}
                        center={true}
                        numbersOnly={true}
                    />
                </XStack>
                <Text color={'white'} fontSize={12}>*Значение указывается в днях</Text>
            </YStack>
        )
    }, [daysInRow, skipDays])

    const choiceQuantity = useMemo(() => {
        return (
            <YStack>
                <CustomInput
                    value={quantity}
                    placeholder='Количество'
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
        <View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
            <SafeAreaView>
                <PortalProvider>
                    <YStack style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
                        <ScrollView maxHeight={SCREEN_HEIGHT} style={{ backgroundColor: '#222831' }} showsVerticalScrollIndicator={false}>
                            <YStack width={SCREEN_WIDTH} position='relative' justifyContent='center'>
                                <XStack alignItems='center' marginTop={10}>
                                    <View onPress={() => router.back()}>
                                        <ArrowBack size={36} />
                                    </View>
                                    <Text
                                        marginLeft={5}
                                        color={"$white"}
                                        fontSize={26}
                                    >
                                        {habitId === undefined ? 'Добавить привычку' : 'Изменить привычку'}
                                    </Text>
                                </XStack>

                                <YStack
                                    flex={1}
                                    alignItems="center"
                                    marginTop={20}
                                >
                                    <CustomInput
                                        value={habitName}
                                        height={50}
                                        width={SCREEN_WIDTH - 20}
                                        placeholder='Название привычке'
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
                                                Регулярная
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
                                                Одноразовая
                                            </Text>
                                        </Button>
                                    </XStack>

                                    <YStack marginTop={20} gap={15}>
                                        {typeOfHabit === 'reusable' ?
                                            <CustomSelect
                                                id={1}
                                                placeholder='Интервал выполнения'
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
                                                placeholder='Выберете дату'
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
                                            placeholder='Время суток'
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
                                            placeholder='Тип задачи'
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
                                                placeholder='Время'
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
                                                placeholder='Укажите время'

                                            />
                                        }

                                    </YStack>
                                    <YStack gap={10} marginTop={50} marginBottom={50}>
                                        <View height={50} width={SCREEN_WIDTH - 20}>
                                            {alertShow && <Text fontSize={SCREEN_WIDTH_400 ? 14 : 16} color={'red'}>{`${alertMessage}`}</Text>}
                                        </View>
                                        <Button
                                            fontSize={16}
                                            color={'white'}
                                            width={SCREEN_WIDTH - 20}
                                            size={'$5'}
                                            backgroundColor={'$blue'}
                                            onPress={() => saveHabit()}
                                        >
                                            Сохранить
                                        </Button>
                                        <Button
                                            fontSize={16}
                                            color={'white'}
                                            width={SCREEN_WIDTH - 20}
                                            size={'$5'}
                                            backgroundColor={'$gray'}
                                            onPress={() => router.back()}
                                        >
                                            Отмена
                                        </Button>
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
                                                Удалить
                                            </Button>
                                        }
                                    </YStack>
                                </YStack>
                            </YStack>
                        </ScrollView>
                    </YStack>
                </PortalProvider>
            </SafeAreaView>
        </View>
    )
}

export default React.memo(CreateNewHabits)