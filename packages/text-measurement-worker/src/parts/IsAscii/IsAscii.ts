const RE_ASCII = /^[\p{ASCII}]*$/u

export const isAscii = (line: string): boolean => {
  return RE_ASCII.test(line)
}
