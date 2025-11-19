/** @jest-environment jsdom */
import { beforeEach, test, expect } from '@jest/globals'
import * as GetFonts from '../src/parts/GetFonts/GetFonts.ts'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'

beforeEach(() => {
  mockOffscreenCanvas()
  // @ts-ignore
  delete globalThis.fonts
})

test('getFonts returns globalThis.fonts when available', () => {
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  globalThis.fonts = mockFontFaceSet

  const result = GetFonts.getFonts()
  expect(result).toBe(mockFontFaceSet)
})

test('getFonts returns document.fonts when globalThis.fonts is not available', () => {
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  document.fonts = mockFontFaceSet

  const result = GetFonts.getFonts()
  expect(result).toBe(mockFontFaceSet)
})
