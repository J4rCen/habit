import CircularProgress from "@/app/components/habit_card/CircularProgress"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/app/constants"
import useStore from "@/app/store/zustand"
import ArrowBack from "@/app/svgs/arrowBack"
import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { Alert, BackHandler } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Text, View, XStack, YStack } from "tamagui"

const Timer = () => {

    const {timer, habitId, selectDate} = useLocalSearchParams()

    const setIsCompleat = useStore(store => store.setIsCompleat)
    const getIsCompleat = useStore(store => store.getIsCompleat(habitId as string)?.get(selectDate as string))

    console.log(getIsCompleat)

    const [timerStart, setTimerStart] = useState<boolean>(false)
    const [elapsed, setElapsed] = useState<number>(getIsCompleat !== undefined && getIsCompleat.elapsed !== undefined ? getIsCompleat.elapsed : 0)
    const duration = parseInt(timer as string)
    const isCompleat = getIsCompleat?.isCompleat
    
    console.log(isCompleat)
    
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Выход', 'Вы уверены, что хотите выйти?', [
            { text: 'Отмена', onPress: () => null, style: 'cancel' },
            { text: 'Да', onPress: () => BackHandler.exitApp() },
            ]);
            return true; // предотвращает стандартный возврат
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {

        if (!timerStart) return 

        const interval = setInterval(() => {
            setElapsed((prev) => {
                const next = prev + 1
                if (next >= duration) {
                    return duration
                }
                return next
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [timerStart])

    const startTimer = () => {
        setTimerStart(true)
    }

    const stopTimer = () => {
        setTimerStart(false)
        setIsCompleat(habitId as string, selectDate as string, {
            isCompleat: elapsed / duration,
            duration: duration,
            elapsed: elapsed
        })
    }

    const resetTimer = () => {
        setElapsed(0)
        setIsCompleat(habitId as string, selectDate as string, {
            isCompleat: 0 / duration,
            duration: duration,
            elapsed: 0
        })
        setTimerStart(false)
    }

    const returnBack = () => {

    }

    const compleat = () => {
        setElapsed(duration)
        setIsCompleat(habitId as string, selectDate as string, {
            isCompleat: 1,
            duration: duration,
            elapsed: duration
        })
    }

    const resetResult = () => {
        setElapsed(0)
        setIsCompleat(habitId as string, selectDate as string, {
            isCompleat: 0 / duration,
            duration: duration,
            elapsed: 0
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, maxHeight: SCREEN_HEIGHT }}>
            <YStack flex={1} backgroundColor={'$dark'}>
                <XStack alignItems='center' marginTop={10}>
                    <View onPress={() => router.back()}>
                        <ArrowBack size={36} />
                    </View>
                    <Text
                        marginLeft={5}
                        color={"$white"}
                        fontSize={26}
                    >
                        Таймер
                    </Text>
                </XStack>

                <YStack alignItems="center" justifyContent='flex-start' marginTop={20}>
                    <CircularProgress
                        goalType='timer'
                        duration={parseInt(timer as string)}
                        elapsed={elapsed}
                        progress={elapsed / duration}
                        size={SCREEN_HEIGHT / 3}
                        strokeWidth={40}
                        timer
                    />
                    <YStack marginTop={20} gap={5} width={SCREEN_WIDTH - 40}>
                        {
                            !timerStart && isCompleat !== 1 &&
                            <Button 
                                size={'$5'} 
                                onPress={() => startTimer()}
                                fontSize={18}
                                color={'white'}
                                backgroundColor={'$blue'}
                            >
                                <Text 
                                    color={'white'}
                                    fontSize={18}
                                >
                                    Старт
                                </Text>
                            </Button>
                        }

                        {
                            timerStart && isCompleat !== 1 &&
                            <>
                                <Button 
                                    size={'$5'} 
                                    onPress={() => stopTimer()}    
                                    fontSize={18}
                                    color={'white'}
                                    backgroundColor={'$blue'}
                                >
                                    <Text 
                                    color={'white'}
                                    fontSize={18}
                                    >
                                        Стоп
                                    </Text>
                                    
                                </Button>
                                <Button 
                                    size={'$5'}
                                    onPress={() => resetTimer()}    
                                    fontSize={18}
                                    color={'white'}
                                    backgroundColor={'$gray'}
                                >
                                    <Text 
                                    color={'white'}
                                    fontSize={18}
                                    >
                                        Сбросить таймер
                                    </Text>
                                    
                                </Button>
                            </>
                        }
                    </YStack>
                </YStack>

                <YStack width={SCREEN_WIDTH} alignContent="center" padding={10} backgroundColor={'$dark'} bottom={0} position='absolute'>
                    {
                        !isCompleat &&
                        <Button
                            width={SCREEN_WIDTH - 40}
                            size={'$5'}
                            alignSelf="center"
                            backgroundColor={'$green'}
                            
                            onPress={() => compleat()}
                        >
                            <Text 
                                color={'white'}
                                fontSize={18}
                            >
                                Завершить
                            </Text>
                        </Button>
                    }
                    {
                        isCompleat &&
                        <Button
                            width={SCREEN_WIDTH - 40}
                            size={'$5'}
                            alignSelf="center"
                            backgroundColor={'red'}
                            color={'white'}
                            fontSize={18}
                            onPress={() => resetResult()}
                        >
                            <Text 
                                color={'white'}
                                fontSize={18}
                            >
                                Сбросить результат
                            </Text>
                            
                        </Button>
                    }
                </YStack>
            </YStack>
        </SafeAreaView>
    )
}

export default React.memo(Timer)