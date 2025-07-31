import { IHabitTask } from "@/app/store/zustand"
import React from "react"
import { TouchableOpacity } from "react-native"
import { Text, XStack, YStack } from "tamagui"
import CircularProgress from "./CircularProgress"


interface IHabitCard {
    habitId: string
    habitConfig: IHabitTask['habitConfig']
    isCompleat: IHabitTask['habitStatic']
}

const HabitCard = ({habitId, habitConfig, isCompleat}: IHabitCard) => {

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
                    progress={0}
                    size={55}
                />
            )
        }

        // if (habitConfig.type_of_task === 'reusable_mark') {
        //     return (
        //         <CircularProgress
        //             goalType='reusable'
        //             value={}
        //             total={}
        //             progress={}
        //             size={55}
        //         />
        //     )
        // }

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
                <TouchableOpacity style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgressType/>
                </TouchableOpacity>
            </XStack>
        </YStack>
    )
}

export default React.memo(HabitCard)