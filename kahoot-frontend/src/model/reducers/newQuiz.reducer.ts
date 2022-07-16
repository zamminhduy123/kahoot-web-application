import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion } from "../interface";

// Define a type for the slice state
interface NewQuiz {
  list: IQuestion[];
  title: string;
  selected: number;
}

// Define the initial state using that type
const placeHolderQuestion: IQuestion = {
  id: "1",
  question: "",
  multipleChoice: [],
  answer: 0,
  time: "20",
};
const initialState: NewQuiz = {
  list: [placeHolderQuestion],
  title: "",
  selected: 0,
};

export const authSlice = createSlice({
  name: "newQuiz",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNewQuestion(state) {
      state.list.push({...placeHolderQuestion,id: `${state.list.length+1}`});
    },
    editQuestionAtIndex(state, action: PayloadAction<IQuestion>) {
      state.list[state.selected] = action.payload;
    },
    deleteQuestionAtIndex(state, action: PayloadAction<number>) {
      if (state.list.length > 1) state.list.splice(action.payload, 1);
    },
    dublicateQuestionAtIndex(state, action: PayloadAction<number>) {
      state.list.splice(action.payload + 1, 0, state.list[action.payload]);
    },
    selectQuestion(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const {
  addNewQuestion,
  editQuestionAtIndex,
  deleteQuestionAtIndex,
  dublicateQuestionAtIndex,
  selectQuestion,
  setTitle,
} = authSlice.actions;
export default authSlice.reducer;
