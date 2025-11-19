/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
interface MockFontFaceCall {
  readonly name: string
  readonly url: string
  readonly options?: FontFaceDescriptors
}

interface MockFontsOptions {
  readonly fonts?: FontFaceSet
  readonly FontFaceConstructor?: typeof FontFace
  readonly mockType?: 'document' | 'global'
  readonly onLoad?: (fontFace: FontFace) => Promise<FontFace> | FontFace
}

export interface MockFontsReturn {
  readonly [Symbol.dispose]: () => void
  readonly getAddedFonts: () => readonly FontFace[]
  readonly getFontFaceCalls: () => readonly MockFontFaceCall[]
  readonly getLoadCalls: () => readonly FontFace[]
  readonly wasLoadCalled: (fontFace: FontFace) => boolean
  readonly wasFontFaceCreated: (name: string, url: string) => boolean
}

export function mockFonts(options: MockFontsOptions = {}): MockFontsReturn {
  const { fonts, FontFaceConstructor, mockType = 'global', onLoad } = options
  const useGlobalFonts = mockType === 'global'
  const mockDocument = mockType === 'document'

  // Store original values for cleanup
  // @ts-ignore
  const originalFonts = globalThis.fonts
  // @ts-ignore
  const originalDocumentFonts = globalThis.document?.fonts
  // @ts-ignore
  const originalFontFace = globalThis.FontFace
  const documentCreated = mockDocument && !('document' in globalThis)
  const fontFaceWasSet = FontFaceConstructor !== undefined || !('FontFace' in globalThis)

  // Track state for query methods
  const addedFonts: FontFace[] = []
  const fontFaceCalls: MockFontFaceCall[] = []
  const loadCalls: FontFace[] = []

  const fontsToUse =
    fonts ??
    ({
      add: (fontFace: FontFace): void => {
        addedFonts.push(fontFace)
      },
    } as FontFaceSet)

  if (mockDocument && !('document' in globalThis)) {
    Object.defineProperty(globalThis, 'document', {
      value: {
        fonts: fontsToUse,
      },
      writable: true,
      configurable: true,
      enumerable: true,
    })
  }

  if (useGlobalFonts) {
    // @ts-ignore - Setting global fonts
    globalThis.fonts = fontsToUse
  } else {
    // @ts-ignore - Setting document fonts
    if (globalThis.document) {
      // @ts-ignore - Setting document fonts
      globalThis.document.fonts = fontsToUse
    }
  }

  if (FontFaceConstructor !== undefined) {
    // @ts-ignore - Setting global FontFace
    globalThis.FontFace = FontFaceConstructor
  } else if (!('FontFace' in globalThis)) {
    // Default mock FontFace constructor
    // @ts-ignore - Setting global FontFace
    globalThis.FontFace = function (name: string, url: string, options?: FontFaceDescriptors): FontFace {
      fontFaceCalls.push({ name, url, options })
      const mockFontFace = {
        load: async (): Promise<FontFace> => {
          loadCalls.push(mockFontFace)
          if (onLoad) {
            return await onLoad(mockFontFace)
          }
          return mockFontFace
        },
      } as FontFace
      return mockFontFace
    } as typeof FontFace
  }

  return {
    [Symbol.dispose]: (): void => {
      // Restore original fonts
      if (useGlobalFonts) {
        if (originalFonts === undefined) {
          // @ts-ignore
          delete globalThis.fonts
        } else {
          // @ts-ignore
          globalThis.fonts = originalFonts
        }
      } else {
        // @ts-ignore
        if (globalThis.document) {
          if (originalDocumentFonts === undefined) {
            // @ts-ignore
            delete globalThis.document.fonts
          } else {
            // @ts-ignore
            globalThis.document.fonts = originalDocumentFonts
          }
        }
      }

      // Restore original FontFace
      if (fontFaceWasSet) {
        if (originalFontFace === undefined) {
          // @ts-ignore
          delete globalThis.FontFace
        } else {
          // @ts-ignore
          globalThis.FontFace = originalFontFace
        }
      }

      // Remove document if we created it
      if (documentCreated) {
        // @ts-ignore
        delete globalThis.document
      }
    },
    getAddedFonts: (): readonly FontFace[] => {
      return addedFonts
    },
    getFontFaceCalls: (): readonly MockFontFaceCall[] => {
      return fontFaceCalls
    },
    getLoadCalls: (): readonly FontFace[] => {
      return loadCalls
    },
    wasLoadCalled: (fontFace: FontFace): boolean => {
      return loadCalls.includes(fontFace)
    },
    wasFontFaceCreated: (name: string, url: string): boolean => {
      return fontFaceCalls.some((call) => call.name === name && call.url === url)
    },
  }
}
