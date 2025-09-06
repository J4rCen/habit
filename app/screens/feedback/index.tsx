import { apiSendMessage } from "@/app/api/api"
import AuthLoader from "@/app/components/auth_loader/authLoader"
import CustomInput from "@/app/components/custom_input/CustomInput"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants"
import useStore from "@/app/store/zustand"
import ArrowBack from "@/app/svgs/arrowBack"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, ScrollView, Text, TextArea, View, XStack, YStack } from "tamagui"

const Feedback = () => {

	const emailUser = useStore(state => state.email)
	const [email, setEmail] = useState<string>(emailUser ? emailUser : '')
	const [message, setMessage] = useState<string>('')
	const [alertShow, setAlertShow] = useState<boolean>(false)
	const [alertMessage, setAlertMessage] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [popupMessage, setPopupMessage] = useState<string>('')
	const [openPopup, setOpenPopup] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {

		if (!alertShow) return

		const interval = setInterval(() => {
			setAlertShow(false)
		}, 3000)

		return () => clearInterval(interval)
	}, [alertShow])

	const sendMessage = async () => {
		try {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				setAlertMessage("Почта указанна не верно")
				setAlertShow(true)
				return

			}

			if (message.length === 0) {
				setAlertMessage("Сообщение не должно быть пустым")
				setAlertShow(true)
				return

			}

			setOpenPopup(true)
			setIsLoading(true)

			const res = await apiSendMessage({ email, message })

			if (res?.status as number == 0) {
				setTitle('Ошибка')
				setPopupMessage('Превышено время ожидания, попробуйте позже ещё раз, если ошибка повториться обратитесь в службу поддержки')
				setIsLoading(false)

				return
			}

			if (res?.data.status as number === 200) {
				setTitle('Успешно')
				setPopupMessage(res?.data.message)
				setIsLoading(false)
				setMessage('')

				return
			}

			if (res?.data.status as number >= 400) {
				setTitle('Ошибка')
				setPopupMessage(res?.data.message)
				setIsLoading(false)

				return
			}


		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View backgroundColor={'$dark'} maxHeight={SCREEN_HEIGHT}>
			<SafeAreaView>
				{
					openPopup && <AuthLoader open={openPopup} setOpenPopup={setOpenPopup} customLoaderTitle="Отправка..." title={title} message={popupMessage} isLoading={isLoading} />
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
						Обратная связь
					</Text>
				</XStack>
				<YStack height={SCREEN_HEIGHT} backgroundColor='$dark' alignItems="center">
					<ScrollView maxHeight={SCREEN_HEIGHT} style={{ backgroundColor: '#222831' }} showsVerticalScrollIndicator={false}>
						<YStack width={SCREEN_WIDTH - 20} alignItems="center" paddingTop={10} gap={10}>
							<CustomInput
								value={email}
								onChange={e => {if (typeof e === 'string') setEmail(e)}}
								placeholder="Укажите вашу почту"
								height={50}
								width={SCREEN_WIDTH - 20}
							/>
							<TextArea
								placeholder="Напишите ваше сообщение"
								value={message}
								onChangeText={e => {
									setMessage(e)
								}}
								width={SCREEN_WIDTH - 20}
								borderColor='$blue'
								borderWidth={5}
								backgroundColor='$dark'
								borderRadius={20}
								fontSize={18}
								minHeight={SCREEN_HEIGHT / 4}
								color={'white'}
								style={{
									flexGrow: 1,
									textAlignVertical: 'top',
								}}
								focusStyle={{
									outline: 'none',
									borderColor: '$blue'
								}}
							/>
						</YStack>

						<YStack gap={10} marginTop={30}>
							{
								alertShow &&
								<XStack height={50} width={SCREEN_WIDTH - 20}>
									<Text fontSize={SCREEN_WIDTH_400 ? 14 : 16} color={'red'}>{`${alertMessage}`}</Text>
								</XStack>
							}
							<Button
								fontSize={16}
								color={'white'}
								width={SCREEN_WIDTH - 20}
								size={'$5'}
								backgroundColor={'$blue'}
								onPress={() => sendMessage()}
							>
								Отправить
							</Button>
							<Button
								fontSize={16}
								color={'white'}
								width={SCREEN_WIDTH - 20}
								size={'$5'}
								backgroundColor={'$gray'}
								onPress={() => router.back()}
							>
								Отмена
							</Button>
						</YStack>
					</ScrollView>
				</YStack>
			</SafeAreaView>
		</View>
	)
}

export default React.memo(Feedback)