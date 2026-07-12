import Svg, { G, Path } from "react-native-svg"

export const ArrowRight = ({ color, size }: { color: string, size: number }) => {
    return (
        <Svg fill={color} width={size} height={size} viewBox="0 0 32 32">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path d="M11.303 8l11.394 7.997L11.303 24z" />
            </G>
        </Svg>
    )
}

export const ArrowLeft = ({ color, size }: { color: string, size: number }) => {
    return (
        <Svg fill={color} width={size} height={size} viewBox="0 0 32 32">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path d="M20.697 24L9.303 16.003 20.697 8z" />
            </G>
        </Svg>
    )
}