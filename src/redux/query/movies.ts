import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GenreI, MoviesI } from './types'

const { REACT_APP_API_KEY: KEY } = process.env

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: builder => ({
    getGenres: builder.query<GenreI[], void>({
      query: () => `genre/movie/list?api_key=${KEY}&language=en-US`,
    }),
    getPopularMovies: builder.query<MoviesI[], void>({
      query: () => 'movie/popular',
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetGenresQuery, useGetPopularMoviesQuery } = moviesApi
