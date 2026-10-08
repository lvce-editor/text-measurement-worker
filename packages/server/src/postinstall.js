import { cp, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = import.meta.dirname

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const workerPath = join(root, '.tmp', 'dist', 'dist', 'textMeasurementWorkerMain.js')

const staticServerPackagePath = fileURLToPath(new URL('.', import.meta.resolve('@lvce-editor/static-server/package.json')))
const serverStaticPath = join(staticServerPackagePath, 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')
const remoteUrl = getRemoteUrl(workerPath)
if (!content.includes('// const textMeasurementWorkerUrl = ') && !content.includes(remoteUrl)) {
  await cp(rendererWorkerMainPath, rendererWorkerMainPath + '.original')
  const oldOccurrence = `const textMeasurementWorkerUrl = \`\${assetDir}/packages/text-measurement-worker/dist/textMeasurementWorkerMain.js\``
  const currentOccurrence = `\`\${assetDir}/packages/renderer-worker/node_modules/@lvce-editor/text-measurement-worker/dist/textMeasurementWorkerMain.js\``
  const occurrence = content.includes(oldOccurrence) ? oldOccurrence : currentOccurrence
  const replacement = content.includes(oldOccurrence)
    ? `// const textMeasurementWorkerUrl = \`\${assetDir}/packages/text-measurement-worker/dist/textMeasurementWorkerMain.js\`
const textMeasurementWorkerUrl = \`${remoteUrl}\``
    : `\`${remoteUrl}\``
  if (!content.includes(occurrence)) {
    throw new Error('text measurement worker URL occurrence not found')
  }
  const newContent = content.replace(occurrence, replacement)
  await writeFile(rendererWorkerMainPath, newContent)
}
