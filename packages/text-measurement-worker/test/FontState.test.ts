import { beforeEach, expect, test } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'
import * as FontState from '../src/parts/FontState/FontState.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test('setPending and getPending - stores and retrieves pending promise', () => {
  const id = 'test-font'
  const { promise, resolve } = Promise.withResolvers<void>()
  resolve()

  FontState.setPending(id, promise)
  const retrieved = FontState.getPending(id)

  expect(retrieved).toBe(promise)

  FontState.removePending(id)
})

test('getPending - returns undefined for non-existent id', () => {
  const id = 'non-existent'
  const result = FontState.getPending(id)

  expect(result).toBeUndefined()
})

test('hasPending - returns true when pending exists', () => {
  const id = 'test-font'
  const { promise, resolve } = Promise.withResolvers<void>()
  resolve()

  FontState.setPending(id, promise)
  expect(FontState.hasPending(id)).toBe(true)

  FontState.removePending(id)
})

test('hasPending - returns false when pending does not exist', () => {
  const id = 'non-existent'
  expect(FontState.hasPending(id)).toBe(false)
})

test('removePending - removes pending promise', () => {
  const id = 'test-font'
  const { promise, resolve } = Promise.withResolvers<void>()
  resolve()

  FontState.setPending(id, promise)
  expect(FontState.hasPending(id)).toBe(true)

  FontState.removePending(id)
  expect(FontState.hasPending(id)).toBe(false)
  expect(FontState.getPending(id)).toBeUndefined()
})

test('setLoaded and isLoaded - stores and checks loaded state', () => {
  const id = 'test-font-loaded-1'

  FontState.setLoaded(id)
  expect(FontState.isLoaded(id)).toBe(true)
})

test('isLoaded - returns undefined for non-existent id', () => {
  const id = 'non-existent-font'
  expect(FontState.isLoaded(id)).toBeUndefined()
})

test('setLoaded - can set multiple fonts as loaded', () => {
  const id1 = 'font-multi-1'
  const id2 = 'font-multi-2'

  FontState.setLoaded(id1)
  FontState.setLoaded(id2)

  expect(FontState.isLoaded(id1)).toBe(true)
  expect(FontState.isLoaded(id2)).toBe(true)
})

test('pending and loaded states are independent', () => {
  const id = 'test-font-independent'
  const { promise, resolve } = Promise.withResolvers<void>()
  resolve()

  FontState.setPending(id, promise)
  FontState.setLoaded(id)

  expect(FontState.hasPending(id)).toBe(true)
  expect(FontState.isLoaded(id)).toBe(true)

  FontState.removePending(id)
})
