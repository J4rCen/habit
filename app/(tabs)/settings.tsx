import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "../constants"
import { Crown, LoadInCloud, Logout, SaveInCloud, UserAccount } from "../svgs/settings"

const Settings = () => {
    return (
        <View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
            <SafeAreaView>
                <YStack height={SCREEN_HEIGHT} backgroundColor='$dark'>
                    <YStack alignItems="center" height={SCREEN_HEIGHT * 0.8}>
                        <ScrollView width={SCREEN_WIDTH - 20} showsVerticalScrollIndicator={false} >
                            <YStack marginBottom={20}>
                                <Text style={styles.title_block}>Аккаунт</Text>
                                {
                                    true ?
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
                                                <TouchableOpacity style={styles.button}>
                                                    <XStack gap={10} justifyContent="center">
                                                        <SaveInCloud size={26}/>
                                                        <Text style={styles.buttonLabel}>Резервное копирование</Text>
                                                    </XStack>
                                                </TouchableOpacity>
                                            </YStack>
                                            <YStack>
                                                <TouchableOpacity style={styles.button}>
                                                    <XStack gap={10} justifyContent="center">
                                                        <LoadInCloud size={26}/>
                                                        <Text style={styles.buttonLabel}>Восстановление данных</Text>
                                                    </XStack>
                                                </TouchableOpacity>
                                            </YStack>
                                            <YStack>
                                                <TouchableOpacity style={[styles.button, { backgroundColor: '#791113' }]}>
                                                    <XStack gap={10} justifyContent="center">
                                                        <Logout size={26}/>
                                                        <Text style={styles.buttonLabel}>Выйти из аккаунта</Text>
                                                    </XStack>
                                                </TouchableOpacity>
                                            </YStack>
                                        </View> :
                                        <YStack>
                                            <TouchableOpacity style={[styles.button, { backgroundColor: '#194A98' }]}>
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
                                        <Text style={styles.buttonLabel}>Языковые параметры</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Стиль</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Интервал времени</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Уведомления</Text>
                                    </TouchableOpacity>
                                </YStack>
                            </YStack>

                            <YStack marginBottom={20}>
                                <Text style={styles.title_block}>Медиа</Text>
                                <YStack gap={10}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Оставить отзыв</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Обратная связь</Text>
                                    </TouchableOpacity>
                                </YStack>
                            </YStack>

                            <YStack marginBottom={20}>
                                <Text style={styles.title_block}>Документация</Text>
                                <YStack gap={10}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Политика конфиденциальности</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonLabel}>Условия использования</Text>
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