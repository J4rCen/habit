import Svg, { Path } from "react-native-svg";

const ArrowSelect = ({ size = 24, color = 'black' }) => {
   return (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      <Path
        d="M256 352L96 192h320L256 352z"
        fill={color}
      />
    </Svg>
  );
}

export default ArrowSelect