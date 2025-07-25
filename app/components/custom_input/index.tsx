import { SCREEN_WIDTH } from "@/app/constants";
import PlaceholderWrap from "@/app/utilities/placeholderWrap";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Input } from "tamagui";

interface IInput {
    width?: number;
    height: number;
    value: string | number;
    placeholder: string;
    onChange: (e: string | number) => void;
    center?: boolean;
    numbersOnly?: boolean;
}

const CustomInput = (props: IInput) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (props.value !== '') setIsActive(true);
        else setIsActive(false);
    }, [props.value]);

    const onChangeText = (value: string | number) => {
        if (props.numbersOnly) {
            const onlyNumbers = value.toString().replace(/[^0-9]/g, '');
            const numericValue = onlyNumbers === '' ? '' : Number(onlyNumbers);
            props.onChange(numericValue);
        } else {
            props.onChange(value);
        }
    };

    return (
        <PlaceholderWrap height={props.height} width={props.width} isActive={isActive} placeholder={props.placeholder}>
            <Input
                style={[styles.input, props.center ? { textAlign: 'center' } : {}]}
                width={props.width ?? SCREEN_WIDTH}
                height={props.height ?? 50}
                value={props.value.toString()}
                borderWidth="$1.5"
                borderRadius={20}
                onChangeText={onChangeText}
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
