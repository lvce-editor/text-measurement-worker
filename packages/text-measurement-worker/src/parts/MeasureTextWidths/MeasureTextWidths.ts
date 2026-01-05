import { measureTextWidth } from '../MeasureTextWidth/MeasureTextWidth.ts'

export const measureTextWidths = (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  isMonoSpaceFont: boolean,
  charWidth: number,
): readonly number[] => {
  const widths = texts.map((text) => {
    return measureTextWidth(text, fontWeight, fontSize, fontFamily, letterSpacing, isMonoSpaceFont, charWidth)
  })
  return widths
}
