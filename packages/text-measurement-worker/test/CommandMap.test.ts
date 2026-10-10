import { expect, test } from '@jest/globals'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { getGraphemeSegments } from '../src/parts/GetGraphemeSegments/GetGraphemeSegments.ts'
import { measureTextBlockHeight } from '../src/parts/MeasureTextBlockHeight/MeasureTextBlockHeight.ts'

test('exposes block height measurement', () => {
  expect(commandMap['TextMeasurement.measureTextBlockHeight']).toBe(measureTextBlockHeight)
})

test('exposes grapheme segmentation', () => {
  expect(commandMap['TextMeasurement.getGraphemeSegments']).toBe(getGraphemeSegments)
})
