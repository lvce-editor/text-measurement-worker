import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'
import { createMeasureContext } from '../src/parts/CreateMeasureContext/CreateMeasureContext.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('createMeasureContext returns OffscreenCanvasRenderingContext2D', () => {
  const ctx = createMeasureContext()
  expect(ctx).toBeDefined()
  expect(ctx.canvas).toBeDefined()
})

test('createMeasureContext creates canvas with 0x0 dimensions', () => {
  const ctx = createMeasureContext()
  expect(ctx.canvas.width).toBe(0)
  expect(ctx.canvas.height).toBe(0)
})
