import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface Auth {
  user: string;
  loading: Boolean;
  error: string;
}

// Define the initial state using that type
const initialState: Auth = {
  user: "",
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
      state.user = action.payload;
    },
    authFailure(state, action : PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.user = ""
    }
  },
});

export const {authStart,authFailure,authSuccess } = authSlice.actions;
export default authSlice.reducer;
