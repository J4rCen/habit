import HabitCard from '@/app/components/habit_card/HabitCard'
import { SCREEN_WIDTH } from "@/app/constants"
import { IHabitTask } from '@/app/store/zustand'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React from "react"
import { ScrollView, Text, YStack } from "tamagui"

dayjs.extend(customParseFormat)

interface IHabitRender {
    selectDate: string,
    habitsStore: IHabitTask[]
}

const HabitsRender = (props: IHabitRender) => {   

    console.log(props.selectDate)
    console.log(dayjs(props.selectDate, 'DD-MM-YYYY'))

    return (
        <YStack width={SCREEN_WIDTH - 40} background={'white'} marginTop={10}>
            <ScrollView>
                <YStack gap={10}>
                    {
                        props.habitsStore.length !== 0 ?
                        props.habitsStore.map((item, index) => {
                            return (
                                <HabitCard
                                    key={index}
                                    habitId={item.habitId}
                                    habitConfig={item.habitConfig}
                                    isCompleat={item.habitStatic?.isCompleat}
                                />
                            )
                        }) : 
                        <Text>У вас пока нет привычек, создайте её</Text>
                    }
                </YStack>       
            </ScrollView>
        </YStack>
    )
}

export default React.memo(HabitsRender)

