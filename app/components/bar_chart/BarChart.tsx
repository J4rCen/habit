import { SCREEN_WIDTH } from '@/app/constants'
import { IHabitTask } from '@/app/store/zustand'
import f from '@/assets/fonts/Inter_28pt-Regular.ttf'
import { Text as SkiaText, useFont } from '@shopify/react-native-skia'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView, Text, XStack, YStack } from 'tamagui'
import { Bar, CartesianChart } from 'victory-native'

interface IBarChart {
    habitStart: string
    pastDays: number,
    statistics: IHabitTask['habitStatic']
}

const BarChart = ({habitStart, pastDays, statistics}: IBarChart) => {

    const font = useFont(f, 16)
    const [barTime, setBarTime] = useState<'month' | 'year'>('month')


    const data1 = Array.from({ length: 12 }, (_, index) => ({
        // Starting at 1 for January
        month: index + 1,
        // Randomizing the listen count between 100 and 50
        listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    }))

    return (
        <YStack backgroundColor={'$gray'} borderRadius={10} padding={10} >
            <XStack marginBottom={20} justifyContent='space-around' >
                <TouchableOpacity><Text>{'<'}</Text></TouchableOpacity>
                <Text>Августа</Text>
                <TouchableOpacity><Text>{'>'}</Text></TouchableOpacity>
            </XStack>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <YStack height={200} width={500}>
                    <CartesianChart
                        data={data1}
                        xKey="month"
                        yKeys={["listenCount"]}
                        domainPadding={{ left: 50, right: 50, top: 30 }}
                        axisOptions={{
                            lineColor: "#fff", // скрыли линии Y
                            labelColor: "#fff", // скрыли подписи Y
                            font: font,
                        }}
                    >
                        {({ points, chartBounds }) => (
                            <>
                                {/* Сами бары */}
                                <Bar
                                    color={"#194A98"}
                                    chartBounds={chartBounds}
                                    points={points.listenCount}
                                    barWidth={30}
                                    roundedCorners={{ topLeft: 5, topRight: 5 }}
                                />

                                {/* Цикл по точкам */}
                                {points.listenCount.map((point, i) => (
                                    <React.Fragment key={i}>
                                        {/* Значение на баре */}
                                        <SkiaText
                                            x={point.x}
                                            // y={point.y - 8}
                                            font={font}
                                            text={String(data1[i].listenCount)}
                                        />

                                        {/* Подпись под баром */}
                                        <SkiaText
                                            x={point.x}
                                            y={chartBounds.bottom + 14}
                                            font={font}
                                            text={new Date(2023, data1[i].month - 1).toLocaleString(
                                                "ru",
                                                { month: "short" }
                                            )}
                                        />
                                    </React.Fragment>
                                ))}
                            </>
                        )}
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