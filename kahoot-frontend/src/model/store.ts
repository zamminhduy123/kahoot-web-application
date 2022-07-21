import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import newQuizReducer from './reducers/newQuiz.reducer'
import gameReducer from './reducers/game.reducer'
import playReducer from './reducers/play.reducer'
import libraryReducer from './reducers/library.reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    newQuiz: newQuizReducer,
    game: gameReducer,
    play: playReducer,
    library: libraryReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch