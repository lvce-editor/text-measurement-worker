const pending = Object.create(null)
const loaded = Object.create(null)

export const setPending = (id: string, promise: Readonly<Promise<void>>): void => {
  pending[id] = promise
}

export const getPending = (id: string): Promise<void> | undefined => {
  return pending[id]
}

export const hasPending = (id: string): boolean => {
  return id in pending
}

export const removePending = (id: string): void => {
  delete pending[id]
}

export const setLoaded = (id: string): void => {
  loaded[id] = true
}

export const isLoaded = (id: string): boolean => {
  return loaded[id]
}
