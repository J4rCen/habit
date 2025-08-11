import { IHabitTask } from '@/app/store/zustand';
import f from '@/assets/fonts/Inter_28pt-Regular.ttf';
import { useFont } from "@shopify/react-native-skia";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, YStack } from "tamagui";
import { Pie, PolarChart } from "victory-native";

interface IPieChart {
    pastDays: number
    statistics: IHabitTask['habitStatic']
}

const PieChart = ({pastDays, statistics}: IPieChart) => {

    const font = useFont(f, 18)

    const [completed, setCompleted] = useState<number>(0)
    const [missed, setMissed] = useState<number>(0)


    useEffect(() => {
        let c = 0
        if (statistics !== null) {
            c = Object.values(statistics).reduce((sum, item) => {
                if (item.isCompleat === 1) {
                    return sum + 1
                } 
                return sum
            }, 0)
        }

        setCompleted(c)
        setMissed(pastDays - c)
    }, [])


    const data = [
        { label: "Завершено", value: completed, color: "#28a745" },
        { label: "Пропущено", value: missed, color: "#8b0000" },
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
                        <Pie.Chart innerRadius={50} size={200} startAngle={270}>
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