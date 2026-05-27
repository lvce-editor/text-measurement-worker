export const getLineHeight = (lineHeight: number | string, fontSize: number): number => {
  if (typeof lineHeight === 'number') {
    return lineHeight
  }
  const parsed = Number.parseFloat(lineHeight)
  if (Number.isFinite(parsed)) {
    return parsed
  }
  return fontSize
}
