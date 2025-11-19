import { test, expect } from '@jest/globals'
import * as GetFonts from '../src/parts/GetFonts/GetFonts.ts'
import { mockFonts } from '../src/parts/MockFonts/MockFonts.ts'

test('getFonts returns globalThis.fonts when available', () => {
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  mockFonts({ fonts: mockFontFaceSet })

  const result = GetFonts.getFonts()
  expect(result).toBeDefined()
})

test('getFonts returns document.fonts when globalThis.fonts is not available', () => {
  const mockFontFaceSet = {
    add: () => {},
  } as unknown as FontFaceSet

  // @ts-ignore
  delete globalThis.fonts
  mockFonts({ fonts: mockFontFaceSet, mockDocument: true, useGlobalFonts: false })

  const result = GetFonts.getFonts()
  expect(result).toBeDefined()
})
