import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { themoviedbApi } from './query/themoviedbApi'
import { ownApi } from './query/ownApi'
import searchReducer from './search/searchSlice'
import authReducer from 'redux/auth/authSlice'

const persistConfig = {
  key: 'genres',
  storage,
  whitelist: ['genres'],
}

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

export const store = configureStore({
  reducer: {
    [themoviedbApi.reducerPath]: themoviedbApi.reducer,
    [ownApi.reducerPath]: ownApi.reducer,
    search: searchReducer,
    // auth: persistReducer<Reducer>(authPersistConfig, authReducer),
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    themoviedbApi.middleware,
    ownApi.middleware,
  ],
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
