import ArrowSelect from "@/app/svgs/arrowSelect"
import PlaceholderWrap from "@/app/utilities/placeholderWrap"
import React, { useState } from "react"
import { Select, styled, YStack } from "tamagui"

interface ISelect {
    width?: number
    height: number
    options: Array<{
        key: string,
        label: string 
    }>
    placeholder: string
    value: string
    onChange: (e: string) => void
    default?: boolean 
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

    const [selectValue, setSelectValue] = useState<string>(props.default ? props.options[0].key : '')
    const [isActive, setIsActive] = useState<boolean>(selectValue ? true : false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const memoizedItems = React.useMemo(() => {
        return props.options.map((item, index) => (
            <CustomSelectItem
                index={index}
                value={item.key}
                key={item.key}
            >
                <CustomSelectItemText>
                    {item.label}
                </CustomSelectItemText>
            </CustomSelectItem>
        ))
    }, [props.options])

    const handleValueChange = (val: string) => {
        setSelectValue(val)
        props.onChange(val)

        setTimeout(() => {
            setIsOpen(false)
        }, 0)
    }

    const getLabelByKey = (key: string) => {
        return props.options.find(option => option.key === key)?.label || ''
    }

    return (
        <PlaceholderWrap isActive={isActive} height={props.height} width={props.width} placeholder={props.placeholder}>
            <Select
                value={selectValue} 
                onValueChange={handleValueChange}
                defaultValue={selectValue}
                onOpenChange={() => {
                    setIsOpen(true)
                    setIsActive(true)
                }}
            >
                <CustomSelectTrigger
                    width={props.width} 
                    iconAfter={<ArrowSelect color="#ffffff" size={20}/>}
                    zIndex={isOpen ? 12: 3}
                >
                    <CustomSelectValue>
                        {getLabelByKey(selectValue)}
                    </CustomSelectValue>
                </CustomSelectTrigger>

                {
                    isOpen &&
                    <YStack
                        borderColor={'$blue'}
                        backgroundColor={'$dark'}
                        paddingTop={15}
                        top={-15}
                        zIndex={isOpen ? 10 : 3}
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