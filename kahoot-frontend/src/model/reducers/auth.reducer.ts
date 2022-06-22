import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interface';

// Define a type for the slice state
interface Auth {
  id: string,
  name: string,
  email: string,
}

// Define the initial state using that type
const initialState: Auth = {
  id: "",
  name: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    authStart(state) {
      state.id = ""
      state.name = ""
      state.email = ""
    },
    authSuccess(state, action : PayloadAction<IUser>) {
      state.id = action.payload.id;
      state.name =  action.payload.name;
      state.email =  action.payload.email;
    },
    authFailure(state, action : PayloadAction<string>) {
      state.id = ""
      state.name = ""
      state.email = ""
    }
  },
});

export const {authStart,authFailure,authSuccess } = authSlice.actions;
export default authSlice.reducer;
