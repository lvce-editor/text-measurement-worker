import { expect, test } from '@jest/globals'
import { getGraphemeSegments } from '../src/parts/GetGraphemeSegments/GetGraphemeSegments.ts'

test('returns serializable grapheme boundaries with UTF-16 indices', () => {
  expect(getGraphemeSegments(['a\u{301}\u{1F469}\u{200D}\u{1F4BB}\tb'])).toEqual([[0, 2, 7, 8, 9]])
})

test('returns boundaries for the current line content', () => {
  expect(getGraphemeSegments(['a', 'ab'])).toEqual([
    [0, 1],
    [0, 1, 2],
  ])
})

test('falls back to code-point boundaries when Intl.Segmenter is unavailable', () => {
  const segmenter = Intl.Segmenter
  Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: undefined })
  try {
    expect(getGraphemeSegments(['a\u{301}\u{1F600}'])).toEqual([[0, 1, 2, 4]])
  } finally {
    Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: segmenter })
  }
})
