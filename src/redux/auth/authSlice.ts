import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IUser } from '__interface__/IUser'

type AuthState = {
  user: IUser | null
  token: string | null
  isLoggedIn: boolean
  isFetchingCurrentUser: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: IUser; token: string }>,
    ) => {
      state.user = user
      state.token = token
      state.isLoggedIn = true
    },
    clearCredentials: state => {
      state.user = { ...(state.user as IUser), email: null }
      // state.user = { ...state.user, email: null }
      state.token = null
      state.isLoggedIn = false
    },
    setUser: (state, { payload }) => {
      state.user = payload
      state.isLoggedIn = true
    },
  },
})

export const { setCredentials, setUser, clearCredentials } = slice.actions

// export default slice.reducer

const authReducer = slice.reducer

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

export default persistReducer(authPersistConfig, authReducer)
