import * as TextSegmenter from '../TextSegmenter/TextSegmenter.ts'

const wordSeparators = ['.', '/', '?', '\\', '[', ']', '{', '}', '$', '%', '&', '<', '>', '|']

export const wordRight = (text: string): number => {
  const segmenter = TextSegmenter.create({ granularity: 'word', localeMatcher: 'best fit' })
  const segments = segmenter.getSegments(text)
  for (const segment of segments) {
    if (wordSeparators.includes(segment.segment)) {
      return segment.index
    }
  }
  return text.length
}
