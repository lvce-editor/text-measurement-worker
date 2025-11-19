import { expect, test } from '@jest/globals'
import * as LoadFont from '../src/parts/LoadFont/LoadFont.ts'

test('loadFont - success', async () => {
  const fontName = 'TestFont'
  const fontUrl = 'url(./test-font.woff2)'
  let fontFaceConstructorCalled = false
  let fontFaceConstructorArgs: any[] = []
  const mockFontFace = {
    load: async () => {},
  }
  const addedFontFaces: any[] = []
  const mockFontFaceSet = {
    add: (fontFace: any) => {
      addedFontFaces.push(fontFace)
    },
  }
  const FontFaceConstructor = function (...args: any[]) {
    fontFaceConstructorCalled = true
    fontFaceConstructorArgs = args
    return mockFontFace
  } as any
  globalThis.FontFace = FontFaceConstructor
  const originalFonts = (globalThis as any).fonts
  ;(globalThis as any).fonts = mockFontFaceSet

  await LoadFont.loadFont(fontName, fontUrl)

  expect(fontFaceConstructorCalled).toBe(true)
  expect(fontFaceConstructorArgs).toEqual([fontName, fontUrl, {}])
  expect(addedFontFaces).toEqual([mockFontFace])
  ;(globalThis as any).fonts = originalFonts
})

test('loadFont - throws error when fontName is not a string', async () => {
  const fontName = 123 as any
  const fontUrl = 'url(./test-font.woff2)'

  await expect(LoadFont.loadFont(fontName, fontUrl)).rejects.toThrow()
})

test('loadFont - throws error when fontUrl is not a string', async () => {
  const fontName = 'TestFont'
  const fontUrl = 123 as any

  await expect(LoadFont.loadFont(fontName, fontUrl)).rejects.toThrow()
})

test('loadFont - throws error when fontName starts with quotes', async () => {
  const fontName = "'TestFont"
  const fontUrl = 'url(./test-font.woff2)'

  await expect(LoadFont.loadFont(fontName, fontUrl)).rejects.toThrow('font name is not allowed start with quotes')
})

test('loadFont - throws VError when FontFace.load fails', async () => {
  const fontName = 'TestFont'
  const fontUrl = 'url(./test-font.woff2)'
  const loadError = new Error('Failed to load font file')
  const mockFontFace = {
    load: async () => {
      throw loadError
    },
  }
  const mockFontFaceSet = {
    add: () => {},
  }
  const FontFaceConstructor = function () {
    return mockFontFace
  } as any
  globalThis.FontFace = FontFaceConstructor
  const originalFonts = (globalThis as any).fonts
  ;(globalThis as any).fonts = mockFontFaceSet

  await expect(LoadFont.loadFont(fontName, fontUrl)).rejects.toThrow('Failed to load font TestFont')
  ;(globalThis as any).fonts = originalFonts
})
