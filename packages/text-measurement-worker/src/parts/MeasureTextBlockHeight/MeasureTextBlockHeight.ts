import * as Assert from '../Assert/Assert.ts'
import * as CountWrappedLines from '../CountWrappedLines/CountWrappedLines.ts'
import * as GetFontString from '../GetFontString/GetFontString.ts'
import * as GetLineHeight from '../GetLineHeight/GetLineHeight.ts'
import * as GetTextMeasureContext from '../GetTextMeasureContext/GetTextMeasureContext.ts'

export const measureTextBlockHeight = async (
  text: string,
  fontFamily: string,
  fontSize: number,
  lineHeight: number | string,
  width: number,
): Promise<number> => {
  Assert.string(text)
  Assert.string(fontFamily)
  Assert.number(fontSize)
  Assert.number(width)
  const effectiveLineHeight = GetLineHeight.getLineHeight(lineHeight, fontSize)
  const ctx = GetTextMeasureContext.getContext()
  ctx.font = GetFontString.getFontString(400, fontSize, fontFamily)
  const measureText = (value: string): number => ctx.measureText(value).width
  const paragraphs = text.split('\n')
  const lineCount = paragraphs.reduce((total, paragraph) => {
    return total + CountWrappedLines.countWrappedLines(paragraph, width, measureText)
  }, 0)
  return lineCount * effectiveLineHeight
}
