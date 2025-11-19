import { beforeEach, test } from '@jest/globals'
import { mockWorkerGlobalRpc } from '@lvce-editor/rpc'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
import { main } from '../src/parts/Main/Main.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test.skip('main', async () => {
  const { start, dispose } = mockWorkerGlobalRpc()
  const mainPromise = main()
  start()
  await mainPromise
  dispose()
})
