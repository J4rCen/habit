import { DATE_FORMAT, SCREEN_WIDTH_400 } from '@/app/constants';
import { IHabitTask } from '@/app/store/zustand';
import f from '@/assets/fonts/Inter_28pt-Regular.ttf';
import { useFont } from "@shopify/react-native-skia";
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { StyleSheet } from "react-native";
import { Text, View, YStack } from "tamagui";
import { Pie, PolarChart } from "victory-native";

interface IPieChart {
    pastDays: number
    habitStart: string
    habitConfig: IHabitTask['habitConfig']
    statistics: IHabitTask['habitStatic']
}

const PieChart = ({ pastDays, statistics, habitConfig, habitStart }: IPieChart) => {

    const font = useFont(f, 18)

    const [completed, setCompleted] = useState<number>(0)
    const [missed, setMissed] = useState<number>(0)
    const {t} = useTranslation()


    useEffect(() => {
        let c = 0
        let p = 0

        if (habitConfig.interval_execution === 'every_day') {
            p = pastDays
            c = 0
            if (statistics !== null) {
                c = Object.values(statistics).reduce((sum, item) => {
                    if (item.isCompleat === 1) {
                        return sum + 1
                    }
                    return sum
                }, 0)
            }
        }

        if (habitConfig.interval_execution === 'certain_days') {
            for (let i = 0; i < pastDays; i++) {
                const day = dayjs(habitStart).add(i, 'day');

                if (habitConfig.days_of_week?.includes(day.locale('en').format('ddd').toLowerCase())) {
                    p += 1
                    if (statistics?.[day.format(DATE_FORMAT)]?.isCompleat === 1) {
                        c += 1
                    }
                }
            }
        }

        if (habitConfig.interval_execution === 'gap') {
            const { days_in_row, skip_days } = habitConfig.gap_interval as { days_in_row: number, skip_days: number }
            const cycleDay = days_in_row + skip_days
            const diffDay = dayjs().diff(dayjs(habitConfig.day_of_create, DATE_FORMAT), 'day')

            for (let i = 0; i <= diffDay; i++) {
                const cycleLength = i % cycleDay

                if (cycleLength < days_in_row) {
                    const day = dayjs(habitStart).add(i, 'day').format(DATE_FORMAT);
                    p += 1
                    if (statistics?.[day]?.isCompleat === 1) {
                        c += 1
                    }
                }
            }

        }

        setCompleted(c)
        setMissed(p - c)
    }, [])


    const data = [
        { label: t('statistics.complete'), value: completed, color: "#28a745" },
        { label: t('statistics.missed'), value: missed, color: "#8b0000" },
    ];

    const total = useMemo(
        () => data.reduce((sum, item) => sum + item.value, 0),
        [data]
    );

    return (
        <YStack backgroundColor={'$gray'} borderRadius={10}>
            <View>
                <View height={300} alignContent="center" justifyContent="center">
                    <PolarChart data={data} valueKey="value" labelKey="label" colorKey="color">
                        <Pie.Chart innerRadius={50} size={SCREEN_WIDTH_400 ? 180 : 200} startAngle={270}>
                            {({ slice }) => {
                                const outer = slice.radius ?? 100;
                                const inner = slice.innerRadius ?? 50;

                                let radiusOffset = ((outer + inner) / (2 * outer));
                                const percent = total > 0 ? (slice.value / total) * 100 : 0;
                                const text = `${Math.round(percent)}%`;

                                if (completed === 0 || missed == 0) {
                                    radiusOffset = 0.09
                                }

                                if (slice.value === 0) {
                                    return
                                }

                                return (
                                    <Pie.Slice >
                                        <Pie.Label
                                            text={text}
                                            color="white"
                                            radiusOffset={radiusOffset}
                                            font={font}
                                        />
                                    </Pie.Slice>
                                );
                            }}
                        </Pie.Chart>
                    </PolarChart>
                </View>

                <View style={styles.legend}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.dot, { backgroundColor: item.color }]} />
                            <Text style={styles.label}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </YStack>
    )
}

const styles = StyleSheet.create({
    legend: {
        position: "absolute",
        bottom: 16,
        flexDirection: 'column',
        gap: 16,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    label: {
        fontSize: 14,
        color: "#fff",
    },
});

export default React.memo(PieChart)