import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

// Define a type for the slice state
interface Auth {
  token: string;
  loading: Boolean;
  error: string;
}

// Define the initial state using that type
const initialState: Auth = {
  token: "",
  loading: false,
  error: ""
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = ""
    },
    authSuccess(state, action : PayloadAction<string>) {
      state.loading = false;
      state.error = "";
      state.token = action.payload;
    },
    authFailure(state, action : PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.token = ""
    }
  },
});

export const { } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.token

export default authSlice.reducer;
