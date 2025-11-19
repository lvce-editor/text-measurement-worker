/** @jest-environment jsdom */
import { beforeEach, test, expect } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('MockOffscreenCanvas constructor sets width and height', () => {
  const canvas = new OffscreenCanvas(100, 200)
  expect(canvas.width).toBe(100)
  expect(canvas.height).toBe(200)
})

test('getContext returns 2d context', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  expect(context).not.toBeNull()
  expect(context?.canvas).toBe(canvas)
})

test('getContext returns same context on multiple calls', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context1 = canvas.getContext('2d')
  const context2 = canvas.getContext('2d')
  expect(context1).toBe(context2)
})

test('measureText calculates width with default font', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  const metrics = context.measureText('hello')
  expect(metrics.width).toBe(30)
})

test('measureText calculates width with custom font size', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = '400 20px Arial'
  const metrics = context.measureText('hello')
  expect(metrics.width).toBe(60)
})

test('measureText calculates width with letter spacing', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = '400 10px Arial'
  context.letterSpacing = '2px'
  const metrics = context.measureText('hello')
  expect(metrics.width).toBe(38)
})

test('measureText calculates width with negative letter spacing', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = '400 10px Arial'
  context.letterSpacing = '-1px'
  const metrics = context.measureText('hello')
  expect(metrics.width).toBe(26)
})

test('measureText calculates width with decimal letter spacing', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = '400 10px Arial'
  context.letterSpacing = '1.5px'
  const metrics = context.measureText('hello')
  expect(metrics.width).toBe(36)
})

test('measureText handles empty string', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  const metrics = context.measureText('')
  expect(metrics.width).toBe(0)
})

test('measureText handles single character', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = '400 10px Arial'
  context.letterSpacing = '2px'
  const metrics = context.measureText('a')
  expect(metrics.width).toBe(6)
})

test('measureText returns correct TextMetrics properties', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = '400 20px Arial'
  const metrics = context.measureText('test')
  expect(metrics.actualBoundingBoxAscent).toBe(12.5)
  expect(metrics.actualBoundingBoxDescent).toBe(2.5)
  expect(metrics.actualBoundingBoxLeft).toBe(0)
  expect(metrics.actualBoundingBoxRight).toBe(48)
  expect(metrics.alphabeticBaseline).toBe(10)
  expect(metrics.emHeightAscent).toBe(12.5)
  expect(metrics.emHeightDescent).toBe(2.5)
  expect(metrics.fontBoundingBoxAscent).toBe(12.5)
  expect(metrics.fontBoundingBoxDescent).toBe(2.5)
  expect(metrics.hangingBaseline).toBe(10)
  expect(metrics.ideographicBaseline).toBe(10)
})

test('measureText handles invalid font string gracefully', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = 'invalid font string'
  const metrics = context.measureText('hello')
  expect(metrics.width).toBe(30)
})

test('measureText handles invalid letter spacing gracefully', () => {
  const canvas = new OffscreenCanvas(100, 200)
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Context should not be null')
  }

  context.font = '400 10px Arial'
  context.letterSpacing = 'invalid'
  const metrics = context.measureText('hello')
  expect(metrics.width).toBe(30)
})

