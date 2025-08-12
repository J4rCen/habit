import { SCREEN_WIDTH } from '@/app/constants'
import { IHabitTask } from '@/app/store/zustand'
import f from '@/assets/fonts/Inter_28pt-Regular.ttf'
import { Text as SkiaText, useFont } from '@shopify/react-native-skia'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'
import { Bar, CartesianChart } from 'victory-native'


interface IBarChart {
    habitStart: string
    pastDays: number,
    statistics: IHabitTask['habitStatic']
}

const BarChart = ({ habitStart, pastDays, statistics }: IBarChart) => {

    const font = useFont(f, 16)
    const [barTime, setBarTime] = useState<'month' | 'year'>('month')
    const [selectYear, setSelectYear] = useState<string>(dayjs().format('YYYY'))
    const [data, setData] = useState<{
        label: number,
        listenCount: number
    }[]>([
        {
            label: 0,
            listenCount: 0
        }
    ])

    useEffect(() => {

        if (barTime === 'month') {

            const s = (searchValue: string) => {

                if (statistics) {
                    return Object.entries(statistics).reduce((sum, item) => {
                        if (item[0].includes(searchValue)) {
                            if (item[1].isCompleat && item[1].isCompleat == 1) {
                                return sum + 1
                            }
                        }

                        return sum
                    }, 0)

                }

                return 0
            }

            setData(Array.from({length: 12}, (_, i) => ({
                label: i + 1,
                listenCount: s(`${selectYear}-${String(i + 1).padStart(2, '0')}`)
            })))
        }

        if (barTime === 'year') {

            const diffYear = dayjs().diff(dayjs(habitStart), 'year') + 1

            const s = (searchValue: string) => {

                if (statistics) {
                    return Object.entries(statistics).reduce((sum, item) => {
                        if (item[0].includes(searchValue)) {
                            if (item[1].isCompleat && item[1].isCompleat == 1) {
                                return sum + 1
                            }
                        }

                        return sum
                    }, 0)

                }

                return 0
            }

            const d = Array.from({length: diffYear}, (_, i) => ({
                label: dayjs(habitStart).add(i, 'year').year(),
                listenCount: s(`${selectYear}`)

            }))

            console.log('d: ', d)

            setData(d)
        }

    }, [barTime, selectYear])

    const changeYear = (typeSelect: string) => {
        if (typeSelect === 'next') {
            setSelectYear(dayjs(selectYear, 'YYYY').add(1, 'year').format('YYYY'))
        }

        if (typeSelect === 'back') {
            setSelectYear(dayjs(selectYear, 'YYYY').subtract(1, 'year').format('YYYY'))
        }
    }

    return (
        <YStack backgroundColor={'$gray'} borderRadius={10} padding={10} >
            <XStack marginBottom={20} justifyContent='space-around' height={30} alignItems='center'>
                {
                    barTime !== 'year' ?
                        <>
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => changeYear('back')}>
                                <Text color={'white'} fontSize={18}>{'<'}</Text>
                            </TouchableOpacity>
                            <Text color={'white'} fontSize={18}>{selectYear}</Text>
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => changeYear('next')}>
                                <Text color={'white'} fontSize={18}>{'>'}</Text>
                            </TouchableOpacity>
                        </>:
                    null

                }
            </XStack>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <YStack height={300} width={700} >
                    <CartesianChart
                        data={data}
                        xKey="label"
                        yKeys={["listenCount"]}
                        domainPadding={{ left: 50, right: 50, top: 30 }}
                        axisOptions={{
                            tickCount: 12,
                            lineColor: "#fff",
                            labelColor: {
                                x: "#fff",
                                y: "rgba(255, 255, 255, 0)"
                            },
                            font: font,
                            formatXLabel: (value) => {

                                if (barTime === 'month')  {
                                    const date = new Date(2023, value - 1);
                                    return date.toLocaleString("ru", { month: "short" });
                                }

                                if (barTime === 'year') return selectYear
                                
                                return ''
                            },
                        }}

                    >
                        {({ points, chartBounds }) => {
                            // console.log('points: ', points.listenCount)
                            // console.log('chartBounds: ', chartBounds)
                            return <>
                                {/* Сами бары */}
                                <Bar
                                    color={"#194A98"}
                                    chartBounds={chartBounds}
                                    points={points.listenCount}
                                    barWidth={30}
                                    roundedCorners={{ topLeft: 5, topRight: 5 }}

                                />

                                {points.listenCount.map((point, i) => (
                                    <React.Fragment key={i}>
                                        {
                                            String(data[i].listenCount) !== '0' ? 
                                            <SkiaText
                                                x={point.x - 6}
                                                y={point.y - 10}
                                                font={font}
                                                text={String(data[i].listenCount)}
                                                color={'#fff'}
                                            />:
                                            null
                                            
                                        }
                                    </React.Fragment>
                                ))}
                            </>
                        }}
                    </CartesianChart>
                </YStack>
            </ScrollView>
            <XStack justifyContent="center" gap={10} marginTop={20}>
                <TouchableOpacity style={[styles.buttonBar, barTime === 'month' ? { backgroundColor: '#194A98' } : { backgroundColor: '#393E46' }]} onPress={() => setBarTime('month')}>
                    <Text style={styles.buttonTextBar}>Месяц</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonBar, barTime === 'year' ? { backgroundColor: '#194A98' } : { backgroundColor: '#393E46' }]} onPress={() => setBarTime('year')}>
                    <Text style={styles.buttonTextBar}>
                        Год
                    </Text>
                </TouchableOpacity>
            </XStack>
        </YStack>
    )
}

const styles = StyleSheet.create({
    buttonBar: {
        borderColor: '#194A98',
        borderWidth: 5,
        width: (SCREEN_WIDTH - 20) / 4,
        padding: 5,
        borderRadius: 10,

        alignItems: 'center'
    },
    buttonTextBar: {
        color: '#fff',
        fontSize: 16
    }
});

export default React.memo(BarChart)