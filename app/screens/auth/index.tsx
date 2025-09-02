import { apiAuthorization, apiRegistration } from "@/app/api/api"
import AuthLoader from "@/app/components/auth_loader/authLoader"
import CustomInput from "@/app/components/custom_input/CustomInput"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants"
import useStore from "@/app/store/zustand"
import ArrowBack from "@/app/svgs/arrowBack"
import { GoogleSvg, YandexSvg } from "@/app/svgs/authorization"
import { setToken } from "@/app/utilities/secureStore"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, XStack, YStack } from "tamagui"

const Auth = () => {

    const setApiData = useStore(state => state.setApiData)
    const [typeEntrance, setTypeEntrance] = useState<'authorization' | 'registration'>('authorization')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [alertShow, setAlertShow] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {

        if (!alertShow) return

        const interval = setInterval(() => {
            setAlertShow(false)
        }, 3000)

        return () => clearInterval(interval)
    }, [alertShow])

    const registration = async () => {
        if (email.length === 0) {
            setAlertMessage("Почта не должна быть пустой")
            setAlertShow(true)
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setAlertMessage("Почта указанна не верно")
            setAlertShow(true)
            return
        }

        if (password.length === 0) {
            setAlertMessage("Пароль не должен быть пустой")
            setAlertShow(true)
            return
        }

        if (password.length < 6) {
            setAlertMessage("Пароль должен быть больше шести символам")
            setAlertShow(true)
            return
        }

        if (password !== repeatPassword) {
            setAlertMessage("Пароли не совпадают")
            setAlertShow(true)
            return
        }

        try {
            setOpenPopup(true)
            setIsLoading(true)
            const res = await apiRegistration({ email, password })

            if (res?.status as number >= 400) {
                setTitle('Ошибка')
                setMessage(res?.data.message)
                setIsLoading(false)

                return
            }

            if (res?.status as number == 0) {
                setTitle('Ошибка')
                setMessage('Превышено время ожидания, попробуйте позже ещё раз, если ошибка повториться обратитесь в службу поддержки')
                setIsLoading(false)

                return
            }

            if (res?.data) {
                const { access_token, payload } = res?.data

                setApiData(payload)
                await setToken(access_token)

                setOpenPopup(false)

                router.navigate('/(tabs)/settings')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const authorization = async () => {
        if (email.length === 0) {
            setAlertMessage("Почта не должна быть пустой")
            setAlertShow(true)
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setAlertMessage("Почта указанна не верно")
            setAlertShow(true)
            return
        }

        if (password.length === 0) {
            setAlertMessage("Пароль не должен быть пустой")
            setAlertShow(true)
            return
        }

        try {
            setOpenPopup(true)
            setIsLoading(true)
            const res = await apiAuthorization({ email, password })

            if (res?.status as number >= 400) {
                setTitle('Ошибка')
                setMessage(res?.data.message)
                setIsLoading(false)

                return
            }

            if (res?.status as number == 0) {
                setTitle('Ошибка')
                setMessage('Превышено время ожидания, попробуйте позже ещё раз, если ошибка повториться обратитесь в службу поддержки')
                setIsLoading(false)

                return
            }

            if (res?.data) {
                const { access_token, payload } = res.data

                setApiData(payload)
                await setToken(access_token)

                setOpenPopup(false)

                router.navigate('/(tabs)/settings')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
            <SafeAreaView>
                {
                    openPopup && <AuthLoader open={openPopup} setOpenPopup={setOpenPopup} title={title} message={message} isLoading={isLoading} />
                }
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

                    {
                        alertShow &&
                        <XStack height={50} width={SCREEN_WIDTH - 20}>
                            <Text fontSize={SCREEN_WIDTH_400 ? 14 : 16} color={'red'}>{`${alertMessage}`}</Text>
                        </XStack>
                    }

                    <YStack alignItems="center" gap={15} marginBottom={20}>
                        {
                            typeEntrance === 'authorization' ?
                                <>
                                    <TouchableOpacity style={styles.button} onPress={() => authorization()}>
                                        <Text style={styles.buttonLabel}>Войти</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => setTypeEntrance('registration')}>
                                        <Text style={styles.buttonLabel}>Регистрация</Text>
                                    </TouchableOpacity>
                                </> :
                                <>
                                    <TouchableOpacity style={styles.button} onPress={() => registration()}>
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
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#194A98' }]}>
                            <XStack gap={10} justifyContent="center">
                                <GoogleSvg size={26} />
                                <Text style={styles.buttonLabel}>Войти с помощью Google</Text>
                            </XStack>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#791113' }]}>
                            <XStack gap={10} justifyContent="center">
                                <YandexSvg size={26} />
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

export default React.memo(Auth)