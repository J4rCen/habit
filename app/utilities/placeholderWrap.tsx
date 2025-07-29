import { Text, YStack } from "tamagui";

interface IPlaceholderWrap  {
    width?: number
    height: number
    isActive: boolean
    placeholder: string
    children: React.ReactNode
    isOpen?: boolean
}

const PlaceholderWrap = ({ width, height, isActive, placeholder, children, isOpen }: IPlaceholderWrap) => {
    return (
        <YStack position="relative" height={height} width={width}>
            <YStack
                zIndex={isOpen ? 20 : 10}
                position="absolute"
                left={20}
                pointerEvents="none"
                top={isActive ? -12 : '42%'}
                transform={isActive ? [] : [{ translateY: -10 }]}
            >
                <Text
                    color="#A29C9C"
                    backgroundColor="#222831"
                    fontSize={isActive ? 16 : 20}
                    zIndex={4}
                    paddingLeft={4}
                    paddingRight={4}
                >
                    {placeholder}
                </Text>
            </YStack>        
            {children}
        </YStack>
    )
}

export default PlaceholderWrap