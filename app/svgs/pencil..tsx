import Svg, { G, Path } from "react-native-svg"

const Pencil = ({ color, size }: { color: string, size: string }) => {
    return (
        <Svg
            width={size} height={size}
            viewBox="0 0 18 18" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0"/>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <G id="SVGRepo_iconCarrier">
                <Path d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z" fill={color}/>
                <Path d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z" fill={color}/>
            </G>
        </Svg>
    )
}

export default Pencil