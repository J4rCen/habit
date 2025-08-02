import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import { Text, View } from 'tamagui'

type GoalType = 'single' | 'reusable' | 'timer'

interface ICircularProgress {
    progress: number
    goalType: GoalType
    size?: number
    strokeWidth?: number
    total?: number      // для reusable
    value?: number      // для reusable
    elapsed?: number    // для timer
    duration?: number   // для timer
}

const CircularProgress = ({
    progress,
    total,
    value,
    goalType,
    size = 80,
    strokeWidth = 8,
    elapsed,
    duration
}: ICircularProgress) => {
  // Ограничим минимальный размер
    const safeSize = Math.max(size, strokeWidth * 2 + 10)
    const radius = (safeSize - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const clampedProgress = Math.max(0, Math.min(progress, 1))
    const strokeDashoffset = circumference * (1 - clampedProgress)
    const isComplete = Math.round(clampedProgress * 1000) / 1000 === 1

    if (isComplete) {
        return (
            <Svg width={size} height={size} viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="50" fill="#229C15" />
                <Path
                    d="M30 52 L45 67 L75 35"
                    fill="none"
                    stroke="white"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        )
    }

    const formatCountdown = (seconds: number) => {
        const totalMinutes = Math.floor(seconds / 60)
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    const Mark = () => {

        if (goalType === 'reusable' && total != null && value != null) {
            return (
                <Text fontSize={14} color="white">
                    {`${value}/${total}`}
                </Text>
            )
        }

        if (goalType === 'timer' && duration != null && elapsed != null ) {
            return (
                <Text fontSize={14} color="white">
                    {formatCountdown(Math.max(duration - elapsed, 0))}
                </Text>
            )
        }
    }

    return (
        <View width={safeSize} height={safeSize} alignItems="center" justifyContent="center">
            <Svg width={safeSize} height={safeSize}>
                <Circle
                    stroke="#ccc"
                    fill="none"
                    cx={safeSize / 2}
                    cy={safeSize / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke="#229C15"
                    fill="none"
                    cx={safeSize / 2}
                    cy={safeSize / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    originX={safeSize / 2}
                    originY={safeSize / 2}
                />
            </Svg>
            <View position="absolute" alignItems="center" justifyContent="center">
                <Mark/>
            </View>
        </View>
    )
}

export default CircularProgress