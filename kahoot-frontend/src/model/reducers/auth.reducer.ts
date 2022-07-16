import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interface";

// Define a type for the slice state
interface Auth {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

// Define the initial state using that type
const initialState: Auth = {
  id: "",
  name: "",
  email: "",
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    authStart(state: Auth) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
    authSuccess(state: Auth, action: PayloadAction<Auth>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    authFailure(state: Auth, action: PayloadAction<string>) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { authStart, authFailure, authSuccess } = authSlice.actions;
export default authSlice.reducer;
