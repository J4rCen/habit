import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from "react-native-svg"
import { ISvgSettings } from "./settings"

export const RusFlag = ({ size }: ISvgSettings) => {
	return (
		<Svg viewBox="0 -4 28 28" fill="none" width={size} height={size}>
			<G id="SVGRepo_bgCarrier" stroke-width="0" />
			<G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
			<G id="SVGRepo_iconCarrier">
				<G>
					<Rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="#F5F5F5" stroke-width="0.5" />
					<Mask id="mask0_503_2726" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="20">
						<Rect x="0.25" y="0.25" width="27.5" height="19.5" rx="1.75" fill="white" stroke="white" stroke-width="0.5" />
					</Mask>
					<G mask="url(#mask0_503_2726)">
						<Path fill-rule="evenodd" clip-rule="evenodd" d="M0 13.3333H28V6.66667H0V13.3333Z" fill="#0C47B7" />
						<Path fill-rule="evenodd" clip-rule="evenodd" d="M0 20H28V13.3333H0V20Z" fill="#E53B35" />
					</G>
				</G>
				<Defs>
					<ClipPath id="clip0_503_2726">
						<Rect width="28" height="20" rx="2" fill="white" />
					</ClipPath>
				</Defs>
			</G>
		</Svg>
	)
}