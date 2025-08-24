import Svg, { G, Path } from "react-native-svg"

interface ISvgSettings {
    color?: string,
    size: number
}

export const UserAccount = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path d="M7.25 6a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0ZM2.25 22c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75Z" fill="#ffffff" />
            </G>
        </Svg>
    )
}

export const Crown = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <G>
                    <Path d="M512,152.469c0-21.469-17.422-38.875-38.891-38.875c-21.484,0-38.906,17.406-38.906,38.875 c0,10.5,4.172,20.016,10.938,27c-26.453,54.781-77.016,73.906-116.203,56.594c-34.906-15.438-47.781-59.563-52.141-93.75 c14.234-7.484,23.938-22.391,23.938-39.594C300.734,78.016,280.719,58,256,58c-24.703,0-44.734,20.016-44.734,44.719 c0,17.203,9.703,32.109,23.938,39.594c-4.359,34.188-17.234,78.313-52.141,93.75c-39.188,17.313-89.75-1.813-116.203-56.594 c6.766-6.984,10.938-16.5,10.938-27c0-21.469-17.422-38.875-38.891-38.875C17.422,113.594,0,131,0,152.469 c0,19.781,14.781,36.078,33.875,38.547l44.828,164.078h354.594l44.828-164.078C497.234,188.547,512,172.25,512,152.469z" fill={'#fff'} />
                    <Path d="M455.016,425.063c0,15.984-12.953,28.938-28.953,28.938H85.938C69.953,454,57,441.047,57,425.063v-2.406 c0-16,12.953-28.953,28.938-28.953h340.125c16,0,28.953,12.953,28.953,28.953V425.063z" fill={'#fff'} />

                </G>
            </G>
        </Svg>
    )
}

export const SaveInCloud = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path d="M12 21V11M12 11L9 14M12 11L15 14M7 16.8184C4.69636 16.2074 3 14.1246 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.8148 19.25 16.7236 17 16.9725" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </G>
        </Svg>
    )
}

export const LoadInCloud = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path d="M5.25589 16C3.8899 15.0291 3 13.4422 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417M12 21V11M12 21L9 18M12 21L15 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </G>
        </Svg>
    )
}

export const Logout = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path fill="#ffffff" fill-rule="evenodd" d="M10.138 1.815A3 3 0 0 1 14 4.688v14.624a3 3 0 0 1-3.862 2.873l-6-1.8A3 3 0 0 1 2 17.512V6.488a3 3 0 0 1 2.138-2.873l6-1.8zM15 4a1 1 0 0 1 1-1h3a3 3 0 0 1 3 3v1a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1h-3a1 1 0 0 1-1-1zm6 12a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-3a1 1 0 1 1 0-2h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1zM9 11a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H9z" clip-rule="evenodd" />
                <Path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h5m0 0-2-2m2 2-2 2" />
            </G>
        </Svg>
    )
}