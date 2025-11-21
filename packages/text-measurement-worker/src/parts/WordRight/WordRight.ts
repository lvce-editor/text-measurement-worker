import * as T from '../TextSegmenter/TextSegmenter.ts'

const wordSeparators = ['.', '/', '?', '\\', '[', ']', '{', '}', '$', '%', '&', '<', '>', '|']

export const wordRight = (text: string): number => {
  const segmenter = T.create({ granularity: 'word' })
  const segments = segmenter.getSegments(text)
  for (const segment of segments) {
    if (wordSeparators.includes(segment.segment)) {
      return segment.index
    }
  }
  return 1
}
