export const listen = async (): Promise<void> => {
   await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  // EditorWorker.set(rpc)
}
