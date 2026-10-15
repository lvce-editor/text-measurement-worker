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

test('segments printable ASCII and tabs without initializing Intl.Segmenter', () => {
  const segmenter = Intl.Segmenter
  Object.defineProperty(Intl, 'Segmenter', {
    configurable: true,
    value: class {
      constructor() {
        throw new Error('ASCII segmentation must not initialize ICU')
      }
    },
  })
  try {
    expect(getGraphemeSegments(['hello world', '\t', ''])).toEqual([[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 1], [0]])
  } finally {
    Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: segmenter })
  }
})

test('matches Unicode grapheme segmentation for ASCII and mixed content', () => {
  const ascii = Array.from({ length: 95 }, (_, index) => String.fromCodePoint(index + 32)).join('')
  const lines = [ascii, 'hello\tworld', '\r\n', 'a\r\nb', 'a\u{301}', '\u{1F1FA}\u{1F1F8}', 'a\u{1F469}\u{200D}\u{1F4BB}b']
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
  const expected = lines.map((line) => [...Array.from(segmenter.segment(line), ({ index }) => index), line.length])
  expect(getGraphemeSegments(lines)).toEqual(expected)
})
