import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../interface/player.model";

// Define a type for the slice state
interface Game {
  pin: string;
  players: IPlayer[];
  title: string;
  ownerName: string;
  totalQuestions: number;
}

// Define the initial state using that type
const initialState: Game = {
  pin: "",
  players: [],
  title: "",
  ownerName: "",
  totalQuestions: 0,
};

export const gameSlice = createSlice({
  name: "newQuiz",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    newPlayerJoin(state, action: PayloadAction<IPlayer>) {
      state.players.push(action.payload);
    },
    setNewGame(state, action: PayloadAction<Game>) {
      state.pin = action.payload.pin;
      state.players = action.payload.players;
      state.title = action.payload.title;
      state.ownerName = action.payload.ownerName;
      state.totalQuestions = action.payload.totalQuestions;
    },
    setPlayerLists(state, action: PayloadAction<IPlayer[]>) {
      state.players = [...action.payload];
    },
    playerLeave(state, action: PayloadAction<string>) {
      state.players = state.players.filter(p => p.name !== action.payload)
    },
  },
});

export const { newPlayerJoin, setNewGame,setPlayerLists,playerLeave } = gameSlice.actions;
export default gameSlice.reducer;
