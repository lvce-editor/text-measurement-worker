import { beforeEach, test } from '@jest/globals'
import { mockWorkerGlobalRpc } from '@lvce-editor/rpc'
import { mockOffscreenCanvas } from '../src/mockOffscreenCanvas.ts'
import { listen } from '../src/parts/Listen/Listen.ts'

beforeEach(() => {
  mockOffscreenCanvas()
})

test.skip('listen', async () => {
  const { start, dispose } = mockWorkerGlobalRpc()
  const listenPromise = listen()
  start()
  await listenPromise
  dispose()
})
