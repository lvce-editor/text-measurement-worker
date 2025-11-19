let ctx: OffscreenCanvasRenderingContext2D | undefined

export const getOrCreate = (createCtx: () => OffscreenCanvasRenderingContext2D): OffscreenCanvasRenderingContext2D => {
  if (ctx) {
    return ctx
  }
  ctx = createCtx()
  return ctx
}
