import { expect, test } from '@jest/globals'
import { wordRight } from '../src/parts/WordRight/WordRight.ts'

test('wordRight - emoji', () => {
  const text = `👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️👮🏽‍♀️</title>`
  expect(wordRight(text)).toBe(35)
})

test('wordRight - ascii', () => {
  const text = `abc</title>`
  expect(wordRight(text)).toBe(3)
})

test('wordRight - french accent', () => {
  const text = `cédille`
  expect(wordRight(text)).toBe(7)
})
