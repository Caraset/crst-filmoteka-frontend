import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'redux/store'

const { REACT_APP_BASE_URL: BASE_URL } = process.env

export interface userLibraryI {
  moviesLibrary: { moviesWatched: number[]; moviesQueue: number[] }
  page: number
  total_pages: number
}

export const ownApi = createApi({
  reducerPath: 'ownApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['movies', 'user', 'watchedMovies', 'queueMovies'],
  endpoints: () => ({}),
})
