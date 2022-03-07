import type { RootState } from 'redux/store'

export const selectCurrentUser = (state: RootState) => state.auth.user
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
