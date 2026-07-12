import { SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants";
import { DaySvg, EveningSvg, MorningSvg } from "@/app/svgs/filtersButtonSvgs";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, XStack } from "tamagui";

interface IFilteringButtonsTime {
    selectFilter: string, setSelectFilter: 
    Dispatch<SetStateAction<string>>
}

const FilteringButtonsTime = (props: IFilteringButtonsTime) => {

    const {t} = useTranslation()
    
    const setSelect = (key: string) => {
        props.setSelectFilter(key)
    } 

    return (
        <XStack style={styles.buttonsContainer} alignItems="center" justifyContent="center" width={SCREEN_WIDTH}>
            <TouchableOpacity 
                style={[styles.filterButton, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}, props.selectFilter === 'all' && styles.selectButton]}
                onPress={() => setSelect('all')}
            >
                <Text style={styles.buttonText}>{t('listHabit.any')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.filterButton, props.selectFilter === 'morning' && styles.selectButton]}  
                onPress={() => setSelect('morning')}
            >
                <XStack alignItems="center" justifyContent="center">
                    <MorningSvg size={30}/>
                    <Text style={styles.buttonText}>{t('listHabit.morning')}</Text>
                </XStack>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.filterButton, props.selectFilter === 'day' && styles.selectButton]} 
                onPress={() => setSelect('day')}
            >
                <XStack alignItems="center" justifyContent="center">
                    <DaySvg size={30}/>
                    <Text style={styles.buttonText}>{t('listHabit.day')}</Text>
                </XStack>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.filterButton, {borderTopRightRadius: 10, borderBottomRightRadius: 10}, props.selectFilter === 'evening' && styles.selectButton]} 
                onPress={() => setSelect('evening')}
            >
                <XStack alignItems="center" justifyContent="center">
                    <EveningSvg size={26}/>
                    <Text style={styles.buttonText}>{t('listHabit.evening')}</Text>
                </XStack>
            </TouchableOpacity>
        </XStack>
    )
}

export default React.memo(FilteringButtonsTime)

const styles = StyleSheet.create({
    buttonsContainer: {
        marginTop: 5,
        width: SCREEN_WIDTH,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: SCREEN_WIDTH_400 ? 12 : 14,
        marginLeft: SCREEN_WIDTH_400 ? 0 : 5
    },
    filterButton: {
        height: SCREEN_WIDTH_400 ? 40 : 45,
        width: (SCREEN_WIDTH / 4) - 10,
        backgroundColor: '#393E46',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectButton: {
        backgroundColor: '#194A98'
    }
})