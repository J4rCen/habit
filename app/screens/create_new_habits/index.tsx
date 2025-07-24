import CustomInput from '@/app/components/custom_input';
import CustomSelect from '@/app/components/custom_select';
import ArrowBack from '@/app/svgs/arrowBack';
import { PortalProvider } from '@tamagui/portal';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, XStack, YStack } from "tamagui";
import { optionIntervalExecution, optionTimesOfDay, optionTypeOfTask } from './setDefaultData';

const { height, width } = Dimensions.get('window');

export type IntervalExecution = 'every_day' | 'certain_days' | 'gap'

const CreateNewHabits = () => {

    const [habitName, setHabitName] = useState('')
    const [typeOfHabit, setTypeOfHabit] = useState<'reusable' | 'onetime'>('reusable')
    const [intervalExecution, setIntervalExecution] = useState<string>("every_day")
    const [timesOfDay, setTimesOfDay] = useState<string>("every_day")
    const [typeOfTask, setTypeOfTask] = useState<string>("every_day")
    const [oneActive, setOneActive] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    return (
        <SafeAreaView>
            <PortalProvider>
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
                        alignItems="center"
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

                        <YStack marginTop={10} gap={15}>
                            {typeOfHabit === 'reusable' &&
                                <CustomSelect
                                    id={1}
                                    placeholder='Интервал выполнения' 
                                    height={50} 
                                    width={width - 20}
                                    options={optionIntervalExecution}
                                    value={intervalExecution}
                                    onChange={(e) => setIntervalExecution(e)}
                                    isOpen={oneActive === 1 ? isOpen : false}
                                    setIsOpen={(e) => setIsOpen(e)}
                                    setOneActive={(e) => setOneActive(e)}
                                />
                            }
                            <CustomSelect
                                id={2}
                                placeholder='Время суток' 
                                height={50} 
                                width={width - 20}
                                options={optionTimesOfDay}
                                value={timesOfDay}
                                onChange={(e) => setTimesOfDay(e)}
                                isOpen={oneActive === 2 ? isOpen : false}
                                setIsOpen={(e) => setIsOpen(e)}
                                setOneActive={(e) => setOneActive(e)}
                            />
                            <CustomSelect
                                id={3}
                                placeholder='Тип задачи' 
                                height={50} 
                                width={width - 20}
                                options={optionTypeOfTask}
                                value={typeOfTask}
                                onChange={(e) => setTypeOfTask(e)}
                                isOpen={oneActive === 3 ? isOpen : false}
                                setIsOpen={(e) => setIsOpen(e)}
                                setOneActive={(e) => setOneActive(e)}
                            />
                        </YStack>
                    </YStack>
                </YStack>
            </PortalProvider>
        </SafeAreaView>
    )
}

export default CreateNewHabits