import Svg, { Ellipse, Path } from "react-native-svg";
import { ISvgSettings } from "./settings";

export const MorningSvg = ({ size }: ISvgSettings) => {
    return (
    <Svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <Path
        d="M32.2572 30.0413H17.742M30.2778 34H19.7214M34.2365 26.7424C34.2365 21.641 30.101 17.5055 24.9996 17.5055C19.8982 17.5055 15.7627 21.641 15.7627 26.7424H22L24.9996 24.5L28 26.7424H34.2365Z"
        stroke="white"
        strokeWidth={2}
      />
      <Path
        d="M25.0527 8L25.0527 12.5707"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M43 25.6264L38.3333 25.6264"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M11.666 25.6264L6.99927 25.6264"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M34.4883 16.3932L37.7882 13.1612"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M12.333 13.1729L15.6329 16.4048"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export const DaySvg = ({ size }: ISvgSettings) => {
    return (
    <Svg width={size} height={size} viewBox="0 0 53 52" fill="none">
      <Ellipse
        cx={25.9997}
        cy={26}
        rx={7.36837}
        ry={7.36843}
        stroke="white"
        strokeWidth={2}
      />
      <Path
        d="M25.9998 11L25.9998 15"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M40 26L36 26"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M15.7436 36.2675L18.572 33.4391"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M15.744 15.7374L18.5724 18.5658"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M26.0004 36L26.0004 40"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M15.9998 26L11.9998 26"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M33.8102 18.1999L36.6386 15.3715"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M33.8102 33.8048L36.6386 36.6333"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export const EveningSvg = ({ size }: ISvgSettings) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 55 54" fill="none">
            <Path
            d="M26.9078 6.80726C22.5769 10.5672 19.8385 16.1138 19.8385 22.2994C19.8385 33.6252 29.0205 42.8063 40.3463 42.8063C41.8285 42.8063 43.2736 42.648 44.6666 42.3493C41.0679 45.4728 36.3704 47.3639 31.231 47.3639C19.9053 47.3638 10.7242 38.1818 10.7242 26.8561C10.7244 17.0138 17.6584 8.79228 26.9078 6.80726Z"
            fill="white"
            />
            <Path
            d="M32.9164 11.5715C33.0117 14.8948 35.734 17.5597 39.0805 17.5597C35.6739 17.5598 32.9127 20.3212 32.9125 23.7277C32.9123 20.3816 30.2473 17.6592 26.9242 17.5636C30.1875 17.461 32.813 14.8348 32.9066 11.5715C32.9099 11.5714 32.9132 11.5716 32.9164 11.5715Z"
            fill="white"
            />
            <Path
            d="M37.5947 27C37.6666 29.495 39.7112 31.496 42.2236 31.4961C39.6658 31.4962 37.5919 33.5692 37.5918 36.127C37.5916 33.6146 35.5907 31.5709 33.0957 31.499C35.5456 31.4216 37.5172 29.45 37.5878 27C37.5901 27 37.5924 27.0001 37.5947 27Z"
            fill="white"
            />
        </Svg>
  );
}
