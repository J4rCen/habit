import CustomInput from '@/app/components/custom_input'
import { SCREEN_WIDTH } from '@/app/constants'
import React, { useEffect, useRef, useState } from 'react'
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'
import { Button, Dialog, Text, Text as TText, XStack, YStack } from 'tamagui'

interface ICustomTimePicker {
	width: number
	height: number
	value: string
	onChange: (date: string) => void
	placeholder: string
}

const ITEM_HEIGHT = 40
const VISIBLE_ITEMS = 3
const PADDING_ITEMS = Math.floor(VISIBLE_ITEMS / 2)

const generateArray = (length: number) => Array.from({ length }, (_, i) => i.toString().padStart(2, '0'))

const PickerColumn = React.memo(({
	data,
	selectedValue,
	onValueChange,
}: {
	data: string[]
	selectedValue: string
	onValueChange: (value: string) => void
}) => {
	const flatListRef = useRef<FlatList<string>>(null)

	useEffect(() => {
		const index = data.indexOf(selectedValue)
		if (index >= 0) {
		flatListRef.current?.scrollToIndex({ index, animated: false })
		}
	}, [selectedValue])

	const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetY = e.nativeEvent.contentOffset.y
		const index = Math.round(offsetY / ITEM_HEIGHT)
		flatListRef.current?.scrollToIndex({ index, animated: true })
		onValueChange(data[index])
	}

	const renderItem = ({ item, index }: { item: string; index: number }) => (
		<TouchableOpacity onPress={() => flatListRef.current?.scrollToIndex({ index, animated: true })}>
			<View style={styles.item}>
				<Text style={styles.itemText}>{item}</Text>
			</View>
		</TouchableOpacity>
	)

	return (
		<View style={styles.column}>
			<FlatList
				ref={flatListRef}
				data={data}
				keyExtractor={(item) => item}
				showsVerticalScrollIndicator={false}
				snapToInterval={ITEM_HEIGHT}
				decelerationRate="fast"
				onMomentumScrollEnd={onScrollEnd}
				contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * PADDING_ITEMS }}
				getItemLayout={(_, index) => ({
					length: ITEM_HEIGHT,
					offset: ITEM_HEIGHT * index,
					index,
				})}
				renderItem={renderItem}
			/>
			<View style={styles.overlay} pointerEvents="none" />
		</View>
	)
})

const CustomTimePicker = ({ width, height, value, placeholder, onChange }: ICustomTimePicker) => {
	const [hours, setHours] = useState('00')
	const [minutes, setMinutes] = useState('00')

	const parseInitialValue = (val: string) => {
		const [h = '00', m = '00'] = val.split(':')
		setHours(h.padStart(2, '0'))
		setMinutes(m.padStart(2, '0'))
	}

	const timeUnits = [
		{ label: 'Часы', value: hours, setValue: setHours, range: 24 },
		{ label: 'Минуты', value: minutes, setValue: setMinutes, range: 60 },
	]

	return (
		<Dialog onOpenChange={(open) => open && parseInitialValue(value)}>
			<Dialog.Trigger asChild>
				<Pressable style={{ width, height }}>
					<CustomInput
						value={value}
						height={height}
						width={width}
						alwaysOpen
						placeholder={placeholder}
						center
						onChange={(e) => {
							if (typeof e === 'string') onChange(e)
						}}
						onReadonly
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
					backgroundColor="$dark"
					borderColor="$blue"
					borderWidth="$1.5"
				>
					<YStack>
						<XStack justifyContent="center" gap="$4">
							{timeUnits.map(({ label, value, setValue, range }) => (
								<YStack key={label}>
									<TText color="white" textAlign="center" fontWeight="bold">
										{label}
									</TText>
									<PickerColumn
										data={generateArray(range)}
										selectedValue={value}
										onValueChange={setValue}
									/>
								</YStack>
							))}
						</XStack>

						<XStack justifyContent="center" gap={10}>
							<Dialog.Close asChild>
								<Button backgroundColor="$gray">
								<Text color="white" fontSize={16}>
									Отмена
								</Text>
								</Button>
							</Dialog.Close>
							<Dialog.Close asChild>
								<Button
								backgroundColor="$blue"
								onPress={() => {
									const newTime = `${hours}:${minutes}`
									onChange?.(newTime)
								}}
								>
								<Text color="white" fontSize={16}>
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

const styles = StyleSheet.create({
	column: {
		height: ITEM_HEIGHT * VISIBLE_ITEMS,
		overflow: 'hidden',
		position: 'relative' as const,
		width: 80,
	},
	item: {
		height: ITEM_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemText: {
		fontSize: 18,
		color: 'white',
	},
	overlay: {
		position: 'absolute' as const,
		top: ITEM_HEIGHT * PADDING_ITEMS,
		height: ITEM_HEIGHT,
		left: 0,
		right: 0,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#007AFF',
		backgroundColor: 'rgba(0,122,255,0.05)',
	},
})

export default React.memo(CustomTimePicker)