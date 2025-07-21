import CustomInput from '@/app/components/input';
import ArrowBack from '@/app/svgs/arrowBack';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, XStack, YStack } from "tamagui";

const { height, width } = Dimensions.get('window');

const CreateNewHabits = () => {

    const [habitName, setHabitName] = useState('')
    const [typeOfHabit, setTypeOfHabit] = useState<'reusable' | 'onetime'>('reusable')

    return (
        <SafeAreaView>
            <YStack height={height} backgroundColor={'$dark'}>
                <XStack alignItems='center' marginTop={10}>
                    <ArrowBack size={36}/>
                    <Text
                        marginLeft={5}
                        color={"$white"}
                        fontSize={26}
                    >Добавить привычку</Text>
                </XStack>

                <YStack 
                    flex={1}
                    alignItems="center" // центр по горизонтали
                    marginTop={20}
                >
                    <CustomInput
                        value={habitName}
                        height={50}
                        width={width - 20}
                        placeholder='Название привычке'
                        onChange={(e) => {
                            setHabitName(e)
                        }}
                    />
                    <XStack margin={10}justifyContent='center'>
                        <Button
                            borderTopRightRadius={0}
                            borderBottomRightRadius={0}
                            backgroundColor={typeOfHabit === 'reusable' ? '$blue' : "$gray"}
                            onPress={() => setTypeOfHabit('reusable')}
                            width={width / 2 - 20}
                        >
                            <Text
                                color={'$white'}
                                fontSize={16}
                            >
                                Регулярная
                            </Text>
                        </Button>
                        <Button
                            borderTopLeftRadius={0}
                            borderBottomLeftRadius={0}
                            backgroundColor={typeOfHabit === 'onetime' ? '$blue' : "$gray"}
                            onPress={() => setTypeOfHabit('onetime')}
                            width={width / 2 - 20}
                        >
                            <Text
                              color={'$white'}
                              fontSize={16}  
                            >
                                Одноразовая
                            </Text>
                        </Button>
                    </XStack>

                </YStack>
            </YStack>
        </SafeAreaView>
    )
}

export default CreateNewHabits