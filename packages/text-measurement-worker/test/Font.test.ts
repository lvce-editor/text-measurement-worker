import { beforeEach, expect, test } from '@jest/globals'
import * as Font from '../src/parts/Font/Font.ts'
import * as FontState from '../src/parts/FontState/FontState.ts'
import { mockOffscreenCanvas } from '../src/parts/MockOffscreenCanvas/MockOffscreenCanvas.ts'

test('ensure - loads font on first call', async () => {
  const fontName = 'TestFont1'
  const fontUrl = 'url(./test-font.woff2)'

  let loadCalled = false
  const mockFontFace = {
    load: async (): Promise<void> => {
      loadCalled = true
    },
  }

  const mockFonts = {
    add: (): void => {},
  }

  // @ts-ignore
  globalThis.FontFace = class {
    constructor(name: string, url: string) {
      expect(name).toBe(fontName)
      expect(url).toBe(fontUrl)
    }
    load = mockFontFace.load
  }

  // @ts-ignore
  globalThis.fonts = mockFonts

  await Font.ensure(fontName, fontUrl)

  expect(loadCalled).toBe(true)
  expect(FontState.isLoaded(fontName)).toBe(true)

  // Cleanup
  // @ts-ignore
  delete globalThis.FontFace
  // @ts-ignore
  delete globalThis.fonts
  FontState.removePending(fontName)
})

test('ensure - returns immediately if font already loaded', async () => {
  const fontName = 'AlreadyLoadedFont2'
  const fontUrl = 'url(./test-font.woff2)'

  FontState.setLoaded(fontName)

  let loadCalled = false
  // @ts-ignore
  globalThis.FontFace = class {
    load = async (): Promise<void> => {
      loadCalled = true
    }
  }

  await Font.ensure(fontName, fontUrl)

  expect(loadCalled).toBe(false)

  // Cleanup
  // @ts-ignore
  delete globalThis.FontFace
})

test('ensure - returns pending promise if font is already loading', async () => {
  const fontName = 'PendingFont3'
  const fontUrl = 'url(./test-font.woff2)'

  let resolveLoad: () => void
  const loadPromise = new Promise<void>((resolve) => {
    resolveLoad = resolve
  })

  const mockFontFace = {
    load: async (): Promise<void> => {
      await loadPromise
    },
  }

  const mockFonts = {
    add: (): void => {},
  }

  // @ts-ignore
  globalThis.FontFace = class {
    load = mockFontFace.load
  }

  // @ts-ignore
  globalThis.fonts = mockFonts

  const promise1 = Font.ensure(fontName, fontUrl)
  const promise2 = Font.ensure(fontName, fontUrl)

  const pendingPromise = FontState.getPending(fontName)
  expect(pendingPromise).toBeDefined()
  expect(FontState.hasPending(fontName)).toBe(true)

  resolveLoad!()
  await Promise.all([promise1, promise2])

  expect(FontState.hasPending(fontName)).toBe(false)
  expect(FontState.isLoaded(fontName)).toBe(true)

  // Cleanup
  // @ts-ignore
  delete globalThis.FontFace
  // @ts-ignore
  delete globalThis.fonts
  FontState.removePending(fontName)
})

test('ensure - handles load errors', async () => {
  const fontName = 'ErrorFont4'
  const fontUrl = 'url(./test-font.woff2)'

  const mockFontFace = {
    load: async (): Promise<void> => {
      throw new Error('Font load failed')
    },
  }

  // @ts-ignore
  globalThis.FontFace = class {
    load = mockFontFace.load
  }

  // @ts-ignore
  globalThis.fonts = {
    add: () => {},
  } as unknown as FontFaceSet

  await expect(Font.ensure(fontName, fontUrl)).rejects.toThrow('Font load failed')

  expect(FontState.hasPending(fontName)).toBe(true)
  expect(FontState.isLoaded(fontName)).toBeFalsy()

  // Cleanup
  // @ts-ignore
  delete globalThis.FontFace
  // @ts-ignore
  delete globalThis.fonts
  FontState.removePending(fontName)
})
