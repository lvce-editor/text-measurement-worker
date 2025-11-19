/** @jest-environment jsdom */
import { beforeEach, test, expect } from '@jest/globals'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
import * as GetFonts from '../src/parts/GetFonts/GetFonts.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test.skip('getFonts returns globalThis.fonts when available', () => {
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  globalThis.fonts = mockFontFaceSet

  const result = GetFonts.getFonts()
  expect(result).toBe(mockFontFaceSet)

  // @ts-ignore
  delete globalThis.fonts
})

test.skip('getFonts returns document.fonts when globalThis.fonts is not available', () => {
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  globalThis.document = {
    fonts: mockFontFaceSet,
  }

  const result = GetFonts.getFonts()
  expect(result).toBe(mockFontFaceSet)

  // @ts-ignore
  delete globalThis.document
})

test.skip('getFonts prefers globalThis.fonts over document.fonts', () => {
  const mockGlobalFonts = {
    add: () => {},
  } as unknown as FontFaceSet

  const mockDocumentFonts = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  globalThis.fonts = mockGlobalFonts
  // @ts-ignore
  globalThis.document = {
    fonts: mockDocumentFonts,
  }

  const result = GetFonts.getFonts()
  expect(result).toBe(mockGlobalFonts)

  // @ts-ignore
  delete globalThis.fonts
  // @ts-ignore
  delete globalThis.document
})
