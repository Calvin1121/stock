import * as shape from 'd3-shape'
import { useMemo } from 'react'
import { ms } from 'react-native-size-matters'
import Svg, {
    Defs,
    LinearGradient,
    Path,
    Stop,
} from 'react-native-svg'

interface Props {
  data: number[]
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
}

export default function MiniSparkline({
  data,
  width = 100,
  height = 50,
  color = '#00D39E',
  strokeWidth = ms(1),
}: Props) {
  const { linePath, areaPath } = useMemo(() => {
    if (data.length < 2) {
      return {
        linePath: '',
        areaPath: '',
      }
    }

    const min = Math.min(...data)
    const max = Math.max(...data)

    const range = max - min || 1

    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * width,
      y:
        height -
        ((value - min) / range) * height,
    }))

    const lineGenerator = shape
      .line<(typeof points)[0]>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(shape.curveMonotoneX)

    const areaGenerator = shape
      .area<(typeof points)[0]>()
      .x((d) => d.x)
      .y0(height)
      .y1((d) => d.y)
      .curve(shape.curveMonotoneX)

    return {
      linePath: lineGenerator(points) || '',
      areaPath: areaGenerator(points) || '',
    }
  }, [data, width, height])

  const gradientId = useMemo(
    () => `gradient-${Math.random()}`,
    []
  )

  return (
    <Svg
      width={width}
      height={height}
    >
      <Defs>
        <LinearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <Stop
            offset="0%"
            stopColor={color}
            stopOpacity={0.35}
          />
          <Stop
            offset="100%"
            stopColor={color}
            stopOpacity={0}
          />
        </LinearGradient>
      </Defs>

      <Path
        d={areaPath}
        fill={`url(#${gradientId})`}
      />

      <Path
        d={linePath}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}