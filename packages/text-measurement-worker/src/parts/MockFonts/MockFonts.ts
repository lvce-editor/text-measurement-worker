/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
interface MockFontsOptions {
  readonly fonts?: FontFaceSet
  readonly FontFaceConstructor?: typeof FontFace
  readonly useGlobalFonts?: boolean
}

export function mockFonts(options: MockFontsOptions = {}): void {
  const { fonts, FontFaceConstructor, useGlobalFonts = true } = options

  if (!('document' in globalThis)) {
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
}
