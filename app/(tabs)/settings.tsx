import { router } from "expo-router"
import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"
import { apiLoadInCloud, apiSaveInCloud } from "../api/api"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "../constants"
import useStore from "../store/zustand"
import { Bell, Brush, Crown, FileSvg, Language, LoadInCloud, Logout, Message, SaveInCloud, Star, UserAccount, Watch } from "../svgs/settings"
import { deleteToken, getToken } from "../utilities/secureStore"


const Settings = () => {

    const isLogin = useStore(state => state.email)
    const premium = useStore(state => state.premium)
    const setApiData = useStore(state => state.setApiData)

    const logout = async () => {
        setApiData({
            email: null,
            premium: false
        })
        await deleteToken()
    }

    const saveInCloud = async () => {
        const token = await getToken().then(token => {return token})
        const email = useStore.getState().email

        if (premium && token && email) {
            const habitTasks = useStore.getState().habitTask
            const startDateUser = useStore.getState().startDateUser

            const data = {
                email: email,
                dateOfStart: startDateUser,
                userHabits: habitTasks
            }

            await apiSaveInCloud(data)
        } else {

        }
    }

    const loadInCloud = async () => {
        const token = await getToken().then(token => {return token})
        const email = useStore.getState().email

        if (premium && token) {
            const data = await apiLoadInCloud(email)
            
            if (!!data.dateOfStart && !!data.userHabits) {
                useStore.getState().initializeStartDateUser(data.dateOfStart)
                useStore.getState().initializeHabits(data.userHabits)
            }

        } else {
            
        }
    }

    return (
        <View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
            <SafeAreaView>
                <YStack height={SCREEN_HEIGHT} backgroundColor='$dark'>
                    <YStack alignItems="center" height={SCREEN_HEIGHT * 0.8}>
                        <ScrollView width={SCREEN_WIDTH - 20} showsVerticalScrollIndicator={false} >
                            <YStack marginBottom={20}>
                                <Text style={styles.title_block}>Аккаунт</Text>
                                {
                                    isLogin !== null ?
                                        <View gap={10}>
                                            <YStack>
                                                <TouchableOpacity style={[styles.button, { backgroundColor: '#194A98' }]}>
                                                    <XStack gap={10} justifyContent="center">
                                                        <Crown size={26} />
                                                        <Text style={styles.buttonLabel}>Оформить подписку</Text>
                                                    </XStack>
                                                </TouchableOpacity>
                                            </YStack>
                                            <YStack>
                                                <TouchableOpacity style={styles.button} onPress={() => saveInCloud()}>
                                                    <XStack gap={10} justifyContent="center">
                                                        <SaveInCloud size={26} />
                                                        <Text style={styles.buttonLabel}>Резервное копирование</Text>
                                                    </XStack>
                                                </TouchableOpacity>
                                            </YStack>
                                            <YStack>
                                                <TouchableOpacity style={styles.button} onPress={() => loadInCloud()}>
                                                    <XStack gap={10} justifyContent="center">
                                                        <LoadInCloud size={26} />
                                                        <Text style={styles.buttonLabel}>Восстановление данных</Text>
                                                    </XStack>
                                                </TouchableOpacity>
                                            </YStack>
                                            <YStack>
                                                <TouchableOpacity style={[styles.button, { backgroundColor: '#791113' }]} onPress={() => logout()}>
                                                    <XStack gap={10} justifyContent="center">
                                                        <Logout size={26} />
                                                        <Text style={styles.buttonLabel}>Выйти из аккаунта</Text>
                                                    </XStack>
                                                </TouchableOpacity>
                                            </YStack>
                                        </View> :
                                        <YStack>
                                            <TouchableOpacity style={[styles.button, { backgroundColor: '#194A98' }]} onPress={(() => router.navigate('/screens/auth/' as any))}>
                                                <XStack gap={10} justifyContent="center">
                                                    <UserAccount size={26} />
                                                    <Text style={styles.buttonLabel}>Войти / создать аккаунт</Text>
                                                </XStack>
                                            </TouchableOpacity>
                                        </YStack>
                                }
                            </YStack>

                            <YStack marginBottom={20}>
                                <Text style={styles.title_block}>Настройки</Text>
                                <YStack gap={10}>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Language size={24} />
                                            <Text style={styles.buttonLabel}>Языковые параметры</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Brush size={26} />
                                            <Text style={styles.buttonLabel}>Стиль</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Watch size={28} />
                                            <Text style={styles.buttonLabel}>Интервал времени</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Bell size={24} />
                                            <Text style={styles.buttonLabel}>Уведомления</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                </YStack>
                            </YStack>

                            <YStack marginBottom={20}>
                                <Text style={styles.title_block}>Медиа</Text>
                                <YStack gap={10}>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Star size={24} />
                                            <Text style={styles.buttonLabel}>Оставить отзыв</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Message size={26} />
                                            <Text style={styles.buttonLabel}>Обратная связь</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                </YStack>
                            </YStack>

                            <YStack marginBottom={20}>
                                <Text style={styles.title_block}>Документация</Text>
                                <YStack gap={10}>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <FileSvg size={26} />
                                            <Text style={styles.buttonLabel}>Политика конфиденциальности</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <FileSvg size={26} />
                                            <Text style={styles.buttonLabel}>Условия использования</Text>
                                        </XStack>
                                    </TouchableOpacity>
                                </YStack>
                            </YStack>

                        </ScrollView>
                    </YStack>
                </YStack>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    title_block: {
        color: '#fff',
        fontSize: SCREEN_WIDTH_400 ? 20 : 24,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#393E46',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: SCREEN_WIDTH_400 ? 18 : 20
    }
})

export default React.memo(Settings)