import { beforeEach, expect, test } from '@jest/globals'
import * as MeasureTextWidthFast from '../src/parts/MeasureTextWidthFast/MeasureTextWidthFast.ts'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('measureTextWidthFast with single character', () => {
  expect(MeasureTextWidthFast.measureTextWidthFast('a', 10)).toBe(10)
})

test('measureTextWidthFast with multiple characters', () => {
  expect(MeasureTextWidthFast.measureTextWidthFast('abc', 10)).toBe(30)
})

test('measureTextWidthFast with empty string', () => {
  expect(MeasureTextWidthFast.measureTextWidthFast('', 10)).toBe(0)
})

test('measureTextWidthFast with different charWidth', () => {
  expect(MeasureTextWidthFast.measureTextWidthFast('hello', 8)).toBe(40)
})

test('measureTextWidthFast with decimal charWidth', () => {
  expect(MeasureTextWidthFast.measureTextWidthFast('ab', 7.5)).toBe(15)
})

test('measureTextWidthFast with unicode characters', () => {
  expect(MeasureTextWidthFast.measureTextWidthFast('你好', 10)).toBe(20)
})
