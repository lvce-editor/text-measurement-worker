const getBoundaries = (line: string): readonly number[] => {
  if (typeof Intl.Segmenter === 'function') {
    // @ts-ignore Intl.Segmenter is not available in all supported runtimes.
    return [...Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(line), ({ index }) => index), line.length]
  }
  const boundaries = [0]
  let index = 0
  for (const segment of line) {
    index += segment.length
    boundaries.push(index)
  }
  return boundaries
}

export const getGraphemeSegments = (lines: readonly string[]): readonly (readonly number[])[] => {
  return lines.map(getBoundaries)
}
