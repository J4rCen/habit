import { SCREEN_WIDTH } from "@/app/constants";
import PlaceholderWrap from "@/app/utilities/placeholderWrap";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "tamagui";

interface IInput {
    width?: number;
    height: number;
    value: string | number;
    placeholder: string;
    onChange?: (e: string | number) => void;
    center?: boolean;
    numbersOnly?: boolean;
    onReadonly?: boolean
    alwaysOpen?: boolean
}

const CustomInput = (props: IInput) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const onChangeText = (value: string | number) => {
        
        if (!props.onChange) return

        if (props.numbersOnly) {
            const onlyNumbers = value.toString().replace(/[^0-9]/g, '');
            const numericValue = onlyNumbers === '' ? '' : Number(onlyNumbers);
            props.onChange(numericValue);
        } else {
            props.onChange(value);
        }
    };

    return (
        <PlaceholderWrap height={props.height} width={props.width} isActive={props.alwaysOpen || props.value ? true : isActive} placeholder={props.placeholder}>
            <Input
                style={[styles.input, props.center ? { textAlign: 'center' } : {}]}
                width={props.width ?? SCREEN_WIDTH}
                height={props.height ?? 50}
                value={props.value.toString()}
                borderWidth="$1.5"
                borderRadius={20}
                onChangeText={onChangeText}
                readOnly={props.onReadonly}
                onFocus={() => setIsActive(true)}
                onBlur={() => { if (props.value === '') setIsActive(false) }}
                keyboardType={props.numbersOnly ? "numeric" : "default"}
            />
        </PlaceholderWrap>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#222831',
        borderColor: '#194A98',
        color: '#ffffff',
        fontSize: 20
    }
});

export default React.memo(CustomInput);
