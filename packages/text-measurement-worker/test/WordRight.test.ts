import { expect, test } from '@jest/globals'
import { wordRight } from '../src/parts/WordRight/WordRight.ts'

test('wordRight - emoji', () => {
  const text = `👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️</title>`
  expect(wordRight(text)).toBe(42)
})

test('wordRight - ascii', () => {
  const text = `abc</title>`
  expect(wordRight(text)).toBe(3)
})
