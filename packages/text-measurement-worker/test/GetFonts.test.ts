import { test, expect } from '@jest/globals'
import * as GetFonts from '../src/parts/GetFonts/GetFonts.ts'
import { mockFonts } from '../src/parts/MockFonts/MockFonts.ts'

test('getFonts returns globalThis.fonts when available', () => {
  using _ = mockFonts({})

  const result = GetFonts.getFonts()
  expect(result).toBeDefined()
})

test('getFonts returns document.fonts when globalThis.fonts is not available', () => {
  using _ = mockFonts({ mockType: 'document' })

  const result = GetFonts.getFonts()
  expect(result).toBeDefined()
})
