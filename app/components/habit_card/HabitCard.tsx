import { DATE_FORMAT } from "@/app/constants"
import useStore, { IHabitTask } from "@/app/store/zustand"
import { Statistics } from "@/app/svgs/navigation"
import Pencil from "@/app/svgs/pencil."
import dayjs from "dayjs"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity } from "react-native"
import { Select, Text, View, XStack, YStack } from "tamagui"
import CircularProgress from "./circularProgress"


interface IHabitCard {
    habitId: string
    habitConfig: IHabitTask['habitConfig']
    selectDate: string,
    dataStart: string
}

const round = (num: number, precision: number = 6) => Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)

const HabitCard = ({ habitId, habitConfig, selectDate, dataStart }: IHabitCard) => {

    const setIsCompleat = useStore(store => store.setIsCompleat)
    const getIsCompleat = useStore(store => store.getIsCompleat(habitId)?.[`${selectDate}`])
    const [isOpen, setIsOpen] = useState(false);

    const [progress, setProgress] = useState<number>(0)
    const { t } = useTranslation()

    useEffect(() => {
        const value = getIsCompleat
        if (value && typeof value.isCompleat === 'number') {
            setProgress(value.isCompleat)
        } else {
            setProgress(0)
        }
    }, [getIsCompleat, selectDate]
    )

    const CircularProgressType = () => {
        if (habitConfig.type_of_task === 'single_mark') {
            return (
                <CircularProgress
                    goalType='single'
                    progress={progress}
                    size={55}
                />
            )
        }

        if (habitConfig.type_of_task === 'reusable_mark' && habitConfig.quantity) {
            return (
                <CircularProgress
                    goalType='reusable'
                    value={Math.round(round(progress * habitConfig.quantity))}
                    total={habitConfig.quantity}
                    progress={progress}
                    size={55}
                />
            )
        }

        if (habitConfig.type_of_task === 'timer' && habitConfig.timer_time) {

            const times = habitConfig.timer_time?.split(":")
            const elapsed = getIsCompleat ? getIsCompleat.elapsed : 0

            const hours = parseInt(times[0]) * 60 * 60
            const minutes = parseInt(times[1]) * 60

            return (
                <View onPress={() => router.navigate({ pathname: '../../screens/timer', params: { timer: hours + minutes, habitId, selectDate } })}>
                    <CircularProgress
                        goalType='timer'
                        duration={hours + minutes}
                        elapsed={elapsed}
                        progress={progress}
                        size={55}
                    />
                </View>
            )
        }
    }

    const progressUpdate = () => {
        if (habitConfig.type_of_task === 'single_mark') {
            const newProgress = progress === 1 ? 0 : 1
            setProgress(newProgress)
            setIsCompleat(habitId, selectDate, { isCompleat: newProgress })
        }

        if (habitConfig.type_of_task === 'reusable_mark' && habitConfig.quantity) {
            const max = habitConfig.quantity;

            let currentCount = Math.round(progress * max);

            currentCount++;

            if (currentCount > max) {
                currentCount = 0;
            }

            let newProgress = currentCount / max;

            setProgress(newProgress);
            setIsCompleat(habitId, selectDate, {
                isCompleat: newProgress,
                total: max,
                value: newProgress
            });
        }
    }

    return (
        <Select open={isOpen} onOpenChange={setIsOpen}>
            <YStack
                height={80}
                backgroundColor={'$gray'}
                borderRadius={10}
                zIndex={2}
            >
                <XStack
                    flex={1}
                    alignItems="center"
                >
                    <Select.Trigger
                        elevation={0}
                        backgroundColor={'$gray'}
                        width={'70%'}
                        height={'100%'}
                        marginTop={10}
                        marginBottom={10}
                        pressStyle={{
                            backgroundColor: 'none'
                        }}
                        focusStyle={{
                            backgroundColor: 'none'
                        }}
                        hoverStyle={{
                            backgroundColor: 'none'
                        }}
                        borderWidth={0}
                        borderColor={'none'}

                    >
                        <Text
                            color={'white'}
                            fontSize={22}
                            marginLeft={10}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            flex={1}

                        >
                            {habitConfig.name}
                        </Text>
                    </Select.Trigger>
                    {
                        dayjs(selectDate, DATE_FORMAT).isSameOrBefore(dayjs()) ?
                            <TouchableOpacity
                                style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => progressUpdate()}
                            >
                                <CircularProgressType />
                            </TouchableOpacity> :
                            <View style={{ width: '30%', height: '100%' }} />
                    }
                </XStack>
            </YStack>
            {isOpen &&
                <Select.Content>
                    <Select.FocusScope focusOnIdle={true}>
                        <YStack
                            backgroundColor={'#2C2F35'}
                            width={'100%'}
                            padding={10}
                            paddingTop={15}
                            zIndex={1}
                            borderBottomLeftRadius={10}
                            borderBottomRightRadius={10}
                            top={-20}
                            marginBottom={-20}
                            gap={10}
                        >
                            <XStack>
                                <TouchableOpacity
                                    style={{ width: '100%' }}
                                    onPress={() => router.navigate({ pathname: '/screens/create_new_habits', params: { habitId } })}
                                >
                                    <XStack alignItems="center">
                                        <Pencil color={'#fff'} size="24" />
                                        <Text
                                            marginLeft={5}
                                            color={'white'}
                                            fontSize={'$4.5'}
                                        >
                                            {t('listHabit.change')}
                                        </Text>
                                    </XStack>

                                </TouchableOpacity>
                            </XStack>
                            {
                                habitConfig.type_of_habit === 'reusable' ?
                                    <XStack>
                                        <TouchableOpacity
                                            style={{ width: '100%' }}
                                            onPress={() => router.navigate({ pathname: '/screens/statistics', params: { habitId: habitId, habitName: habitConfig.name, dataStart: dataStart, habitStart: habitConfig.day_of_create } })}
                                        >
                                            <XStack alignItems="center">
                                                <Statistics color={'#fff'} size="24" />
                                                <Text
                                                    marginLeft={5}
                                                    color={'white'}
                                                    fontSize={'$4.5'}
                                                >
                                                    {t('listHabit.statistics')}
                                                </Text>
                                            </XStack>
                                        </TouchableOpacity>
                                    </XStack> :
                                    null
                            }
                        </YStack>
                    </Select.FocusScope>
                </Select.Content>
            }
        </Select>
    )
}

export default React.memo(HabitCard)