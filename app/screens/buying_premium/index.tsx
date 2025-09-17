import ContainerWrap from "@/app/components/container_wrap/ContainerWrap"
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_400 } from "@/app/constants"
import { AdBlock, Heart, Infinity, OneTask } from "@/app/svgs/buyingPremiumSvg"
import { Brush, LoadFile, SaveFile } from "@/app/svgs/settings"
import { router } from "expo-router"
import React from "react"
import { TouchableOpacity } from "react-native"
import { ScrollView, Text, View, XStack, YStack } from "tamagui"

const TextFontSize = SCREEN_WIDTH_400 ? 18 : 24
const SvgSize = SCREEN_WIDTH_400 ? 24 : 30

const BuyingPremium = () => {
	return (
		<ContainerWrap >
			<ScrollView maxHeight={SCREEN_HEIGHT * 0.9} showsVerticalScrollIndicator={false} >
				<YStack maxHeight={SCREEN_HEIGHT} justifyContent="center" marginTop={20}>
					<YStack height={'75%'}>
						<YStack
							height={SCREEN_WIDTH_400 ? 60 : 80}
							gap={5}
							backgroundColor={'$blue'}
							borderTopLeftRadius={10}
							borderTopRightRadius={10}
							alignItems="center"
							justifyContent="center"
							padding={5}
						>
							<XStack gap={10} justifyContent="center">
								<Heart size={30}/>
								<Text
									fontSize={TextFontSize}
									color={'white'}
								>
									Поддержать проект
								</Text>
							</XStack>
						</YStack>

						<YStack
							backgroundColor={'$gray'}
							padding={20}
							gap={20}
						>
							<XStack gap={10} alignItems="center">
								<AdBlock size={SvgSize} color={'#fff'} />
								<Text
									color={'white'}
									fontSize={TextFontSize}
								>
									Убрать рекламу
								</Text>
							</XStack>
							<XStack gap={10} alignItems="center">
								<Infinity size={SvgSize} />
								<Text
									color={'white'}
									fontSize={TextFontSize}
								>
									Безлимит на привычке
								</Text>
							</XStack>
							<XStack gap={10} alignItems="center">
								<SaveFile size={SvgSize} />
								<Text
									color={'white'}
									fontSize={TextFontSize}
								>
									Резервное копирование
								</Text>
							</XStack>
							<XStack gap={10} alignItems="center">
								<LoadFile size={SvgSize} />
								<Text
									color={'white'}
									fontSize={TextFontSize}
								>
									Восстановление данных
								</Text>
							</XStack>
							<XStack gap={10} alignItems="center">
								<OneTask size={SvgSize} />
								<Text
									color={'white'}
									fontSize={TextFontSize}
								>
									Одноразовые задачи
								</Text>
								<Text color={'white'} fontSize={12}>
									{'(скоро)'}
								</Text>
							</XStack>
							<XStack gap={10} alignItems="center">
								<Brush size={SCREEN_WIDTH_400 ? 22 : 28} />
								<Text
									color={'white'}
									fontSize={TextFontSize}
								>
									Смена темы
								</Text>
								<Text color={'white'} fontSize={12}>
									{'(скоро)'}
								</Text>
							</XStack>
							{/* <XStack gap={10} alignItems="center">
								<Smartphone size={SCREEN_WIDTH_400 ? 22 : 28} />
								<Text
									color={'white'}
									fontSize={TextFontSize}
								>
									Виджеты
								</Text>
								<Text color={'white'} fontSize={12}>
									{'(скоро)'}
								</Text>
							</XStack> */}
						</YStack>

						<TouchableOpacity
							style={{
								height: SCREEN_WIDTH_400 ? 60 : 80,
								gap: 5,
								backgroundColor: '#194A98',
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
								alignItems: "center",
								justifyContent: 'center',
								padding: 5
							}}
						>
							<XStack gap={10} alignItems="center">
								<Text
									fontSize={TextFontSize}
									color={'white'}
								>
									Купить за
								</Text>
								<Text
									fontSize={SCREEN_WIDTH_400 ? 22 : 28}
									color={'white'}
									fontWeight={'bold'}
								>
									399 ₽
								</Text>
							</XStack>
						</TouchableOpacity>
					</YStack>

					<View height={'10%'} width={SCREEN_WIDTH - 20}>
						<TouchableOpacity
							style={{
								height: SCREEN_WIDTH_400 ? 40 : 50,
								backgroundColor: '#393E46',
								borderRadius: 10,
								justifyContent: 'center'
							}}
							onPress={() => router.back()}
						>
							<Text
								textAlign="center"
								color={'white'}
								fontSize={20}
							>
								Отмена
							</Text>
						</TouchableOpacity>
					</View>
				</YStack>
			</ScrollView>
		</ContainerWrap>
	)
}

export default React.memo(BuyingPremium)