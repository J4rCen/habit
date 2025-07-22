import ArrowSelect from "@/app/svgs/arrowSelect"
import PlaceholderWrap from "@/app/utilities/placeholderWrap"
import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { Select, styled, Text, YStack } from "tamagui"

interface ISelect {
    width?: number
    height: number
    value?: string
    placeholder: string
    onChange: (e: string) => void
}

const CustomSelectTrigger = styled(Select.Trigger, {
    backgroundColor: "$dark",
    borderStyle: 'solid',
    borderColor: '$blue',
    borderWidth: 4,
    borderRadius: 18,
    zIndex: 2,
    color: 'white',
    fontSize: 16
})



const CustomItem = (props: {value: string, index: number, text: string}) => {
    return (
        <Select.Item value={props.value} index={props.index} backgroundColor={'none'}>
            <Text
                color={'white'}
                fontSize={18}
            >
                {props.text}
            </Text>
        </Select.Item>
    )
}

const CustomSelect = (props: ISelect) => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)


    return (
        <PlaceholderWrap isActive={true} height={props.height} width={props.width} placeholder={props.placeholder}>
            <Select 
                open={open} 
                onOpenChange={setOpen}
                value={props.value}
                onValueChange={(e) => {console.log(e), props.onChange(e)}}
            >
                <CustomSelectTrigger width={props.width} iconAfter={<ArrowSelect color="#ffffff" size={20}/>}>
                    <Text color={'white'}
                fontSize={18}>{props.value}</Text>
                </CustomSelectTrigger>

                {open && (
                    <YStack
                        borderColor={'$blue'}
                        paddingTop={15}
                        top={-15}
                        zIndex={1}
                        borderWidth={5}
                        borderBottomRightRadius={18}
                        borderBottomLeftRadius={18}

                    >
                        <Select.Content>
                            <Select.Viewport>
                                <CustomItem value="option1" index={1} text="Опция 1"/>
                                <CustomItem value="option2" index={2} text="Опция 2"/>
                            </Select.Viewport>
                        </Select.Content>
                    </YStack>
                )}
                </Select>
        </PlaceholderWrap>
    )   
}

const styles = StyleSheet.create({
    selectContainer: {

    }
})

export default CustomSelect