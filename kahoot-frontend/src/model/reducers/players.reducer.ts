import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuestion } from "../interface";
import { IPlayer } from "../interface/player.model";

// Define a type for the slice state
interface PlayerList {
  players: IPlayer[]
}

// Define the initial state using that type
const initialState: PlayerList= {
  players: []
};

export const authSlice = createSlice({
  name: "newQuiz",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPlayers(state,  action: PayloadAction<IPlayer[]>) {
        state.players = action.payload
    }
  },
});

export const {
    setPlayers
} = authSlice.actions;
export default authSlice.reducer;
