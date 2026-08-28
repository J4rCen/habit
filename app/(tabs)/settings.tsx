import { router } from "expo-router"
import React from "react"
import { useTranslation } from "react-i18next"
import { StyleSheet, TouchableOpacity } from "react-native"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"
import ContainerWrap from "../components/container_wrap/ContainerWrap"
import { SCREEN_WIDTH, SCREEN_WIDTH_400 } from "../constants"
import useStore from "../store/zustand"
import { Language, LoadFile, SaveFile, Watch } from "../svgs/settings"
import { loadFile, saveFile } from "../utilities/jsonHandler"


const Settings = () => {

	const setDialog = useStore(state => state.setConfigDialog)
	const { t } = useTranslation()

	return (
		<ContainerWrap>
			<YStack alignItems="center">
				<ScrollView width={SCREEN_WIDTH - 20} showsVerticalScrollIndicator={false} >
					<YStack marginBottom={20}>
						<Text style={styles.title_block}>{t('settings.data')}</Text>
						<View gap={10}>
							<YStack>
								<TouchableOpacity style={styles.button} onPress={async () => {
									setDialog({ open: true })
									await saveFile(setDialog)
								}}>
									<XStack gap={10} justifyContent="center">
										<SaveFile size={26} />
										<Text style={styles.buttonLabel}>{t('settings.saveData')}</Text>
									</XStack>
								</TouchableOpacity>
							</YStack>
							<YStack>
								<TouchableOpacity style={styles.button} onPress={async () => {
									setDialog({ open: true })
									await loadFile(setDialog)
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
							<TouchableOpacity style={styles.button} onPress={(() => router.navigate('/screens/interval_day/' as any))}>
								<XStack gap={10} justifyContent="center">
									<Watch size={28} />
									<Text style={styles.buttonLabel}>{t('settings.dailyInterval')}</Text>
								</XStack>
							</TouchableOpacity>
						</YStack>
					</YStack>
				</ScrollView>
			</YStack>
		</ContainerWrap>
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