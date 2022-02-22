import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import type { GenreI, MoviesI } from './types'

const { REACT_APP_API_KEY: KEY } = process.env

const genresAdapter = createEntityAdapter<GenreI>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: builder => ({
    getGenres: builder.query<EntityState<GenreI>, string>({
      query: () => `genre/movie/list?api_key=${KEY}&language=en-US`,
      transformResponse: (response: { genres: GenreI[] }) => {
        const { genres } = response
        return genresAdapter.addMany(genresAdapter.getInitialState(), genres)
      },
    }),
    getPopularMovies: builder.query<MoviesI, number>({
      query: page => `trending/movie/day?api_key=${KEY}&page=${page}`,
    }),
    searchMovieByName: builder.query<MoviesI, { page: number; name: string }>({
      query: ({ name, page }) =>
        `search/movie?api_key=${KEY}&page=${page}&query=${name}`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
  useSearchMovieByNameQuery,
} = moviesApi
