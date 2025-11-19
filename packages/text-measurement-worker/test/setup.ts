// Mock OffscreenCanvas for Node.js environment
class MockOffscreenCanvas {
  width: number
  height: number
  private context: OffscreenCanvasRenderingContext2D | null = null

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  getContext(contextType: '2d'): OffscreenCanvasRenderingContext2D | null {
    if (contextType === '2d' && !this.context) {
      // Create a minimal mock context with measureText support
      const contextObj = {
        canvas: this as unknown as OffscreenCanvas,
        font: '10px monospace',
        letterSpacing: '0px',
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
            width,
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
          } as TextMetrics
        },
      } as OffscreenCanvasRenderingContext2D
      this.context = contextObj
    }
    return this.context
  }
}

// @ts-expect-error - Adding global OffscreenCanvas
globalThis.OffscreenCanvas = MockOffscreenCanvas as typeof OffscreenCanvas
