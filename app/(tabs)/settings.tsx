import { router } from "expo-router"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PortalProvider, ScrollView, Text, View, XStack, YStack } from "tamagui"
import AuthLoader from "../components/auth_loader/authLoader"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "../constants"
import { Language, LoadFile, SaveFile, Watch } from "../svgs/settings"
import { loadFile, saveFile } from "../utilities/jsonHandler"


const Settings = () => {

	const [openPopup, setOpenPopup] = useState<boolean>(false) 
	const [titlePopup, setTitlePopup] = useState<string>('')
	const [messagePopup, setMessagePopup] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const {t} = useTranslation()

	return (
		<View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
			<SafeAreaView>
				<PortalProvider>
					<YStack height={SCREEN_HEIGHT} backgroundColor='$dark'>
						<YStack alignItems="center" height={SCREEN_HEIGHT * 0.8}>
							{
								openPopup && <AuthLoader title={titlePopup} message={messagePopup} open={openPopup} setOpenPopup={setOpenPopup} isLoading={isLoading}/>
							}
							<ScrollView width={SCREEN_WIDTH - 20} showsVerticalScrollIndicator={false} >
								<YStack marginBottom={20}>
									<Text style={styles.title_block}>{t('settings.data')}</Text>
									<View gap={10}>
										<YStack>
											{/* <TouchableOpacity style={[styles.button, { backgroundColor: '#194A98' }]} onPress={() => router.navigate('/screens/buying_premium')}>
												<XStack gap={10} justifyContent="center">
													<Heart size={30} />
													<Text style={styles.buttonLabel}>Поддержать проект</Text>
												</XStack>
											</TouchableOpacity> */}
										</YStack>
										<YStack>
											<TouchableOpacity style={styles.button} onPress={ async () => {
												setOpenPopup(true)
												await saveFile({setOpenPopup, setTitlePopup, setMessagePopup, setIsLoading})
											}}>
												<XStack gap={10} justifyContent="center">
													<SaveFile size={26} />
													<Text style={styles.buttonLabel}>{t('settings.saveData')}</Text>
												</XStack>
											</TouchableOpacity>
										</YStack>
										<YStack>
											<TouchableOpacity style={styles.button} onPress={ async () => {
												setOpenPopup(true)
												await loadFile({setOpenPopup, setTitlePopup, setMessagePopup, setIsLoading})
											}}>
												<XStack gap={10} justifyContent="center">
													<LoadFile size={26} />
													<Text style={styles.buttonLabel}>{t('settings.restoreData')}</Text>
												</XStack>
											</TouchableOpacity>
										</YStack>
									</View>
								</YStack>

								<YStack marginBottom={20}>
									<Text style={styles.title_block}>{t('settings.settings')}</Text>
									<YStack gap={10}>
										<TouchableOpacity style={styles.button} onPress={(() => router.navigate('/screens/languagePage/' as any))}>
											<XStack gap={10} justifyContent="center">
												<Language size={24} />
												<Text style={styles.buttonLabel}>{t('settings.languageParameters')}</Text>
											</XStack>
										</TouchableOpacity>
										{/* <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Brush size={26} />
                                            <Text style={styles.buttonLabel}>Стиль</Text>
                                        </XStack>
                                    </TouchableOpacity> */}
										<TouchableOpacity style={styles.button} onPress={(() => router.navigate('/screens/interval_day/' as any))}>
											<XStack gap={10} justifyContent="center">
												<Watch size={28} />
												<Text style={styles.buttonLabel}>{t('settings.dailyInterval')}</Text>
											</XStack>
										</TouchableOpacity>
										{/* <TouchableOpacity style={styles.button}>
                                        <XStack gap={10} justifyContent="center">
                                            <Bell size={24} />
                                            <Text style={styles.buttonLabel}>Уведомления</Text>
                                        </XStack>
                                    </TouchableOpacity> */}
									</YStack>
								</YStack>

								{/* <YStack marginBottom={20}>
									<Text style={styles.title_block}>Медиа</Text>
									<YStack gap={10}>
										<TouchableOpacity style={styles.button}>
											<XStack gap={10} justifyContent="center">
												<Star size={24} />
												<Text style={styles.buttonLabel}>Оставить отзыв</Text>
											</XStack>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button} onPress={() => router.navigate('/screens/feedback')}>
											<XStack gap={10} justifyContent="center">
												<Message size={26} />
												<Text style={styles.buttonLabel}>Обратная связь</Text>
											</XStack>
										</TouchableOpacity>
									</YStack>
								</YStack> */}

								{/* <YStack marginBottom={20}>
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
                            </YStack> */}

							</ScrollView>
						</YStack>
					</YStack>
				</PortalProvider>
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

export default Settings