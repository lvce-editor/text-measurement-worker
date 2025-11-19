import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
import * as MeasureTextWidth from '../src/parts/MeasureTextWidth/MeasureTextWidth.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('measureTextWidth uses fast path for monospace font', () => {
  const width = MeasureTextWidth.measureTextWidth('hello', 400, 16, 'Courier New', 0, true, 10)
  expect(width).toBe(50)
})

test('measureTextWidth uses slow path for non-monospace font', () => {
  const width = MeasureTextWidth.measureTextWidth('hello', 400, 16, 'Arial', 0, false, 10)
  expect(width).toBeGreaterThan(0)
  expect(typeof width).toBe('number')
})

test('measureTextWidth fast path with empty string', () => {
  const width = MeasureTextWidth.measureTextWidth('', 400, 16, 'Courier New', 0, true, 10)
  expect(width).toBe(0)
})

test('measureTextWidth slow path with empty string', () => {
  const width = MeasureTextWidth.measureTextWidth('', 400, 16, 'Arial', 0, false, 10)
  expect(width).toBe(0)
})

test('measureTextWidth fast path with different charWidth', () => {
  const width = MeasureTextWidth.measureTextWidth('abc', 400, 16, 'Courier New', 0, true, 8)
  expect(width).toBe(24)
})

test('measureTextWidth slow path returns different width for different font sizes', () => {
  const width16 = MeasureTextWidth.measureTextWidth('hello', 400, 16, 'Arial', 0, false, 10)
  const width32 = MeasureTextWidth.measureTextWidth('hello', 400, 32, 'Arial', 0, false, 10)
  expect(width32).toBeGreaterThan(width16)
})

test('measureTextWidth slow path returns different width for different letter spacing', () => {
  const width0 = MeasureTextWidth.measureTextWidth('hello', 400, 16, 'Arial', 0, false, 10)
  const width2 = MeasureTextWidth.measureTextWidth('hello', 400, 16, 'Arial', 2, false, 10)
  expect(width2).toBeGreaterThan(width0)
})

test('measureTextWidth fast path with unicode characters', () => {
  const width = MeasureTextWidth.measureTextWidth('你好', 400, 16, 'Courier New', 0, true, 10)
  expect(width).toBe(20)
})

test('measureTextWidth slow path with longer text', () => {
  const widthShort = MeasureTextWidth.measureTextWidth('a', 400, 16, 'Arial', 0, false, 10)
  const widthLong = MeasureTextWidth.measureTextWidth('aaaaaaaaaa', 400, 16, 'Arial', 0, false, 10)
  expect(widthLong).toBeGreaterThan(widthShort)
})
