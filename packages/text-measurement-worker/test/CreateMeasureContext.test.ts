import { expect, test } from '@jest/globals'
import { createMeasureContext } from '../src/parts/CreateMeasureContext/CreateMeasureContext.ts'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'

test('createMeasureContext returns OffscreenCanvasRenderingContext2D', () => {
  using _ = mockOffscreenCanvas()

  const ctx = createMeasureContext()
  expect(ctx).toBeDefined()
  expect(ctx.canvas).toBeDefined()
})

test('createMeasureContext creates canvas with 0x0 dimensions', () => {
  using _ = mockOffscreenCanvas()

  const ctx = createMeasureContext()
  expect(ctx.canvas.width).toBe(0)
  expect(ctx.canvas.height).toBe(0)
})

test('createMeasureContext throws error when getContext returns null', () => {
  using _ = mockOffscreenCanvas({ '2dContextAvailable': false })

  expect(() => {
    createMeasureContext()
  }).toThrow('Failed to get canvas context 2d')
})
