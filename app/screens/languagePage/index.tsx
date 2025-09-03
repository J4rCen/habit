import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants"
import ArrowBack from "@/app/svgs/arrowBack"
import { RusFlag } from "@/app/svgs/flags"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"

const Language = () => {
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
                        Языковые параметры
                    </Text>
                </XStack>
                <YStack height={SCREEN_HEIGHT} backgroundColor='$dark' alignItems="center">
                    <ScrollView maxHeight={SCREEN_HEIGHT} style={{ backgroundColor: '#222831' }} showsVerticalScrollIndicator={false}>
                        <YStack width={SCREEN_WIDTH - 20}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#194A98' }]}>
                                <XStack gap={10} justifyContent="center">
                                    <RusFlag  size={26} />
                                    <Text style={styles.buttonLabel}>Русский</Text>
                                </XStack>
                            </TouchableOpacity>
                        </YStack>
                    </ScrollView>
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

export default React.memo(Language)