import * as Assert from '../Assert/Assert.ts'
import * as GetAccurateColumnIndex from '../GetAccurateColumnIndex/GetAccurateColumnIndex.ts'

export const getPosition = (
  line: string,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  isMonospaceFont: boolean,
  charWidth: number,
  tabSize: number,
  eventX: number,
): number => {
  Assert.string(line)
  Assert.number(eventX)
  const columnIndex = GetAccurateColumnIndex.getAccurateColumnIndex(
    line,
    fontWeight,
    fontSize,
    fontFamily,
    letterSpacing,
    isMonospaceFont,
    charWidth,
    tabSize,
    eventX,
  )
  return columnIndex
}
