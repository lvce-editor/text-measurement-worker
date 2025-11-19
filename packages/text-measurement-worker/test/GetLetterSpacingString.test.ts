import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'
import * as GetLetterSpacingString from '../src/parts/GetLetterSpacingString/GetLetterSpacingString.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('getLetterSpacingString', () => {
  expect(GetLetterSpacingString.getLetterSpacingString(0)).toBe('0px')
  expect(GetLetterSpacingString.getLetterSpacingString(1)).toBe('1px')
  expect(GetLetterSpacingString.getLetterSpacingString(1.5)).toBe('1.5px')
  expect(GetLetterSpacingString.getLetterSpacingString(-0.5)).toBe('-0.5px')
})
