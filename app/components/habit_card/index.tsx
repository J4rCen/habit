import React from "react"
import { TouchableOpacity } from "react-native"
import { Text, XStack, YStack } from "tamagui"
import CircularProgress from "./circularProgress"

interface IHabitCard {
    id: string
    name: string
}

const HabitCard = () => {
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

    const progressUpdate = () => {

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
                        Test name
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress
                        goalType='multi'
                        total={10}
                        value={7}
                        progress={7 / 10}
                        size={50}
                    />
                </TouchableOpacity>
            </XStack>
        </YStack>
    )
}

export default React.memo(HabitCard)