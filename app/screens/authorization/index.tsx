import CustomInput from "@/app/components/custom_input/CustomInput"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants"
import ArrowBack from "@/app/svgs/arrowBack"
import { GoogleSvg, YandexSvg } from "@/app/svgs/authorization"
import { router } from "expo-router"
import React, { useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, XStack, YStack } from "tamagui"

const Authorization = () => {

    const [typeEntrance, setTypeEntrance] = useState<'authorization' | 'registration'>('authorization')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')


    return (
        <View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
            <SafeAreaView>
                <XStack alignItems='center' marginTop={10} marginBottom={20}>
                    <View onPress={() => router.back()}>
                        <ArrowBack size={36} />
                    </View>
                    <Text
                        marginLeft={5}
                        color={"$white"}
                        fontSize={26}
                    >
                        {
                            typeEntrance === 'authorization' ?
                                'Вход в аккаунт' :
                                'Регистрация'
                        }
                    </Text>
                </XStack>
                <YStack height={SCREEN_HEIGHT} backgroundColor='$dark' alignItems="center">


                    <YStack alignItems="center" gap={15} marginBottom={30}>
                        <CustomInput
                            value={email}
                            onChange={(e) => setEmail(e.toString())}
                            placeholder="Почта"
                            height={60}
                            width={SCREEN_WIDTH - 20}
                        />
                        <CustomInput
                            value={password}
                            onChange={(e) => setPassword(e.toString())}
                            placeholder="Пароль"
                            height={60}
                            width={SCREEN_WIDTH - 20}
                        />
                        {
                            typeEntrance === 'registration' ?
                                <CustomInput
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.toString())}
                                    placeholder="Повтор пароля"
                                    height={60}
                                    width={SCREEN_WIDTH - 20}
                                />
                                : null
                        }
                    </YStack>

                    <YStack alignItems="center" gap={15} marginBottom={20}>
                        {
                            typeEntrance === 'authorization' ?
                                <>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Войти</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => setTypeEntrance('registration')}>
                                        <Text style={styles.buttonLabel}>Регистрация</Text>
                                    </TouchableOpacity>
                                </> :
                                <>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Зарегистрироваться</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => setTypeEntrance('authorization')}>
                                        <Text style={styles.buttonLabel}>Отмена</Text>
                                    </TouchableOpacity>
                                </>
                        }
                    </YStack>

                    <XStack width={SCREEN_WIDTH - 20} justifyContent="center" alignItems="center" marginBottom={20}>
                        <View
                            backgroundColor={'white'}
                            height={2}
                            width={SCREEN_WIDTH / 2.5}
                        />
                        <Text
                            color={'white'}
                            fontSize={20}
                            marginBottom={5}
                            marginLeft={10}
                            marginRight={10}
                        >
                            или
                        </Text>
                        <View
                            backgroundColor={'white'}
                            height={2}
                            width={SCREEN_WIDTH / 2.5}
                        />
                    </XStack>

                    <YStack gap={15} >
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#194A98'}]}>
                            <XStack gap={10} justifyContent="center">
                                <GoogleSvg size={26}/>
                                <Text style={styles.buttonLabel}>Войти с помощью Google</Text>
                            </XStack>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#791113'}]}>
                            <XStack gap={10} justifyContent="center">
                                <YandexSvg size={26}/>
                                <Text style={styles.buttonLabel}>Войти с помощью Яндекс</Text>
                             </XStack>
                        </TouchableOpacity>
                    </YStack>

                </YStack>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#393E46',
        height: 50,
        width: SCREEN_WIDTH - 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: SCREEN_WIDTH_400 ? 18 : 20
    }
})

export default React.memo(Authorization)