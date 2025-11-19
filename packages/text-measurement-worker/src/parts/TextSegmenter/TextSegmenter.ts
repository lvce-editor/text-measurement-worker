export interface TextSegmenterAdapter {
  readonly at: (line: string, index: number) => Intl.SegmentData | undefined
  readonly visualIndex: (line: string, index: number) => number
  readonly modelIndex: (line: string, visualIndex: number) => number
  readonly getSegments: (line: string) => Intl.Segments
}

export const supported = (): boolean => {
  return 'Segmenter' in Intl
}

export const create = (): TextSegmenterAdapter => {
  const segmenter = new Intl.Segmenter()
  return {
    at(line: string, index: number): Intl.SegmentData | undefined {
      const segments = segmenter.segment(line)
      return segments.containing(index)
    },
    visualIndex(line: string, index: number): number {
      const segments = segmenter.segment(line)
      let currentVisualIndex = 0
      for (const segment of segments) {
        if (segment.index >= index) {
          return currentVisualIndex
        }
        currentVisualIndex++
      }
      return currentVisualIndex
    },
    modelIndex(line: string, visualIndex: number): number {
      const segments = segmenter.segment(line)
      let currentVisualIndex = 0
      for (const segment of segments) {
        if (currentVisualIndex >= visualIndex) {
          return segment.index
        }
        currentVisualIndex++
      }
      return line.length
    },
    getSegments(line: string): Intl.Segments {
      return segmenter.segment(line)
    },
  }
}
