import React from "react";
import Svg, { Path } from 'react-native-svg';

const ArrowBack = ({size = 64, color = '#fff'}) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            fill="none"
        >
            <Path
                d="M217.9 112.1L97.8 232.2c-9.4 9.4-9.4 24.6 0 33.9l120.1 120.1c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L179.8 280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.8l72.1-72.1c9.4-9.4 9.4-24.6 0-33.9s-24.5-9.4-33.9 0z"
                fill={color}
            />
        </Svg>
    )
}

export default ArrowBack