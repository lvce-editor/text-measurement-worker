import { expect, test } from '@jest/globals'
import * as Font from '../src/parts/Font/Font.ts'
import * as FontState from '../src/parts/FontState/FontState.ts'
import { mockFonts } from '../src/parts/MockFonts/MockFonts.ts'

test('ensure - loads font on first call', async () => {
  const fontName = 'TestFont1'
  const fontUrl = 'url(./test-font.woff2)'

  let loadCalled = false
  using fonts = mockFonts({
    onLoad: async (): Promise<FontFace> => {
      loadCalled = true
      return {} as FontFace
    },
  })

  await Font.ensure(fontName, fontUrl)

  expect(loadCalled).toBe(true)
  expect(FontState.isLoaded(fontName)).toBe(true)
  expect(fonts.wasFontFaceCreated(fontName, fontUrl)).toBe(true)
  expect(fonts.getAddedFonts().length).toBe(1)

  FontState.removePending(fontName)
})

test('ensure - returns immediately if font already loaded', async () => {
  const fontName = 'AlreadyLoadedFont2'
  const fontUrl = 'url(./test-font.woff2)'

  FontState.setLoaded(fontName)

  let loadCalled = false
  using fonts = mockFonts({
    onLoad: async (): Promise<FontFace> => {
      loadCalled = true
      return {} as FontFace
    },
  })

  await Font.ensure(fontName, fontUrl)

  expect(loadCalled).toBe(false)
  expect(fonts.getFontFaceCalls().length).toBe(0)
})

test('ensure - returns pending promise if font is already loading', async () => {
  const fontName = 'PendingFont3'
  const fontUrl = 'url(./test-font.woff2)'

  const { promise: loadPromise, resolve: resolveLoad } = Promise.withResolvers<void>()

  using fonts = mockFonts({
    onLoad: async (): Promise<FontFace> => {
      await loadPromise
      return {} as FontFace
    },
  })

  const promise1 = Font.ensure(fontName, fontUrl)
  const promise2 = Font.ensure(fontName, fontUrl)

  const pendingPromise = FontState.getPending(fontName)
  expect(pendingPromise).toBeDefined()
  expect(FontState.hasPending(fontName)).toBe(true)

  resolveLoad()
  await Promise.all([promise1, promise2])

  expect(FontState.hasPending(fontName)).toBe(false)
  expect(FontState.isLoaded(fontName)).toBe(true)
  expect(fonts.getFontFaceCalls().length).toBe(1)

  FontState.removePending(fontName)
})

test('ensure - handles load errors', async () => {
  const fontName = 'ErrorFont4'
  const fontUrl = 'url(./test-font.woff2)'

  using fonts = mockFonts({
    onLoad: async (): Promise<FontFace> => {
      throw new Error('Font load failed')
    },
  })

  await expect(Font.ensure(fontName, fontUrl)).rejects.toThrow('Font load failed')

  expect(FontState.hasPending(fontName)).toBe(true)
  expect(FontState.isLoaded(fontName)).toBeFalsy()
  expect(fonts.wasFontFaceCreated(fontName, fontUrl)).toBe(true)

  FontState.removePending(fontName)
})
