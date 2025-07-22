import PlaceholderWrap from "@/app/utilities/placeholderWrap";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Input } from "tamagui";

const { width } = Dimensions.get('window');

interface IInput {
    width?: number
    height: number
    value: string
    placeholder: string
    onChange: (e: string) => void
}

const CustomInput = (props: IInput) => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <PlaceholderWrap height={props.height} width={props.width} isActive={isActive} placeholder={props.placeholder}>
            <Input
                style={styles.input}
                width={props.width ?? width}
                height={props.height ?? 50}
                value={props.value}
                borderWidth="$1.5"
                borderRadius={20}
                onChangeText={props.onChange}
                onFocus={() => setIsActive(true)}
                onBlur={() => {if (props.value === '') setIsActive(false)}}
            />
        </PlaceholderWrap>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#222831',
        borderColor: '#194A98',
        color: '#ffffff',
        fontSize: 20
    }
})

export default React.memo(CustomInput)