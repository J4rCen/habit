import CircularProgress from "@/app/components/habit_card/circularProgress";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/app/constants";
import useStore from "@/app/store/zustand";
import ArrowBack from "@/app/svgs/arrowBack";
import { EventArg, NavigationAction } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View, XStack, YStack } from "tamagui";

type BeforeRemoveEvent = EventArg<"beforeRemove", true, { action: NavigationAction }>;

const Timer = () => {
    const { timer, habitId, selectDate } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();

    const setIsCompleat = useStore((store) => store.setIsCompleat);

    const habitIdStr = habitId as string;
    const selectDateStr = selectDate as string;
    const duration = Number(timer);

    const isCompleatData = useMemo(
        () => useStore.getState().getIsCompleat(habitIdStr)?.[`${selectDateStr}`],
        [habitIdStr, selectDateStr]
    );

    const [timerStart, setTimerStart] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(isCompleatData?.elapsed ?? 0);
    const [isFinish, setIsFinish] = useState(isCompleatData?.isCompleat ?? 0);

    const elapsedRef = useRef(elapsed);
    const isFinishRef = useRef(isFinish);

    const updateCompletion = useCallback(
        (elapsedTime: number, completed: boolean) => {
            setIsCompleat(habitIdStr, selectDateStr, {
                isCompleat: completed ? 1 : elapsedTime / duration,
                duration,
                elapsed: elapsedTime,
            });
        },
        [habitIdStr, selectDateStr, duration, setIsCompleat]
    );

    useEffect(() => {
        elapsedRef.current = elapsed;
    }, [elapsed]);

    useEffect(() => {
        isFinishRef.current = isFinish;
    }, [isFinish]);

    useEffect(() => {
        const beforeRemove = (e: BeforeRemoveEvent) => {
            if (isFinishRef.current === 1) return;

            e.preventDefault();
            Alert.alert(
                "Выход со страницы таймера",
                "Таймер остановится, но прогресс сохранится.",
                [
                    { text: "Отмена", style: "cancel" },
                    {
                        text: "Выйти",
                        style: "destructive",
                        onPress: () => {
                            setTimerStart(false);
                            updateCompletion(elapsedRef.current, false);
                            navigation.dispatch(e.data.action);
                        },
                    },
                ]
            );
        };

        return navigation.addListener("beforeRemove", beforeRemove);
    }, [navigation, updateCompletion]);

    const startTimer = () => {
        setTimerStart(true)
        setStartTime(Date.now() - elapsed * 1000);
    };

    useEffect(() => {
        if (!timerStart) return;
        if (!startTime) return 
        const interval = setInterval(() => {
            const diff = Math.floor((Date.now() - startTime) / 1000);
            setElapsed(diff);
        }, 1000);

        return () => clearInterval(interval);
    }, [timerStart]);

    useEffect(() => {
        if (elapsed >= duration && isFinish !== 1) {
            updateCompletion(duration, true);
            setIsFinish(1);
            setTimerStart(false);
        }
    }, [elapsed, duration, isFinish, updateCompletion]);

    const stopTimer = () => {
        setTimerStart(false);
        updateCompletion(elapsed, false);
    };

    const resetTimer = () => {
        setElapsed(0);
        setIsFinish(0);
        setTimerStart(false);
        updateCompletion(0, false);
    };

    const completeTimer = () => {
        setTimerStart(false)
        setElapsed(duration);
        setIsFinish(1);
        updateCompletion(duration, true);
    };

    return (
        <View backgroundColor={'$dark'} height={SCREEN_HEIGHT}>
            <SafeAreaView>
                <YStack backgroundColor="$dark" justifyContent='space-between'>
                    <XStack alignItems="center" marginTop={10}>
                        <View onPress={() => router.back()}>
                            <ArrowBack size={36} />
                        </View>
                        <Text marginLeft={5} color="$white" fontSize={26}>
                            Таймер
                        </Text>
                    </XStack>

                    <YStack alignItems="center" marginTop={20}>
                        <CircularProgress
                            goalType="timer"
                            duration={duration}
                            elapsed={elapsed}
                            progress={elapsed / duration}
                            size={SCREEN_HEIGHT / 3}
                            strokeWidth={40}
                            timer
                        />
                        <YStack marginTop={20} gap={5} width={SCREEN_WIDTH - 40}>
                            {!timerStart && isFinish !== 1 && (
                                <Button
                                    size="$5"
                                    onPress={startTimer}
                                    backgroundColor="$blue"
                                >
                                    <Text color="white" fontSize={18}>Старт</Text>
                                </Button>
                            )}

                            {timerStart && isFinish !== 1 && (
                                <>
                                    <Button size="$5" onPress={stopTimer} backgroundColor="$blue">
                                        <Text color="white" fontSize={18}>Стоп</Text>
                                    </Button>
                                    <Button size="$5" onPress={resetTimer} backgroundColor="$gray">
                                        <Text color="white" fontSize={18}>Сбросить таймер</Text>
                                    </Button>
                                </>
                            )}
                        </YStack>
                    </YStack>

                    <YStack
                        width={SCREEN_WIDTH}
                        padding={10}
                        backgroundColor="$dark"


                    >
                        {isFinish !== 1 ? (
                            <Button
                                width={SCREEN_WIDTH - 40}
                                size="$5"
                                alignSelf="center"
                                backgroundColor="$green"
                                onPress={completeTimer}
                            >
                                <Text color="white" fontSize={18}>Завершить</Text>
                            </Button>
                        ) : (
                            <Button
                                width={SCREEN_WIDTH - 40}
                                size="$5"
                                alignSelf="center"
                                backgroundColor="red"
                                onPress={resetTimer}
                            >
                                <Text color="white" fontSize={18}>Сбросить результат</Text>
                            </Button>
                        )}
                    </YStack>
                </YStack>
            </SafeAreaView>
        </View>
    );
};

export default React.memo(Timer);