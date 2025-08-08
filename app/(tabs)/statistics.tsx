import { router } from "expo-router"
import React, { ReactNode, useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"
import CustomInput from "../components/custom_input/CustomInput"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "../constants"
import useStore, { IHabitTask } from "../store/zustand"

const Statistics = () => {

    const store: IHabitTask[] = Object.values(useStore(store => store.habitTask))
    const [searchValue, setSearchValue] = useState<string>('')
    const [habitListTask, SetHabitListTask] = useState<ReactNode[]>([])

    useEffect(() => {
        SetHabitListTask(store.filter((item) => {
            if (searchValue === '' || undefined) return true
            return item.habitConfig.name.toLowerCase().includes(searchValue.toLowerCase())
        }).map((item, index) => {
            return (
                <TouchableOpacity onPress={() => router.navigate({pathname: '/', params: {habitId: item.habitId}})}>
                    <XStack 
                        key={index} 
                        height={SCREEN_WIDTH_400 ? 50 : 60} 
                        width={'100%'} 
                        backgroundColor={'$gray'} 
                        borderRadius={10}
                        alignItems="center"
                    >
                        <Text 
                            marginLeft={10}
                            color={'white'}
                            fontSize={18}
                        >
                            {item.habitConfig.name}
                        </Text>
                    </XStack>
                </TouchableOpacity>
            )
        }))
    }, [searchValue])

    return (
        <View height={SCREEN_HEIGHT} backgroundColor={'$dark'}>
            <SafeAreaView>
                <YStack>
                    <XStack>
                        <Text
                            color={'white'}
                            fontSize={26}
                            marginLeft={15}
                        >
                            Статистика
                        </Text>
                    </XStack>
                    <YStack alignItems="center" marginTop={10}>
                        <XStack>
                            <CustomInput
                                value={searchValue}
                                onChange={(e) => {
                                    if (typeof e === 'string')
                                    setSearchValue(e)
                                }}
                                placeholder="Поиск"
                                height={50}
                                width={SCREEN_WIDTH - 20}
                            />
                        </XStack>
                        <YStack height={SCREEN_HEIGHT / 2} width={SCREEN_WIDTH - 20} marginTop={20}>
                            <ScrollView>
                                <View gap={10} alignContent="center">
                                    {
                                        habitListTask.length !== 0 ? habitListTask : 
                                        <Text color={'white'} textAlign="center" width={SCREEN_WIDTH - 20} fontSize={SCREEN_WIDTH_400 ? 16 : 18}>
                                            {
                                                store.length > 0 ? 
                                                'Привычка с таким названием не найдена' : 
                                                'Для отражения статистики создайте хотя бы одну привычку'
                                            }
                                        </Text>
                                    }
                                </View>
                            </ScrollView>
                        </YStack>
                    </YStack>   
                </YStack>
            </SafeAreaView>
        </View>
    )
}

export default React.memo(Statistics)