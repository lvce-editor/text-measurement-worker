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
    const candidate = currentLine ? `${currentLine} ${word}` : word
    if (measureText(candidate) <= width) {
      currentLine = candidate
      continue
    }
    if (currentLine) {
      lineCount++
      currentLine = ''
    }
    if (measureText(word) <= width) {
      currentLine = word
      continue
    }
    for (const character of word) {
      const characterCandidate = `${currentLine}${character}`
      if (currentLine && measureText(characterCandidate) > width) {
        lineCount++
        currentLine = character
        continue
      }
      currentLine = characterCandidate
    }
  }
  return lineCount
}
