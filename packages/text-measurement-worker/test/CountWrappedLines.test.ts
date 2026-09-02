import { expect, test } from '@jest/globals'
import * as CountWrappedLines from '../src/parts/CountWrappedLines/CountWrappedLines.ts'

const measureText = (text: string): number => text.length

test('countWrappedLines uses hyphens as css line break opportunities', () => {
  const lineCount = CountWrappedLines.countWrappedLines("'replacement-value-with-long-text'", 18, measureText)

  expect(lineCount).toBe(3)
})

test('countWrappedLines does not break an unbreakable word at arbitrary characters', () => {
  const lineCount = CountWrappedLines.countWrappedLines('averylongword', 4, measureText)

  expect(lineCount).toBe(1)
})

test('countWrappedLines wraps whitespace-separated and hyphenated segments greedily', () => {
  const lineCount = CountWrappedLines.countWrappedLines('one long-value-here', 8, measureText)

  expect(lineCount).toBe(4)
})
