import { router } from "expo-router"
import React, { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { TouchableOpacity } from "react-native"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"
import ContainerWrap from "../components/container_wrap/ContainerWrap"
import CustomInput from "../components/custom_input/CustomInput"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "../constants"
import useStore, { IHabitTask } from "../store/zustand"

const Statistics = () => {

    const store: IHabitTask[] = Object.values(useStore(store => store.habitTask))
    const [searchValue, setSearchValue] = useState<string>('')
    const { t } = useTranslation()

    const filteredHabits = useCallback(() => {
        return store.filter((item) => {
            if (searchValue === '' || undefined) return true
            return item.habitConfig.name.toLowerCase().includes(searchValue.toLowerCase())
        }).filter((item) => {
            if (item.habitConfig.type_of_habit === 'onetime') {
                return false
            }

            return true

        }).map((item, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => router.navigate({ pathname: '/screens/statistics', params: { habitId: item.habitId, habitName: item.habitConfig.name, habitStart: item.habitConfig.day_of_create } })}>
                    <XStack
                        height={SCREEN_WIDTH_400 ? 50 : 60}
                        width="100%"
                        backgroundColor="$gray"
                        borderRadius={10}
                        alignItems="center"
                        padding={5}
                    >
                        <Text
                            marginLeft={10}
                            color="white"
                            fontSize={18}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            flex={1}
                        >
                            {item.habitConfig.name}
                        </Text>
                    </XStack>
                </TouchableOpacity>
            )
        });
    }, [store, searchValue]);

    const habitListTask = useMemo(() => filteredHabits(), [filteredHabits]);

    return (
        <ContainerWrap>
            <YStack height={SCREEN_HEIGHT} backgroundColor='$dark'>
                <XStack>
                    <Text
                        color={'white'}
                        fontSize={26}
                        marginLeft={15}
                    >
                        {t('listHabit.statistics')}
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
                            placeholder={t('statistics.search')}
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
                                                    t('statistics.noHabitWithThisName') :
                                                    t('statistics.toDisplayStatistics')
                                            }
                                        </Text>
                                }
                            </View>
                        </ScrollView>
                    </YStack>
                </YStack>
            </YStack>
        </ContainerWrap>
    )
}

export default React.memo(Statistics)