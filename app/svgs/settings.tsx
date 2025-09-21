import Svg, { Circle, G, Line, Path } from "react-native-svg"

export interface ISvgSettings {
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

export const SaveFile = ({ color, size }: ISvgSettings) => {
    return (
        <Svg fill="#ffffff" width={size} height={size} viewBox="0 0 24 24">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <G id="Save_Up_2" data-name="Save Up 2">
                    <G>
                        <Path d="M18.437,20.937H5.563a2.372,2.372,0,0,1-2.5-2.211v-11a2.372,2.372,0,0,1,2.5-2.212h.462a.5.5,0,0,1,0,1H5.563a1.381,1.381,0,0,0-1.5,1.212v11a1.38,1.38,0,0,0,1.5,1.211H18.437a1.38,1.38,0,0,0,1.5-1.211v-11a1.381,1.381,0,0,0-1.5-1.212h-.462a.5.5,0,0,1,0-1h.462a2.372,2.372,0,0,1,2.5,2.212v11A2.372,2.372,0,0,1,18.437,20.937Z" />
                        <Path d="M8.645,6.213l3-3a.5.5,0,0,1,.35-.15.508.508,0,0,1,.36.15l3,3a.5.5,0,0,1-.71.71l-2.14-2.14v8.47a.508.508,0,0,1-.5.5.5.5,0,0,1-.5-.5V4.763l-2.15,2.16a.5.5,0,0,1-.71-.71Z" />
                    </G>
                </G>
            </G>
        </Svg>
    )
}

export const LoadFile = ({ color, size }: ISvgSettings) => {
    return (
        <Svg fill="#ffffff" width={size} height={size} viewBox="0 0 24 24">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <G id="Save_Down_2" data-name="Save Down 2">
                    <G>
                        <Path d="M18.437,20.948H5.563a2.372,2.372,0,0,1-2.5-2.21v-11a2.372,2.372,0,0,1,2.5-2.211h.462a.5.5,0,0,1,0,1H5.563a1.38,1.38,0,0,0-1.5,1.211v11a1.38,1.38,0,0,0,1.5,1.21H18.437a1.38,1.38,0,0,0,1.5-1.21v-11a1.38,1.38,0,0,0-1.5-1.211h-.462a.5.5,0,0,1,0-1h.462a2.372,2.372,0,0,1,2.5,2.211v11A2.372,2.372,0,0,1,18.437,20.948Z" />
                        <Path d="M15.355,10.592l-3,3a.5.5,0,0,1-.35.15.508.508,0,0,1-.36-.15l-3-3a.5.5,0,0,1,.71-.71l2.14,2.139V3.552a.508.508,0,0,1,.5-.5.5.5,0,0,1,.5.5v8.49l2.15-2.16a.5.5,0,0,1,.71.71Z" />
                    </G>
                </G>
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

export const Language = ({ color, size }: ISvgSettings) => {
    return (
        <Svg fill="#ffffff" width={size} height={size} viewBox="796 796 200 200" enable-background="new 796 796 200 200">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <G>
                    <Path d="M973.166,818.5H818.833c-12.591,0-22.833,10.243-22.833,22.833v109.333c0,12.59,10.243,22.833,22.833,22.833h154.333 c12.59,0,22.834-10.243,22.834-22.833V841.333C996,828.743,985.756,818.5,973.166,818.5z M896,961.5h-77.167 c-5.973,0-10.833-4.859-10.833-10.833V841.333c0-5.974,4.86-10.833,10.833-10.833H896V961.5z M978.58,872.129 c-0.547,9.145-5.668,27.261-20.869,39.845c4.615,1.022,9.629,1.573,14.92,1.573v12c-10.551,0-20.238-1.919-28.469-5.325 c-7.689,3.301-16.969,5.325-28.125,5.325v-12c5.132,0,9.924-0.501,14.366-1.498c-8.412-7.016-13.382-16.311-13.382-26.78h11.999 c0,8.857,5.66,16.517,14.884,21.623c4.641-2.66,8.702-6.112,12.164-10.351c5.628-6.886,8.502-14.521,9.754-20.042h-49.785v-12 h22.297v-11.986h12V864.5h21.055c1.986,0,3.902,0.831,5.258,2.28C977.986,868.199,978.697,870.155,978.58,872.129z" />
                    <G>
                        <G>
                            <Path d="M839.035,914.262l-4.45,11.258h-15.971l26.355-61.09h15.971l25.746,61.09h-16.583l-4.363-11.258H839.035z M852.475,879.876l-8.902,22.604h17.629L852.475,879.876z" />
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    )
}

export const Star = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 64 64" enable-background="new 0 0 64 64" fill="#ffffff">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path fill="#ffffff" d="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15 C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343 c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957 c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25 c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657 C63.951,25.771,64.131,24.987,63.893,24.277z" />
            </G>
        </Svg>
    )
}

export const Message = ({ color, size }: ISvgSettings) => {
    return (
        <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" >
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path d="M17 2H7C4.24 2 2 4.23 2 6.98V12.96V13.96C2 16.71 4.24 18.94 7 18.94H8.5C8.77 18.94 9.13 19.12 9.3 19.34L10.8 21.33C11.46 22.21 12.54 22.21 13.2 21.33L14.7 19.34C14.89 19.09 15.19 18.94 15.5 18.94H17C19.76 18.94 22 16.71 22 13.96V6.98C22 4.23 19.76 2 17 2ZM8 12C7.44 12 7 11.55 7 11C7 10.45 7.45 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12ZM12 12C11.44 12 11 11.55 11 11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12ZM16 12C15.44 12 15 11.55 15 11C15 10.45 15.45 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z" fill="#ffffff" />
            </G>
        </Svg>
    )
}

export const Bell = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M4.5835 7.41667C4.5835 3.32056 7.90405 0 12.0002 0C16.0963 0 19.4168 3.32056 19.4168 7.41667V8.33334C19.4168 10.5339 19.7156 12.4847 20.171 13.8507C20.4004 14.539 20.6515 15.0238 20.8818 15.316C21.0523 15.5324 21.1541 15.5761 21.1774 15.5834C21.7248 15.5891 22.1668 16.0346 22.1668 16.5833V16.7917C22.1668 17.344 21.7191 17.7917 21.1668 17.7917H2.8335C2.28121 17.7917 1.8335 17.344 1.8335 16.7917V16.5833C1.8335 16.0346 2.27551 15.5891 2.82292 15.5834C2.84626 15.5761 2.948 15.5324 3.11851 15.316C3.34881 15.0238 3.59994 14.539 3.82936 13.8507C4.2847 12.4847 4.5835 10.5339 4.5835 8.33334V7.41667ZM2.81774 15.5847C2.81773 15.5846 2.81863 15.5844 2.82044 15.5841L2.81886 15.5845C2.81812 15.5847 2.81774 15.5847 2.81774 15.5847Z" fill="#ffffff" />
                <Path d="M9.25013 19.5C8.87258 19.5 8.52722 19.7126 8.35723 20.0497C8.18723 20.3869 8.2216 20.791 8.44606 21.0945C9.27818 22.2199 10.5352 23 12.0001 23C13.465 23 14.7221 22.2199 15.5542 21.0945C15.7787 20.791 15.813 20.3869 15.643 20.0497C15.473 19.7126 15.1277 19.5 14.7501 19.5H9.25013Z" fill="#ffffff" />
            </G>
        </Svg>
    )
}

