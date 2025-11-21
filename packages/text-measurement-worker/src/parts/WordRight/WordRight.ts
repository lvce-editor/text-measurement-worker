const tryRegexArray = (partialLine: string, regexArray: readonly RegExp[]): number => {
  for (const regex of regexArray) {
    const match = partialLine.match(regex)
    if (match) {
      return match[0].length
    }
  }
  return 1
}

const RE_WORD_RIGHT_1 = /^\s*[\u00C0-\u017F\w]+/i
const RE_WORD_RIGHT_2 = /^[^a-zA-Z\d]+\w*/
const RE_WORD_RIGHT = [RE_WORD_RIGHT_1, RE_WORD_RIGHT_2]

export const wordRight = (text: string): number => {
  return tryRegexArray(text, RE_WORD_RIGHT)
}
