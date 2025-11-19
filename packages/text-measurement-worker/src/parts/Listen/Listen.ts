import { WebWorkerRpcClient } from '@lvce-editor/rpc'

export const listen = async (): Promise<void> => {
  await WebWorkerRpcClient.create({
    commandMap: {},
  })
}
