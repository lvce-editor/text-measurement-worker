import { RendererWorker } from '@lvce-editor/rpc-registry'

export * from '../MeasureTextBlockHeight/MeasureTextBlockHeight.ts'

// TODO ask renderer process directly
export const measureTextHeight = async (text: string, fontFamily: string, fontSize: number): Promise<number> => {
<<<<<<< HEAD
	// @ts-ignore
	return RendererWorker.invoke('MeasureTextHeight.measureTextHeight', text, fontFamily, fontSize)
=======
  // @ts-ignore
  return RendererWorker.invoke('MeasureTextHeight.measureTextHeight', text, fontFamily, fontSize)
}

export const measureTextBlockHeight = async (
  text: string,
  fontFamily: string,
  fontSize: number,
  lineHeight: number | string,
  width: number,
): Promise<number> => {
  // TODO 1. create canvas
  // 2. create ctx
  // 3. check if whole text fits into available width
  // 4. if not, split text into words
  // 5. measure each words length
  // 6. do a simple layout algorithm to determine how many lines we need
  // @ts-ignore
  // return RendererProcess.invoke('MeasureTextBlockHeight.measureTextBlockHeight', text, fontSize, fontFamily, lineHeight, width)
  return 100
>>>>>>> origin/main
}
