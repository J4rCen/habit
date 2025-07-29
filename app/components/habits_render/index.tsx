import HabitCard from '@/app/components/habit_card'
import { SCREEN_WIDTH } from "@/app/constants"
import { IHabitTask } from '@/app/store/zustand'
import React from "react"
import { ScrollView, Text, YStack } from "tamagui"

interface IHabitRender {
    habitsStore: Pick<IHabitTask, 'habitConfig'>[]
}

const HabitsRender = ({habitsStore}: IHabitRender) => {    
    return (
        <YStack width={SCREEN_WIDTH - 40} background={'white'} marginTop={10}>
            <ScrollView>
                <YStack gap={10}>
                    {
                        habitsStore.length !== 0 ?
                        habitsStore.map((item, index) => {
                            return (
                                <HabitCard
                                    key={index}

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

