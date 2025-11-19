import * as Font from '../Font/Font.ts'
import * as GetAccurateColumnIndexUnicode from '../GetAccurateColumnIndexUnicode/GetAccurateColumnIndexUnicode.ts'
import * as MeasureTextWidth from '../MeasureTextWidth/MeasureTextWidth.ts'

export const commandMap = {
  'TextMeasurement.measureTextWidth': MeasureTextWidth.measureTextWidth,
  'TextMeasurement.ensureFont': Font.ensure,
  'TextMeasurement.getAccurateColumnIndexUnicode': GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode,
}
