import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
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

test('createMeasureContext throws error when getContext returns null', () => {
  class MockOffscreenCanvasNullContext {
    width: number = 0
    height: number = 0
    getContext(): null {
      return null
    }
  }
  const originalOffscreenCanvas = globalThis.OffscreenCanvas
  // @ts-expect-error - Overriding global OffscreenCanvas
  globalThis.OffscreenCanvas = MockOffscreenCanvasNullContext as typeof OffscreenCanvas

  expect(() => {
    createMeasureContext()
  }).toThrow('Failed to get canvas context 2d')

  globalThis.OffscreenCanvas = originalOffscreenCanvas
})
