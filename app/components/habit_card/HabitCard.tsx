import useStore, { IHabitTask } from "@/app/store/zustand"
import React, { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { Text, XStack, YStack } from "tamagui"
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
    const getIsCompleat = useStore(store => store.getIsCompleat(habitId))

    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const value = getIsCompleat?.get(selectDate)
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

        // if (habitConfig.type_of_task === 'timer') {
        //     return (
        //         <CircularProgress
        //             goalType='timer'
        //             duration={}
        //             elapsed={}
        //             progress={progress}
        //             size={55}
        //         />
        //     )
        // }
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

            console.log(newProgress)

            setProgress(newProgress)
            setIsCompleat(habitId, selectDate, { 
                isCompleat: newProgress, 
                total: max, 
                value: newProgress 
            })
        }

        // if (habitConfig.type_of_task === 'timer' && habitConfig.timer_time) {
        //     const durationInSeconds = parseInt(habitConfig.timer_time) * 60 // если время — в минутах
        //     const newStatic = {
        //         isCompleat: 1, // или 0/1 в зависимости от логики завершения таймера
        //         duration: durationInSeconds,
        //         elapsed: durationInSeconds // или меньше, если ты считаешь в реальном времени
        //     }

        //     setProgress(1)
        //     setIsCompleat(habitId, selectDate, newStatic)
        // }
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