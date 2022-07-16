import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../interface/player.model";

// Define a type for the slice state
interface Play {
  pin: string,
  score : number
}

// Define the initial state using that type
const initialState: Play = {
  pin: "",
 score:0
};

export const playSlice = createSlice({
  name: "newQuiz",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    joinGame(state : Play, action : PayloadAction<any>){
        state.pin = action.payload.pin;
        state.score = 0;
    }
  },
});

export const {joinGame } = playSlice.actions;
export default playSlice.reducer;
