import { DaySvg, EveningSvg, MorningSvg } from "@/app/svgs/filtersButtonSvgs";
import { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Text, XStack } from "tamagui";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface IFilteringButtonsTime {
    selectFilter: string, setSelectFilter: 
    Dispatch<SetStateAction<string>>
}

const FilteringButtonsTime = (props: IFilteringButtonsTime) => {

    const setSelect = (key: string) => {
        props.setSelectFilter(key)
    } 

    return (
        <XStack style={styles.buttonsContainer} alignItems="center" justifyContent="center" width={SCREEN_WIDTH}>
            <Button 
                style={[styles.filterButton, props.selectFilter === 'all' && styles.selectButton]} 
                borderTopRightRadius={0} 
                borderBottomRightRadius={0}
                onPress={() => setSelect('all')}
            >
                <Text color={'$white'}>Любое</Text>
            </Button>
            <Button
                style={[styles.filterButton, props.selectFilter === 'morning' && styles.selectButton]}  
                borderRadius={0}
                onPress={() => setSelect('morning')}
            >
                <MorningSvg/>
                <Text color={'$white'}>Утро</Text>
            </Button>
            <Button 
                style={[styles.filterButton, props.selectFilter === 'day' && styles.selectButton]} 
                borderRadius={0}
                onPress={() => setSelect('day')}
            >
                <DaySvg/>
                <Text color={'$white'}>День</Text>
            </Button>
            <Button 
                style={[styles.filterButton, props.selectFilter === 'evening' && styles.selectButton]} 
                borderTopLeftRadius={0} 
                borderBottomLeftRadius={0}
                onPress={() => setSelect('evening')}
            >
                <EveningSvg/>
                <Text color={'$white'}>Вечер</Text>
            </Button>
        </XStack>
    )
}

export default FilteringButtonsTime

const styles = StyleSheet.create({
    buttonsContainer: {
        marginTop: 5,
        width: SCREEN_WIDTH
    },
    filterButton: {
        height: 45,
        width: (SCREEN_WIDTH / 4) - 10,
        backgroundColor: '#393E46',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectButton: {
        backgroundColor: '#194A98'
    }
})