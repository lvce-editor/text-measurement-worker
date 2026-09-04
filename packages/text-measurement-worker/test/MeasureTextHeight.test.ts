import { beforeEach, expect, test } from '@jest/globals'
import * as MeasureTextHeight from '../src/parts/MeasureTextHeight/MeasureTextHeight.ts'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('measureTextBlockHeight returns one line when text fits width', async () => {
  const height = await MeasureTextHeight.measureTextBlockHeight('hello', 'Arial', 10, 20, 100)
  expect(height).toBe(20)
})

test('measureTextBlockHeight wraps text across multiple lines', async () => {
  const height = await MeasureTextHeight.measureTextBlockHeight('hello world', 'Arial', 10, 20, 40)
  expect(height).toBe(40)
})

test('measureTextBlockHeight respects explicit newline breaks', async () => {
  const height = await MeasureTextHeight.measureTextBlockHeight('hello\nworld', 'Arial', 10, 20, 100)
  expect(height).toBe(40)
})

test('measureTextBlockHeight parses string line heights', async () => {
  const height = await MeasureTextHeight.measureTextBlockHeight('hello world', 'Arial', 10, '24px', 40)
  expect(height).toBe(48)
})
