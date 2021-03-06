/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IQuestion } from "../interface"

// Define a type for the slice state
interface NewQuiz {
	list: IQuestion[]
	title: string
	selected: number
	image: string
}

// Define the initial state using that type
const placeHolderQuestion: IQuestion = {
	id: "1",
	question: "Your question title",
	multipleChoice: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
	answer: 0,
	time: "20",
}
const initialState: NewQuiz = {
	list: [placeHolderQuestion],
	title: "Untitled",
	selected: 0,
	image: "",
}

export const authSlice = createSlice({
	name: "newQuiz",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		addNewQuestion(state: NewQuiz) {
			state.list.push({
				...placeHolderQuestion,
				multipleChoice: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
				id: `${state.list.length + 1}`,
			})
		},
		editQuestionAtIndex(state: NewQuiz, action: PayloadAction<IQuestion>) {
			state.list[state.selected] = {
				...state.list[state.selected],
				...action.payload,
			}
		},
		deleteQuestionAtIndex(state: NewQuiz, action: PayloadAction<number>) {
			if (state.list.length > 1) {
				state.list.splice(action.payload, 1)
			}
			if (state.selected > 0) {
				state.selected = state.selected - 1
			} else {
				state.selected = 0
			}
		},
		dublicateQuestionAtIndex(state: NewQuiz, action: PayloadAction<number>) {
			let duplicateQ = { ...state.list[action.payload] }
			duplicateQ.id = (Number(duplicateQ.id) + 1).toString()
			state.list.splice(action.payload + 1, 0, duplicateQ)
		},
		selectQuestion(state: NewQuiz, action: PayloadAction<number>) {
			state.selected = action.payload
		},
		setTitle(state: NewQuiz, action: PayloadAction<string>) {
			state.title = action.payload
		},
		setImage(state: NewQuiz, action: PayloadAction<string>) {
			state.image = action.payload
		},
	},
})

export const {
	addNewQuestion,
	editQuestionAtIndex,
	deleteQuestionAtIndex,
	dublicateQuestionAtIndex,
	selectQuestion,
	setTitle,
	setImage,
} = authSlice.actions
export default authSlice.reducer
