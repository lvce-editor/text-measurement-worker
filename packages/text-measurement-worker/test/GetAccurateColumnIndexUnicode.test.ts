import { expect, test } from '@jest/globals'
import * as GetAccurateColumnIndexUnicode from '../src/parts/GetAccurateColumnIndexUnicode/GetAccurateColumnIndexUnicode.ts'

test.skip('getAccurateColumnIndexUnicode with simple text', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('abc', 0, 6, 10, 400, 10, 'monospace', 0)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThanOrEqual(3)
})

test.skip('getAccurateColumnIndexUnicode with empty string', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('', 0, 6, 0, 400, 10, 'monospace', 0)
  expect(result).toBe(0)
})

test.skip('getAccurateColumnIndexUnicode with eventX at start', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('hello', 0, 6, 0, 400, 10, 'monospace', 0)
  expect(result).toBe(0)
})

test.skip('getAccurateColumnIndexUnicode with eventX beyond text', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('abc', 0, 6, 1000, 400, 10, 'monospace', 0)
  expect(result).toBe(3)
})

test.skip('getAccurateColumnIndexUnicode with unicode characters', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('你好', 0, 6, 20, 400, 10, 'monospace', 0)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThanOrEqual(2)
})

test.skip('getAccurateColumnIndexUnicode with emoji', () => {
  const emoji = '👮🏽‍♀️'
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode(emoji, 0, 6, 20, 400, 10, 'monospace', 0)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThanOrEqual(emoji.length)
})

test.skip('getAccurateColumnIndexUnicode with mixed text and emoji', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('hello👮🏽‍♀️world', 0, 6, 30, 400, 10, 'monospace', 0)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThanOrEqual('hello👮🏽‍♀️world'.length)
})

test.skip('getAccurateColumnIndexUnicode with different averageCharWidth', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('hello', 0, 12, 30, 400, 10, 'monospace', 0)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThanOrEqual(5)
})

test.skip('getAccurateColumnIndexUnicode with single character', () => {
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode('a', 0, 6, 5, 400, 10, 'monospace', 0)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThanOrEqual(1)
})

test.skip('getAccurateColumnIndexUnicode with long text', () => {
  const longText = 'a'.repeat(100)
  const result = GetAccurateColumnIndexUnicode.getAccurateColumnIndexUnicode(longText, 0, 6, 300, 400, 10, 'monospace', 0)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThanOrEqual(100)
})
