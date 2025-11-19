import * as MeasureTextWidth from '../MeasureTextWidth/MeasureTextWidth.ts'
import * as Font from '../Font/Font.ts'

export const commandMap = {
  'TextMeasurement.measureTextWidth': MeasureTextWidth.measureTextWidth,
  'TextMeasurement.ensureFont': Font.ensure,
}
