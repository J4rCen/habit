import { SCREEN_WIDTH, SCREEN_WIDTH_400 } from '@/app/constants';
import { IHabitTask } from '@/app/store/zustand';
import f from '@/assets/fonts/Inter_28pt-Regular.ttf';
import { Text as SkiaText, useFont } from '@shopify/react-native-skia';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, Text, XStack, YStack } from 'tamagui';
import { Bar, CartesianChart } from 'victory-native';

interface IBarChart {
    habitStart: string;
    statistics: IHabitTask['habitStatic'];
}

const BarChart = ({ habitStart, statistics }: IBarChart) => {
    const font = useFont(f, 16);
    const [barTime, setBarTime] = useState<'month' | 'year'>('month');
    const [selectYear, setSelectYear] = useState(dayjs().format('YYYY'));
    const [data, setData] = useState<{ label: number | string; listenCount: number }[]>([]);

    useEffect(() => {
        if (!statistics) return;

        const countByDate = (prefix: string) =>
            Object.entries(statistics).reduce(
                (sum, [date, stat]) => sum + (date.startsWith(prefix) && stat.isCompleat === 1 ? 1 : 0),
                0
            );

        if (barTime === 'month') {
            setData(
                Array.from({ length: 12 }, (_, i) => ({
                    label: i + 1,
                    listenCount: countByDate(`${selectYear}-${String(i + 1).padStart(2, '0')}`)
                }))
            );
        } else {
            const diffYear = dayjs().diff(dayjs(habitStart), 'year') + 1;
            setData(
                Array.from({ length: 12 }, (_, i) =>
                    i < diffYear
                        ? { label: dayjs(habitStart).add(i, 'year').year(), listenCount: countByDate(String(dayjs(habitStart).add(i, 'year').year())) }
                        : { label: '', listenCount: 0 }
                )
            );
        }
    }, [barTime, selectYear, habitStart, statistics]);

    const changeYear = (direction: 'next' | 'back') => {
        if (direction === 'next') {
            setSelectYear(dayjs(selectYear, 'YYYY').add(1, 'year').format('YYYY'));
        } else {
            setSelectYear(dayjs(selectYear, 'YYYY').subtract(1, 'year').format('YYYY'));
        };
    };

    return (
        <YStack backgroundColor={'$gray'} borderRadius={10} padding={10}>
            
                <XStack marginBottom={20} justifyContent='space-around' height={30} alignItems='center'>
                {barTime === 'month' && (
                    <>
                        <TouchableOpacity style={{ padding: 5 }} onPress={() => changeYear('back')}>
                            <Text color={'white'} fontSize={18}>{'<'}</Text>
                        </TouchableOpacity>
                        <Text color={'white'} fontSize={18}>{selectYear}</Text>
                        <TouchableOpacity style={{ padding: 5 }} onPress={() => changeYear('next')}>
                            <Text color={'white'} fontSize={18}>{'>'}</Text>
                        </TouchableOpacity>
                    </>
                )}
                </XStack>
            

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <YStack height={300} width={SCREEN_WIDTH_400 ? 600 : 700} left={-15}>
                    <CartesianChart
                        data={data}
                        xKey="label"
                        yKeys={["listenCount"]}
                        domainPadding={{ left: 50, right: 50, top: 30 }}
                        axisOptions={{
                            tickCount: 12,
                            lineColor: "#fff",
                            labelColor: { x: "#fff", y: "transparent" },
                            font,
                            formatXLabel: (value) =>
                                barTime === 'month'
                                    ? new Date(Number(selectYear), Number(value) - 1).toLocaleString("ru", { month: "short" })
                                    : value ? String(value) : ''
                        }}
                    >
                        {({ points, chartBounds }) => (
                            <>
                                <Bar
                                    color="#194A98"
                                    chartBounds={chartBounds}
                                    points={points.listenCount}
                                    barWidth={30}
                                    roundedCorners={{ topLeft: 5, topRight: 5 }}
                                />
                                {points.listenCount.map((point, i) =>
                                    data[i].listenCount && point.y != null
                                        ? <SkiaText key={i} x={point.x - 6} y={point.y - 10} font={font} text={String(data[i].listenCount)} color="#fff" />
                                        : null
                                )}
                            </>
                        )}
                    </CartesianChart>
                </YStack>
            </ScrollView>

            <XStack justifyContent="center" gap={10} marginTop={20}>
                {['month', 'year'].map((mode) => (
                    <TouchableOpacity
                        key={mode}
                        style={[styles.buttonBar, barTime === mode ? { backgroundColor: '#194A98' } : { backgroundColor: '#393E46' }]}
                        onPress={() => setBarTime(mode as 'month' | 'year')}
                    >
                        <Text style={styles.buttonTextBar}>{mode === 'month' ? 'Месяц' : 'Год'}</Text>
                    </TouchableOpacity>
                ))}
            </XStack>
        </YStack>
    );
};

const styles = StyleSheet.create({
    buttonBar: {
        borderColor: '#194A98',
        borderWidth: 5,
        width: (SCREEN_WIDTH - 20) / 4,
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonTextBar: {
        color: '#fff',
        fontSize: 16,
    },
});

export default React.memo(BarChart);
