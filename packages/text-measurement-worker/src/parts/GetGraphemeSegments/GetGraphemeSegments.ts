const simpleAscii = /^[\t -~]*$/

const getBoundaries = (line: string): readonly number[] => {
  // Printable ASCII and tabs have one UTF-16 unit per grapheme. Keep CR/LF
  // and Unicode on the segmenter path (for example CRLF is one grapheme).
  if (simpleAscii.test(line)) {
    return Array.from({ length: line.length + 1 }, (_, index) => index)
  }
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
