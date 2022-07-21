/** @format */

export type IMultipleChoice = string[]
export interface IQuestion {
	id: string
	question: string
	multipleChoice: string[]
	answer: number
	time: string
	image?: string
}
