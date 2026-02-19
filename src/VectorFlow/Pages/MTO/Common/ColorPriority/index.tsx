import { ICellRendererParams } from 'ag-grid-enterprise'
import _ from 'lodash'
import {
  ColorPriorityCellRendererWrapper,
  ColorPriorityCellRenderer,
  gradientVar,
} from './styles.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

interface ColorValues {
  B: number
  R: number
  Y: number
  G: number
  W: number
  Bl: number
}

const buildGradient = (vals: Partial<ColorValues>): string => {
  const { B = 0, R = 0, Y = 0, G = 0, W = 0, Bl = 0 } = vals

  const stops: string[] = []
  const b0 = 0
  const b1 = B
  const r1 = B + R
  const y1 = B + R + Y
  const g1 = B + R + Y + G
  const w1 = B + R + Y + G + W

  if (B > 0) stops.push(`#000000 ${b0}% ${b1}%`)
  if (R > 0) stops.push(`#E53F3F ${b1}% ${r1}%`)
  if (Y > 0) stops.push(`#EBBF2C ${r1}% ${y1}%`)
  if (G > 0) stops.push(`#4CAF50 ${y1}% ${g1}%`)
  if (W > 0) stops.push(`#cecece ${g1}% ${w1}%`)
  if (Bl > 0) stops.push(`#0000FF ${w1}% 100%`)

  if (stops.length === 0) {
    // default if all zeros
    return 'linear-gradient(to right, #FFFFFF 0% 100%)'
  }
  return `linear-gradient(to right, ${stops.join(', ')})`
}

const ColorPriority = (props: ICellRendererParams) => {
  let colorValues: ColorValues | undefined
  if (!_.isEmpty(props.data)) {
    colorValues = props.data?.cp?.[0]
  }

  if (!colorValues) return <></>

  const gradient = buildGradient(colorValues)

  return (
    <div className={ColorPriorityCellRendererWrapper} data-testid="cp-cell-renderer">
      <div
        className={ColorPriorityCellRenderer}
        style={assignInlineVars({
          [gradientVar]: gradient,
        })}
      />
    </div>
  )
}

export default ColorPriority
