import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants"
import { IHabitTask } from '@/app/store/zustand'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useEffect, useState } from "react"
import { ScrollView, Text, YStack } from "tamagui"
import HabitCard from "../habit_card/HabitCard"

dayjs.extend(customParseFormat)

interface IHabitRender {
    selectDate: string,
    habitsStore: IHabitTask[],
    selectFilter: string
}

const HabitsRender = (props: IHabitRender) => {
    
    const [HabitCards, setHabitCards] = useState<Array<React.ReactNode>>([])

    useEffect(() => {
        setHabitCards(props.habitsStore
        .filter((item) => {
            const day = dayjs(item.habitConfig.day_of_create, 'YYYY-MM-DD')
            const currentDay = dayjs(props.selectDate, 'YYYY-MM-DD')
            return currentDay.isAfter(day) || currentDay.isSame(day)
        })
        .filter((item) => 
            isHabitVisible(item.habitConfig)
        )
        .filter(item => {
            if (props.selectFilter === 'all') {
                return true
            }

            return item.habitConfig.times_of_day === props.selectFilter
        })
        .map((item, index) => {
            return (
                <HabitCard
                    key={index}
                    habitId={item.habitId}
                    habitConfig={item.habitConfig}
                    selectDate={props.selectDate}
                />
            )
        }))
    }, [props.selectFilter, props.selectDate, props.habitsStore])

    const isHabitVisible = (habit: IHabitTask['habitConfig']) => {

        const {interval_execution, days_of_week, day_of_create, gap_interval, type_of_habit} = habit

        if (interval_execution === 'every_day') {
            return true
        }

        if (interval_execution === 'certain_days') {
            return days_of_week?.includes(dayjs(props.selectDate, 'YYYY-MM-DD')
            .format('dd')
            .replace(/^[п,в,с,ч]/, c => c.toUpperCase()))
        }

        if (interval_execution === 'gap') {
            const diffDays = dayjs(props.selectDate, 'YYYY-MM-DD').diff(dayjs(day_of_create, 'YYYY-MM-DD'), 'day')

            if (diffDays < 0 || gap_interval?.days_in_row === undefined || gap_interval?.skip_days === undefined) return false;

            const cycleLength = gap_interval.days_in_row + gap_interval.skip_days
            const cycleDay = diffDays % cycleLength

            return cycleDay < gap_interval?.days_in_row
        }

        if (type_of_habit === 'onetime') {
            return dayjs(props.selectDate, 'YYYY-MM-DD').isSame(dayjs(day_of_create, 'YYYY-MM-DD'))
        }

        return false
    }

    return (
        <YStack width={SCREEN_WIDTH - 40} background={'white'} marginTop={10}>
            <ScrollView 
                maxHeight={SCREEN_HEIGHT / 2} 
                showsVerticalScrollIndicator={false}
            >
                <YStack gap={10} alignItems="center">
                    {   
                        HabitCards.length !== 0 ? HabitCards :
                        <Text fontSize={SCREEN_WIDTH_400 ? 16 : 18} color={'white'}>У вас пока нет привычек, добавьте её</Text>
                    }
                </YStack>       
            </ScrollView>
        </YStack>
    )
}

export default React.memo(HabitsRender)