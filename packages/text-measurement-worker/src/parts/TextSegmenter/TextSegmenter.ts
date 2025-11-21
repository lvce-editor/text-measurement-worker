export interface ITextSegmenterAdapter {
  readonly at: (line: string, index: number) => Intl.SegmentData | undefined
  readonly visualIndex: (line: string, index: number) => number
  readonly modelIndex: (line: string, visualIndex: number) => number
  readonly getSegments: (line: string) => Intl.Segments
}

export class TextSegmenterAdapter implements ITextSegmenterAdapter {
  private readonly segmenter: Intl.Segmenter

  constructor() {
    this.segmenter = new Intl.Segmenter()
  }

  at(line: string, index: number): Intl.SegmentData | undefined {
    const segments = this.segmenter.segment(line)
    return segments.containing(index)
  }

  visualIndex(line: string, index: number): number {
    const segments = this.segmenter.segment(line)
    let currentVisualIndex = 0
    for (const segment of segments) {
      if (segment.index >= index) {
        return currentVisualIndex
      }
      currentVisualIndex++
    }
    return currentVisualIndex
  }

  modelIndex(line: string, visualIndex: number): number {
    const segments = this.segmenter.segment(line)
    let currentVisualIndex = 0
    for (const segment of segments) {
      if (currentVisualIndex >= visualIndex) {
        return segment.index
      }
      currentVisualIndex++
    }
    return line.length
  }

  getSegments(line: string): Intl.Segments {
    return this.segmenter.segment(line)
  }
}

export const create = (): ITextSegmenterAdapter => {
  return new TextSegmenterAdapter()
}
