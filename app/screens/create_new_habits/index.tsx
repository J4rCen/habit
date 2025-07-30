import CustomInput from '@/app/components/custom_input/CustomInput';
import CustomSelect from '@/app/components/custom_select/CustomSelect';
import ReminderToggle from '@/app/components/reminder_toggle/ReminderToggle';
import CustomTimePicker from '@/app/components/timepicker/CustomTimePicker';
import { SCREEN_HEIGHT, SCREEN_WIDTH, WEEK_DAYS } from '@/app/constants';
import useStore, { IHabitTask } from '@/app/store/zustand';
import ArrowBack from '@/app/svgs/arrowBack';
import { PortalProvider } from '@tamagui/portal';
import { router } from 'expo-router';
import { nanoid } from 'nanoid/non-secure';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ScrollView, Stack, Text, View, XStack, YStack } from "tamagui";
import { optionIntervalExecution, optionTimesOfDay, optionTypeOfTask } from './setDefaultData';


const CreateNewHabits = () => {

    const [habitName, setHabitName] = useState('')
    const [typeOfHabit, setTypeOfHabit] = useState<'reusable' | 'onetime'>('reusable')
    const [intervalExecution, setIntervalExecution] = useState<string>("every_day")
    const [timesOfDay, setTimesOfDay] = useState<string>("all")
    const [typeOfTask, setTypeOfTask] = useState<string>("single_mark")
    const [oneActive, setOneActive] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
    const [daysInRow, setDaysInRow] = useState<number>(0)
    const [skipDays, setSkipDays] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(0)
    const [timerTime, setTimerTime] = useState('00:00')
    const [reminderOn, setReminderOn] = useState(false)
    const [reminderTime, setReminderTime] = useState(
        `${
            new Date().getHours().toString().padStart(2, '0')
        }:${
            new Date().getMinutes().toString().padStart(2, '0')
        }`
    )

    const store = useStore(state => state)

    const saveNewHabit = () => {
        const newHabitData: IHabitTask = {
            habitId: nanoid(),
            habitConfig: {
                name: habitName,
                type_of_habit: typeOfHabit,
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
                    {days_in_row: daysInRow, skip_days: skipDays} : 
                    null,
                times_of_day: timesOfDay as 'all' | 'morning' | 'day' | 'evening',
                type_of_task: typeOfTask as 'single_mark' | 'reusable_mark' | 'timer',
                timer_time: 
                    typeOfTask === 'timer' ? 
                    timerTime :
                    null,
                quantity: 
                    typeOfTask === 'reusable_mark' ? 
                    quantity:
                    null,
                reminder: reminderOn,
                reminder_time: reminderOn ? reminderTime : null
            }
        }    
        store.setHabitTask(newHabitData.habitId, newHabitData)
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
                        padding={12}
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
                        <Text color="white" fontSize={16}>
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
                            if (typeof e === 'number')setDaysInRow(e)
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
                            if (typeof e === 'number') setSkipDays(e)
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
                        if (typeof e === 'number') setQuantity(e);
                    }}
                    center={true}
                    numbersOnly={true}
                />
            </YStack>
        )
    }, [quantity])
    
    return (
        <SafeAreaView style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}>
            <PortalProvider>
                <ScrollView maxHeight={SCREEN_HEIGHT} style={{backgroundColor: '#222831'}}>
                    <YStack width={SCREEN_WIDTH} position='relative' justifyContent='center'>
                        <XStack alignItems='center' marginTop={10}>
                            <View onPress={() => router.back()}>
                                <ArrowBack size={36}/>
                            </View>
                            <Text
                                marginLeft={5}
                                color={"$white"}
                                fontSize={26}
                            >Добавить привычку</Text>
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
                            <XStack margin={10}justifyContent='center'>
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

                            <YStack marginTop={10} gap={15}>
                                {typeOfHabit === 'reusable' &&
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
                                    onChange={setReminderOn}
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
                                <Button 
                                    fontSize={16} 
                                    color={'white'} 
                                    width={SCREEN_WIDTH - 20} 
                                    backgroundColor={'$blue'}
                                    onPress={() => saveNewHabit()}
                                >
                                    Создать
                                </Button>
                                <Button 
                                    fontSize={16} 
                                    color={'white'} 
                                    width={SCREEN_WIDTH - 20} 
                                    backgroundColor={'$gray'} 
                                    onPress={() => router.back()}
                                >
                                    Отмена
                                </Button>
                            </YStack>
                        </YStack>
                    </YStack>
                </ScrollView>
            </PortalProvider>
        </SafeAreaView>
    )
}

export default React.memo(CreateNewHabits)