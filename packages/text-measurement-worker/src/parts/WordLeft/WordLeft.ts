import * as TextSegmenter from '../TextSegmenter/TextSegmenter.ts'

export const wordLeft = (text: string, index: number): number => {
  const segmenter = TextSegmenter.create({ granularity: 'word', localeMatcher: 'best fit' })
  const segments = segmenter.getSegments(text)
  const reversed = [...segments].toReversed()
  for (const segment of reversed) {
    if (segment.isWordLike && segment.index + segment.segment.length <= index) {
      return segment.segment.length
    }
  }
  return index
}
