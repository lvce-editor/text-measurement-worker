import { RendererWorker } from '@lvce-editor/rpc-registry'

export * from '../MeasureTextBlockHeight/MeasureTextBlockHeight.ts'

// TODO ask renderer process directly
export const measureTextHeight = async (text: string, fontFamily: string, fontSize: number): Promise<number> => {
	// @ts-ignore
	return RendererWorker.invoke('MeasureTextHeight.measureTextHeight', text, fontFamily, fontSize)
}
