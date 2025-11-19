/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
interface MockFontsOptions {
  readonly fonts?: FontFaceSet
  readonly FontFaceConstructor?: typeof FontFace
  readonly useGlobalFonts?: boolean
  readonly mockDocument?: boolean
}

export function mockFonts(options: MockFontsOptions = {}): {
  readonly [Symbol.dispose]: () => void
} {
  const { fonts, FontFaceConstructor, useGlobalFonts = true, mockDocument = false } = options

  // Store original values for cleanup
  // @ts-ignore
  const originalFonts = globalThis.fonts
  // @ts-ignore
  const originalDocumentFonts = globalThis.document?.fonts
  // @ts-ignore
  const originalFontFace = globalThis.FontFace
  const documentCreated = mockDocument && !('document' in globalThis)
  const fontFaceWasSet = FontFaceConstructor !== undefined || !('FontFace' in globalThis)

  if (mockDocument && !('document' in globalThis)) {
    Object.defineProperty(globalThis, 'document', {
      value: {
        fonts: undefined,
      },
      writable: true,
      configurable: true,
      enumerable: true,
    })
  }

  if (fonts !== undefined) {
    if (useGlobalFonts) {
      // @ts-ignore - Setting global fonts
      globalThis.fonts = fonts
    } else {
      // @ts-ignore - Setting document fonts
      if (globalThis.document) {
        // @ts-ignore - Setting document fonts
        globalThis.document.fonts = fonts
      }
    }
  }

  if (FontFaceConstructor !== undefined) {
    // @ts-ignore - Setting global FontFace
    globalThis.FontFace = FontFaceConstructor
  } else if (!('FontFace' in globalThis)) {
    // Default mock FontFace constructor
    // @ts-ignore - Setting global FontFace
    globalThis.FontFace = function (): FontFace {
      const mockFontFace = {
        load: async (): Promise<FontFace> => {
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
            globalThis.document.fonts = undefined
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
  }
}
