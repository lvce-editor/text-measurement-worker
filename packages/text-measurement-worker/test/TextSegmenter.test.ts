import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
import * as TextSegmenter from '../src/parts/TextSegmenter/TextSegmenter.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('visualIndex', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.visualIndex('abc', 3)).toBe(3)
})

test('visualIndex - at start', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.visualIndex('abc', 0)).toBe(0)
})

test('visualIndex - with emoji - 👮🏽‍♀️', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.visualIndex('👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️', 21)).toBe(3)
})

test('modelIndex', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.modelIndex('abc', 2)).toBe(2)
})

test('modelIndex - at start', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.modelIndex('abc', 0)).toBe(0)
})

test('modelIndex - with emoji - 👮🏽‍♀️', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.modelIndex('👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️', 3)).toBe(21)
})

test('modelIndex - beyond segments', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.modelIndex('abc', 10)).toBe(3)
})

test('visualIndex - beyond string length', () => {
  const segmenter = TextSegmenter.create()
  expect(segmenter.visualIndex('abc', 10)).toBe(3)
})

test('supported', () => {
  expect(TextSegmenter.supported()).toBe(true)
})

test('at - returns segment data', () => {
  const segmenter = TextSegmenter.create()
  const result = segmenter.at('abc', 1)
  expect(result).toBeDefined()
  expect(result?.index).toBe(1)
  expect(result?.segment).toBe('b')
})

test('at - at start', () => {
  const segmenter = TextSegmenter.create()
  const result = segmenter.at('abc', 0)
  expect(result).toBeDefined()
  expect(result?.index).toBe(0)
  expect(result?.segment).toBe('a')
})

test('at - with emoji', () => {
  const segmenter = TextSegmenter.create()
  const result = segmenter.at('👮🏽‍♀️abc', 0)
  expect(result).toBeDefined()
  expect(result?.index).toBe(0)
})

test('at - beyond string length', () => {
  const segmenter = TextSegmenter.create()
  const result = segmenter.at('abc', 10)
  expect(result).toBeUndefined()
})

test('getSegments', () => {
  const segmenter = TextSegmenter.create()
  const segments = segmenter.getSegments('abc')
  expect(segments).toBeDefined()
  const array = [...segments]
  expect(array.length).toBe(3)
  expect(array[0].segment).toBe('a')
  expect(array[1].segment).toBe('b')
  expect(array[2].segment).toBe('c')
})

test('getSegments - with emoji', () => {
  const segmenter = TextSegmenter.create()
  const segments = segmenter.getSegments('👮🏽‍♀️')
  expect(segments).toBeDefined()
  const array = [...segments]
  expect(array.length).toBe(1)
  expect(array[0].segment).toBe('👮🏽‍♀️')
})