export const Watch = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <Path d="M12 8V12L15 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
                <Circle cx="12" cy="12" r="9" stroke="#ffffff" stroke-width="2" />
            </G>
        </Svg>
    )
}

export const Brush = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 -2 32 32" fill="#ffffff">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <G id="Icon-Set-Filled" transform="translate(-101.000000, -156.000000)" fill="#ffffff">
                        <Path d="M132.132,156.827 C130.975,155.685 129.099,155.685 127.942,156.827 L115.336,169.277 L119.499,173.44 L132.132,160.964 C133.289,159.821 133.289,157.969 132.132,156.827 L132.132,156.827 Z M112.461,180.385 C111.477,181.298 107.08,183.333 104.491,181.36 C104.491,181.36 105.392,180.657 106.074,179.246 C107.703,174.919 111.763,175.56 111.763,175.56 L113.159,176.938 C113.173,176.952 114.202,178.771 112.461,180.385 L112.461,180.385 Z M113.913,170.683 L110.764,173.788 C108.661,173.74 105.748,174.485 104.491,178.603 C103.53,180.781 101,180.671 101,180.671 C106.253,186.498 112.444,183.196 113.857,181.764 C115.1,180.506 115.279,178.966 115.146,177.734 L118.076,174.846 L113.913,170.683 L113.913,170.683 Z" id="brush" />
                    </G>
                </G>
            </G>
        </Svg>
    )
}

export const FileSvg = ({ color, size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff">
            <G id="SVGRepo_bgCarrier" stroke-width="0" />
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <G id="SVGRepo_iconCarrier">
                <G id="Complete">
                    <G id="F-File">
                        <G id="Text">
                            <G>
                                <Path d="M18,22H6a2,2,0,0,1-2-2V4A2,2,0,0,1,6,2h7.1a2,2,0,0,1,1.5.6l4.9,5.2A2,2,0,0,1,20,9.2V20A2,2,0,0,1,18,22Z" fill="none" id="File" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                <Line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.9" x2="16.1" y1="17.5" y2="17.5" />
                                <Line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.9" x2="16.1" y1="13.5" y2="13.5" />
                                <Line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="8" x2="13" y1="9.5" y2="9.5" />
                            </G>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    )
}