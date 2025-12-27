import * as Font from '../Font/Font.ts'
import * as GetAccurateColumnIndexUnicode from '../GetAccurateColumnIndexUnicode/GetAccurateColumnIndexUnicode.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import * as MeasureTextWidth from '../MeasureTextWidth/MeasureTextWidth.ts'
import { wordRight } from '../WordRight/WordRight.ts'

export const commandMap = {
  'TextMeasurement.ensureFont': Font.ensure,
  'TextMeasurement.getAccurateColumnIndexUnicode': GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode,
  'TextMeasurement.handleMessagePort': HandleMessagePort.handleMessagePort,
  'TextMeasurement.measureTextWidth': MeasureTextWidth.measureTextWidth,
  'TextMeasurement.wordRight': wordRight,
}
