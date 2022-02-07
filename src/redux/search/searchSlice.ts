import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface searchState {
  input: string
}

const initialState = { input: '' } as searchState

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state.input = action.payload
    },
  },
})

export const { change } = searchSlice.actions
export default searchSlice.reducer
