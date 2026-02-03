import * as Font from '../Font/Font.ts'
import * as GetAccurateColumnIndexUnicode from '../GetAccurateColumnIndexUnicode/GetAccurateColumnIndexUnicode.ts'
import { getPosition } from '../GetPosition/GetPosition.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import * as MeasureTextWidth from '../MeasureTextWidth/MeasureTextWidth.ts'
import { measureTextWidths } from '../MeasureTextWidths/MeasureTextWidths.ts'
import { wordRight } from '../WordRight/WordRight.ts'

export const commandMap = {
  'TextMeasurement.ensureFont': Font.ensure,
  'TextMeasurement.getAccurateColumnIndexUnicode': GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode,
  'TextMeasurement.getPosition': getPosition,
  'TextMeasurement.handleMessagePort': HandleMessagePort.handleMessagePort,
  'TextMeasurement.measureTextWidth': MeasureTextWidth.measureTextWidth,
  'TextMeasurement.measureTextWidths': measureTextWidths,
  'TextMeasurement.wordRight': wordRight,
}
