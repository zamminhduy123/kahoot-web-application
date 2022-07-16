import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import newQuizReducer from './reducers/newQuiz.reducer'
import playersReducer from './reducers/players.reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    newQuiz: newQuizReducer,
    player: playersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch