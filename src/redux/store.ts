import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { themoviedbApi } from './query/themoviedbApi'
import { ownApi } from './query/ownApi'
import searchReducer from './search/searchSlice'
import authReducer from 'redux/auth/authSlice'

export const store = configureStore({
  reducer: {
    [themoviedbApi.reducerPath]: themoviedbApi.reducer,
    [ownApi.reducerPath]: ownApi.reducer,
    search: searchReducer,
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
