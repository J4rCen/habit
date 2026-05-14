import ArrowSelect from "@/app/svgs/arrowSelect"
import PlaceholderWrap from "@/app/utilities/placeholderWrap"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Select, styled, YStack } from "tamagui"

interface ISelect {
    id: number
    width?: number
    height: number
    options: Array<{
        key: string,
        label: string 
    }>
    placeholder: string
    value: string
    onChange: (e: string) => void
    isOpen: boolean,
    setIsOpen: (e: boolean) => void
    setOneActive: (e: number) => void
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

const CustomSelectValue = styled(Select.Value, {
    fontSize: 18,
    color: 'white'
})

const CustomSelectItem = styled(Select.Item, {
    backgroundColor: 'none'
})

const CustomSelectItemText = styled(Select.ItemText, {
    fontSize: 18,
    color: 'white'
})

const CustomSelect = (props: ISelect) => {

    const [selectValue, setSelectValue] = useState<string>(props.options[0].key ?? '')
    const [isActive, setIsActive] = useState<boolean>(selectValue ? true : false)
    const {t} = useTranslation()

    const memoizedItems = React.useMemo(() => {
        return props.options.map((item, index) => (
            <CustomSelectItem
                index={index}
                value={item.key}
                key={item.key}
            >
                <CustomSelectItemText>
                    {t(`createHabit.${item.label}`)}
                </CustomSelectItemText>
            </CustomSelectItem>
        ))
    }, [props.options])

    const handleValueChange = (val: string) => {
        setSelectValue(val)
        props.onChange(val)

        setTimeout(() => {
            props.setIsOpen(false)
        }, 0)
    }

    const getLabelByKey = (key: string) => {
        const glk = props.options.find(option => option.key === key)?.label || ''
        return t(`createHabit.${glk}`)
    }

    return (
        <PlaceholderWrap isActive={isActive} isOpen={props.isOpen} height={props.height} width={props.width} placeholder={props.placeholder}>
            <Select
                open={props.isOpen}
                onOpenChange={() => {
                    props.setOneActive(props.id)
                    props.setIsOpen(!props.isOpen)
                }}
                value={selectValue} 
                onValueChange={handleValueChange}
                defaultValue={selectValue}
            >
                <CustomSelectTrigger
                    width={props.width} 
                    iconAfter={<ArrowSelect color="#ffffff" size={20}/>}
                    zIndex={props.isOpen ? 15 : 2}
                >
                    <CustomSelectValue>
                        {getLabelByKey(selectValue)}
                    </CustomSelectValue>
                </CustomSelectTrigger>

                {
                    props.isOpen &&
                    <YStack
                        borderColor={'$blue'}
                        backgroundColor={'$dark'}
                        overflow="hidden"
                        paddingTop={15}
                        top={-15}
                        zIndex={props.isOpen ? 14 : 1}
                        borderWidth={5}
                        borderBottomRightRadius={18}
                        borderBottomLeftRadius={18}
                    >
                        <Select.Content>
                            <Select.Viewport>
                                {memoizedItems}
                            </Select.Viewport>
                        </Select.Content>
                    </YStack>
                }

            </Select>
        </PlaceholderWrap>
    )   
}

export default React.memo(CustomSelect)