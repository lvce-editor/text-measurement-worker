/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
// Mock OffscreenCanvasRenderingContext2D for Node.js environment
class MockOffscreenCanvasRenderingContext2D {
  canvas: OffscreenCanvas
  font: string = '10px monospace'
  letterSpacing: string = '0px'

  constructor(canvas: OffscreenCanvas) {
    this.canvas = canvas
  }

  measureText(text: string): TextMetrics {
    // Parse font string to get fontSize (format: "weight sizepx family")
    const fontMatch = this.font.match(/(\d+)\s+(\d+)px\s+(.+)/)
    const fontSize = fontMatch ? Number.parseFloat(fontMatch[2]) : 10

    // Parse letterSpacing (format: "Xpx")
    const letterSpacingMatch = this.letterSpacing.match(/(-?\d+(?:\.\d+)?)px/)
    const letterSpacing = letterSpacingMatch ? Number.parseFloat(letterSpacingMatch[1]) : 0

    // Simple approximation: each character width scales with font size
    // Base width is roughly 0.6 * fontSize for most fonts
    const charWidth = fontSize * 0.6
    const textWidth = text.length * charWidth
    // Add letter spacing (multiply by number of gaps between characters)
    const spacingWidth = letterSpacing * Math.max(0, text.length - 1)
    const width = textWidth + spacingWidth

    return {
      actualBoundingBoxAscent: fontSize * 0.625,
      actualBoundingBoxDescent: fontSize * 0.125,
      actualBoundingBoxLeft: 0,
      actualBoundingBoxRight: width,
      alphabeticBaseline: fontSize * 0.5,
      emHeightAscent: fontSize * 0.625,
      emHeightDescent: fontSize * 0.125,
      fontBoundingBoxAscent: fontSize * 0.625,
      fontBoundingBoxDescent: fontSize * 0.125,
      hangingBaseline: fontSize * 0.5,
      ideographicBaseline: fontSize * 0.5,
      width,
    } as TextMetrics
  }
}

interface MockOffscreenCanvasOptions {
  readonly '2dContextAvailable'?: boolean
}

// Mock OffscreenCanvas for Node.js environment
class MockOffscreenCanvas {
  width: number
  height: number
  private context: OffscreenCanvasRenderingContext2D | null = null
  private readonly contextAvailable: boolean

  constructor(width: number, height: number, contextAvailable: boolean = true) {
    this.width = width
    this.height = height
    this.contextAvailable = contextAvailable
  }

  getContext(contextType: '2d'): OffscreenCanvasRenderingContext2D | null {
    if (!this.contextAvailable) {
      return null
    }
    if (contextType === '2d' && !this.context) {
      this.context = new MockOffscreenCanvasRenderingContext2D(this as unknown as OffscreenCanvas) as OffscreenCanvasRenderingContext2D
    }
    return this.context
  }
}

export function mockOffscreenCanvas(options: MockOffscreenCanvasOptions = {}): {
  readonly [Symbol.dispose]: () => void
} {
  const { '2dContextAvailable': contextAvailable = true } = options

  // Store original value for cleanup
  // @ts-ignore
  const originalOffscreenCanvas = globalThis.OffscreenCanvas

  // Create a factory function that uses the options
  const MockOffscreenCanvasWithOptions = class extends MockOffscreenCanvas {
    constructor(width: number, height: number) {
      super(width, height, contextAvailable)
    }
  }

  // @ts-expect-error - Adding global OffscreenCanvas
  globalThis.OffscreenCanvas = MockOffscreenCanvasWithOptions as typeof OffscreenCanvas

  return {
    [Symbol.dispose]: (): void => {
      // Restore original OffscreenCanvas
      if (originalOffscreenCanvas === undefined) {
        // @ts-ignore
        delete globalThis.OffscreenCanvas
      } else {
        // @ts-ignore
        globalThis.OffscreenCanvas = originalOffscreenCanvas
      }
    },
  }
}
