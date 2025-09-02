import { SCREEN_WIDTH } from "@/app/constants"
import React from "react"
import { TouchableOpacity } from "react-native"
import { AlertDialog, Text, YStack } from "tamagui"
import { LoadingScreen } from "../loader_popup/loaderPopup"

const AuthLoader = (props: {
	title: string,
	message: string
	open: boolean
	isLoading: boolean
	setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	return (
		<AlertDialog open={props.open}>
			<AlertDialog.Overlay
				key="overlay"
				opacity={0}
				enterStyle={{ opacity: 0 }}
				exitStyle={{ opacity: 0 }}
			/>
			<AlertDialog.Content
				width={SCREEN_WIDTH - 20}
				backgroundColor="$dark"
				borderColor="$blue"
				borderWidth="$1.5"
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: [{ translateX: -((SCREEN_WIDTH - 20) / 2) }, { translateY: -100 }],
				}}
			>
				{
					props.isLoading ?
						<LoadingScreen /> :
						<YStack gap={'$4'}>
							<AlertDialog.Title fontSize={22} color={'white'}>
								{
									props.title
								}
							</AlertDialog.Title>

							<AlertDialog.Description fontSize={18} color={'white'}>
								{
									props.message
								}
							</AlertDialog.Description>

							<YStack
								alignItems="center"
								justifyContent="center"
							>
								<AlertDialog.Cancel asChild onPress={() => props.setOpenPopup(false)}>
									<TouchableOpacity
										style={{
											height: 40,
											width: '70%',
											backgroundColor: '#194A98',
											borderRadius: 10,
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<Text color={'white'} fontSize={16}>
											Закрыть
										</Text>
									</TouchableOpacity>
								</AlertDialog.Cancel>
							</YStack>
						</YStack>
				}
			</AlertDialog.Content>
		</AlertDialog>
	)
}

export default React.memo(AuthLoader)