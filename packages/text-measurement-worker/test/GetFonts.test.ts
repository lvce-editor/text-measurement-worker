import { test, expect } from '@jest/globals'
import * as GetFonts from '../src/parts/GetFonts/GetFonts.ts'
import { mockFonts } from '../src/parts/MockFonts/MockFonts.ts'

test('getFonts returns globalThis.fonts when available', () => {
  mockFonts()
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  globalThis.fonts = mockFontFaceSet

  const result = GetFonts.getFonts()
  expect(result).toBe(mockFontFaceSet)
})

test('getFonts returns document.fonts when globalThis.fonts is not available', () => {
  mockFonts({ mockDocument: true })
  // @ts-ignore
  delete globalThis.fonts
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  document.fonts = mockFontFaceSet

  const result = GetFonts.getFonts()
  expect(result).toBe(mockFontFaceSet)
})
