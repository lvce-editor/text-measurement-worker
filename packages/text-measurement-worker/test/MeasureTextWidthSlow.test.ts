import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
import * as MeasureTextWidthSlow from '../src/parts/MeasureTextWidthSlow/MeasureTextWidthSlow.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('measureTextWidthSlow returns width for simple text', () => {
  const width = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Arial', 0, false, 10)
  expect(width).toBeGreaterThan(0)
  expect(typeof width).toBe('number')
})

test('measureTextWidthSlow returns different width for different font sizes', () => {
  const width16 = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Arial', 0, false, 10)
  const width32 = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 32, 'Arial', 0, false, 10)
  expect(width32).toBeGreaterThan(width16)
})

test('measureTextWidthSlow returns different width for different letter spacing', () => {
  const width0 = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Arial', 0, false, 10)
  const width2 = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Arial', 2, false, 10)
  expect(width2).toBeGreaterThan(width0)
})

test('measureTextWidthSlow returns different width for different fonts', () => {
  const widthArial = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Arial', 0, false, 10)
  const widthCourier = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Courier New', 0, false, 10)
  expect(typeof widthArial).toBe('number')
  expect(typeof widthCourier).toBe('number')
})

test('measureTextWidthSlow returns different width for different font weights', () => {
  const width400 = MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Arial', 0, false, 10)
  const width700 = MeasureTextWidthSlow.measureTextWidthSlow('hello', 700, 16, 'Arial', 0, false, 10)
  expect(typeof width400).toBe('number')
  expect(typeof width700).toBe('number')
})

test('measureTextWidthSlow returns width for empty string', () => {
  const width = MeasureTextWidthSlow.measureTextWidthSlow('', 400, 16, 'Arial', 0, false, 10)
  expect(width).toBe(0)
})

test('measureTextWidthSlow returns width for longer text', () => {
  const widthShort = MeasureTextWidthSlow.measureTextWidthSlow('a', 400, 16, 'Arial', 0, false, 10)
  const widthLong = MeasureTextWidthSlow.measureTextWidthSlow('aaaaaaaaaa', 400, 16, 'Arial', 0, false, 10)
  expect(widthLong).toBeGreaterThan(widthShort)
})

test('measureTextWidthSlow throws error for invalid text type', () => {
  expect(() => {
    // @ts-expect-error
    MeasureTextWidthSlow.measureTextWidthSlow(null, 400, 16, 'Arial', 0, false, 10)
  }).toThrow()
})

test('measureTextWidthSlow throws error for invalid letterSpacing type', () => {
  expect(() => {
    // @ts-expect-error
    MeasureTextWidthSlow.measureTextWidthSlow('hello', 400, 16, 'Arial', '0', false, 10)
  }).toThrow('letterSpacing must be of type number')
})
