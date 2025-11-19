export const createMeasureContext = (): OffscreenCanvasRenderingContext2D => {
  const canvas = new OffscreenCanvas(0, 0)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to get canvas context 2d')
  }
  return ctx
}
