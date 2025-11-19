import * as MeasureTextWidth from '../MeasureTextWidth/MeasureTextWidth.ts'
import * as TextSegmenter from '../TextSegmenter/TextSegmenter.ts'

export const getAccurateColumnIndexUnicode = (
  line: string,
  guess: any,
  averageCharWidth: number,
  eventX: number,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
) => {
  const segmenter = TextSegmenter.create()
  const segments = segmenter.getSegments(line)
  const isMonospaceFont = false
  const charWidth = 0
  for (const segment of segments) {
    const width = MeasureTextWidth.measureTextWidth(
      line.slice(0, segment.index),
      fontWeight,
      fontSize,
      fontFamily,
      letterSpacing,
      isMonospaceFont,
      charWidth,
    )
    if (eventX - width < averageCharWidth) {
      return segment.index
    }
  }
  return line.length
}
