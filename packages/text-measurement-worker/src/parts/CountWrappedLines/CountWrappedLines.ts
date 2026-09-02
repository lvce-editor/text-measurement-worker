export const countWrappedLines = (text: string, width: number, measureText: (text: string) => number): number => {
  if (text === '') {
    return 1
  }
  if (measureText(text) <= width) {
    return 1
  }
  let lineCount = 1
  let currentLine = ''
  const words = text.trim().split(/\s+/)
  for (const word of words) {
    const segments = word.match(/.*?-(?=.)|.+/g) || ['']
    for (let index = 0; index < segments.length; index++) {
      const segment = segments[index]
      const separator = index === 0 && currentLine ? ' ' : ''
      const candidate = `${currentLine}${separator}${segment}`
      if (currentLine && measureText(candidate) > width) {
        lineCount++
        currentLine = segment
        continue
      }
      currentLine = candidate
    }
  }
  return lineCount
}
