import CustomInput from '@/app/components/custom_input'
import { SCREEN_WIDTH } from '@/app/constants'
import React, { useRef } from "react"
import { FlatList, Pressable } from 'react-native'
import { Button, Dialog, styled, Text, XStack, YStack } from "tamagui"


interface ICustomTimePicker {
    width: number
    height: number
    value: string
    onChange: (date: string) => void 
}

const ScrollColumn = styled(FlatList, {
  flexGrow: 0,
  height: 180,
  width: 60,
  showsVerticalScrollIndicator: false,
})

const numbers = (max: number) =>
  Array.from({ length: max + 1 }, (_, i) => i.toString().padStart(2, '0'))

const timeParts = {
  hours: numbers(23),
  minutes: numbers(59),
  seconds: numbers(59),
}

const CustomTimePicker = (props: ICustomTimePicker) => {

	const scrollColumnRef = useRef(null)

	const formatTime = (h: number, m: number, s: number) => {
		`${h.toString().padStart(2, '0')}:
		${m.toString().padStart(2, '0')}:
		${s.toString().padStart(2, '0')}`
	}

	// const ClockFace = (data: string[]) => {
	// 	return (
	// 		<ScrollColumn
	// 			ref={scrollColumnRef}
	// 			data={data}
	// 		/>
	// 	)
	// }

    // const TimerPicker = () => {
	// 	return (
	// 		<XStack>
	// 			{
	// 				ClockFace(timeParts.hours)
	// 			}
	// 			{
	// 				ClockFace(timeParts.minutes)
	// 			}
	// 			{
	// 				ClockFace(timeParts.seconds)
	// 			}
	// 		</XStack>
	// 	)
	// }

    return (
        <Dialog>
            <Dialog.Trigger asChild>
				<Pressable style={{width: props.width, height: props.height}}>
					<CustomInput
						value={props.value}
						height={props.height} 
						width={props.width} 
						placeholder="Время"
						center={true}
						onChange={(e) => {
							if (typeof e === 'string') props.onChange
						}}
						onReadonly={true}
					/>
				</Pressable>
            </Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay
					key="overlay"
					backgroundColor="$shadow6"
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>
				<Dialog.Content
					width={SCREEN_WIDTH - 20}
					backgroundColor={'$dark'}
					borderColor={'$blue'}
					borderWidth={'$1.5'}
				>
					<YStack>
						{/* <TimerPicker/> */}
						<XStack justifyContent='center' gap={10}>
							<Dialog.Close asChild>
								<Button backgroundColor={'$gray'}>
									<Text color={'white'} fontSize={16}>
										Отмена
									</Text>
								</Button>
							</Dialog.Close>
							<Dialog.Close asChild>
								<Button backgroundColor={'$blue'}>
									<Text color={'white'} fontSize={16}>
										Подтвердить
									</Text>
								</Button>
							</Dialog.Close>
						</XStack>
					</YStack>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
    )
}

export default React.memo(CustomTimePicker)