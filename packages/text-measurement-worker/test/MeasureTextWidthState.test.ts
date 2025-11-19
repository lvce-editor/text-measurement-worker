/* eslint-disable unicorn/consistent-function-scoping */
import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
import * as MeasureTextWidthState from '../src/parts/MeasureTextWidthState/MeasureTextWidthState.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('getOrCreate - creates context and returns it', () => {
  let createCallCount = 0
  const createCtx = (): OffscreenCanvasRenderingContext2D => {
    createCallCount++
    const canvas = new OffscreenCanvas(0, 0)
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get canvas context 2d')
    }
    return ctx
  }

  const ctx = MeasureTextWidthState.getOrCreate(createCtx)

  expect(ctx).toBeDefined()
  expect(ctx.canvas).toBeDefined()
})

test('getOrCreate - returns same context on subsequent calls', () => {
  const createCtx = (): OffscreenCanvasRenderingContext2D => {
    const canvas = new OffscreenCanvas(0, 0)
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get canvas context 2d')
    }
    return ctx
  }

  const ctx1 = MeasureTextWidthState.getOrCreate(createCtx)
  const ctx2 = MeasureTextWidthState.getOrCreate(createCtx)
  const ctx3 = MeasureTextWidthState.getOrCreate(createCtx)

  expect(ctx1).toBe(ctx2)
  expect(ctx2).toBe(ctx3)
})

test('getOrCreate - factory function not called when context already exists', () => {
  let createCallCount = 0
  const createCtx = (): OffscreenCanvasRenderingContext2D => {
    createCallCount++
    const canvas = new OffscreenCanvas(0, 0)
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get canvas context 2d')
    }
    return ctx
  }

  MeasureTextWidthState.getOrCreate(createCtx)
  MeasureTextWidthState.getOrCreate(createCtx)
  MeasureTextWidthState.getOrCreate(createCtx)

  expect(createCallCount).toBe(0)
})
