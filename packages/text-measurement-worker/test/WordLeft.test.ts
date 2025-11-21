import { expect, test } from '@jest/globals'
import { wordLeft } from '../src/parts/WordLeft/WordLeft.ts'

test('wordLeft - emoji', () => {
  const text = `👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️</title>`
  const index = 35
  expect(wordLeft(text, index)).toBe(35)
})

test('wordLeft - ascii', () => {
  const text = `abc</title>`
  const index = 3
  expect(wordLeft(text, index)).toBe(3)
})

test('wordLeft - french accent', () => {
  const text = `cédille`
  const index = 7

  expect(wordLeft(text, index)).toBe(7)
})
