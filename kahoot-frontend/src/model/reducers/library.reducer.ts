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
    deleteGameById(state:Library,action: PayloadAction<string>){
        const index = state.games.findIndex(g => g._id === action.payload)
        if (index >= -1) {
            state.games = [
                ...state.games.slice(0,index),
                ...state.games.slice(index+1)
            ]
        }
    },
  },
});

export const { setNewLibrary,deleteGameById} = librarySlice.actions;
export default librarySlice.reducer;
