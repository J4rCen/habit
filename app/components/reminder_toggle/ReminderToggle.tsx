import { styled, Switch, Text, XStack } from "tamagui"

interface IReminderToggle  {
    value: boolean,
    onChange: (e: boolean) => void
}

const CustomSwitch = styled(Switch, {
    width: 65,
    backgroundColor: '$dark',

    variants: {
        checked: {
            true: {
                backgroundColor: '$blue',
            },
        },
    },
})

const ReminderToggle = ({value, onChange}: IReminderToggle) => {
    return (
        <XStack marginTop={30} alignItems='center' gap={10}>
            <Text
                color={'white'}
                fontSize={18}
            >
                Напоминание
            </Text>
            <CustomSwitch size={'$3'} checked={value} defaultChecked={value} onCheckedChange={onChange}>
                <Switch.Thumb size={'$3'} backgroundColor={'white'} animation="quicker"/>
            </CustomSwitch>        
        </XStack>
    )
}

export default ReminderToggle