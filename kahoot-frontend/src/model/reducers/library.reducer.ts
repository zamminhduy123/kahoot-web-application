import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../interface/game.model";
import { IPlayer } from "../interface/player.model";

// Define a type for the slice state
interface Library {
  games: Game[]
}

// Define the initial state using that type
const initialState: Library = {
    games: []
};

export const librarySlice = createSlice({
  name: "newQuiz",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNewLibrary(state : Library, action: PayloadAction<Game[]>){
        state.games = action.payload
    },
  },
});

export const { setNewLibrary } = librarySlice.actions;
export default librarySlice.reducer;
