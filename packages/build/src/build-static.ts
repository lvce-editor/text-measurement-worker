import { cp, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'
import { buildE2eExtensions } from './buildE2eExtensions.ts'

const sharedProcess = await import('@lvce-editor/shared-process')

process.env.PATH_PREFIX = '/text-measurement-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
  testPath: 'packages/e2e',
})

await buildE2eExtensions()

const rendererWorkerPath = join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

export const getRemoteUrl = (path: string): string => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const content = await readFile(rendererWorkerPath, 'utf8')
const workerPath = join(root, '.tmp/dist/dist/textMeasurementWorkerMain.js')
const remoteUrl = getRemoteUrl(workerPath)

const legacyOccurrence = `// const textMeasurementWorkerUrl = \`\${assetDir}/packages/text-measurement-worker/dist/textMeasurementWorkerMain.js\`
const textMeasurementWorkerUrl = \`${remoteUrl}\``
const legacyReplacement = `const textMeasurementWorkerUrl = \`\${assetDir}/packages/text-measurement-worker/dist/textMeasurementWorkerMain.js\``
const currentOccurrence = `\`${remoteUrl}\``
const currentReplacement = `\`\${assetDir}/packages/text-measurement-worker/dist/textMeasurementWorkerMain.js\``
const runtimeOccurrence = `\`\${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/text-measurement-worker/dist/textMeasurementWorkerMain.js\``
const occurrence = content.includes(legacyOccurrence) ? legacyOccurrence : content.includes(currentOccurrence) ? currentOccurrence : runtimeOccurrence
const replacement = content.includes(legacyOccurrence) ? legacyReplacement : currentReplacement
if (!content.includes(occurrence)) {
  throw new Error('occurrence not found')
}
const newContent = content.replace(occurrence, replacement)
await writeFile(rendererWorkerPath, newContent)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
