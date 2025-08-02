import useStore, { IHabitTask } from "@/app/store/zustand"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { Text, View, XStack, YStack } from "tamagui"
import CircularProgress from "./CircularProgress"


interface IHabitCard {
    habitId: string
    habitConfig: IHabitTask['habitConfig']
    selectDate: string
}

const round = (num: number, precision: number = 6) =>
  Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)

const HabitCard = ({habitId, habitConfig, selectDate}: IHabitCard) => {

    const setIsCompleat = useStore(store => store.setIsCompleat)
    const getIsCompleat = useStore(store => store.getIsCompleat(habitId)?.get(selectDate))

    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const value = getIsCompleat
        if (value && typeof value.isCompleat === 'number') {
            setProgress(value.isCompleat)
        } else {
            setProgress(0)
        }
        }, [getIsCompleat, selectDate]
    )


    // const duration = 15 * 60 // 15 минут в секундах
    // const [elapsed, setElapsed] = useState(0)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //     setElapsed((prev) => {
    //         if (prev >= duration) {
    //         clearInterval(interval)
    //         return duration
    //         }
    //         return prev + 1
    //     })
    //     }, 1000)

    //     return () => clearInterval(interval)
    // }, [])

    // const progress = elapsed / duration


    // 'single_mark' | 'reusable_mark' | 'timer

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
                <View onPress={() => router.navigate({pathname: '../../screens/timer', params: {timer: hours + minutes, habitId, selectDate }})}>
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
            const newProgress = progress === 1 ? 0 : 1 // переключаем
            setProgress(newProgress)
            setIsCompleat(habitId, selectDate, { isCompleat: newProgress })
        }

        if (habitConfig.type_of_task === 'reusable_mark' && habitConfig.quantity) {
            const max = habitConfig.quantity
            const step = 1 / max
            let newProgress = round(progress + step)

            if (newProgress > 1) {
                newProgress = 0
            }

            setProgress(newProgress)
            setIsCompleat(habitId, selectDate, { 
                isCompleat: newProgress, 
                total: max, 
                value: newProgress 
            })
        }
    }

    return (
        <YStack
            height={70} 
            backgroundColor={'$gray'}
            borderRadius={10}
        >
            <XStack 
                flex={1}
                alignItems="center"
                
            >
                <TouchableOpacity style={{width: '70%', height: '100%', justifyContent: 'center'}}>
                    <Text
                        color={'white'}
                        fontSize={22}
                        marginLeft={10}
                    >
                        {habitConfig.name}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}} 
                    onPress={() => progressUpdate()}
                >
                    <CircularProgressType/>
                </TouchableOpacity>
            </XStack>
        </YStack>
    )
}

export default React.memo(HabitCard)