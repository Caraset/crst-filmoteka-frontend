import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import type { GenreI, MoviesI } from './types'
import { RootState } from 'redux/store'
import { setCredentials, clearCredentials } from 'redux/auth/authSlice'

const { REACT_APP_API_KEY: KEY } = process.env

const genresAdapter = createEntityAdapter<GenreI>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

// Define a service using a base URL and expected endpoints
export const themoviedbApi = createApi({
  reducerPath: 'themoviedbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token

    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`)
    //   }

    //   return headers
    // },
  }),
  tagTypes: ['movies', 'user'],
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
    // signUp: builder.query({
    //   query: ({ email, password }) =>
    //     `search/movie?api_key=${KEY}&page=${password}&query=${email}`,
    // }),
    // registerUser: builder.mutation({
    //   query: user => ({
    //     url: '/users/signup',
    //     method: 'POST',
    //     body: user,
    //   }),
    //   invalidatesTags: ['movies'],
    // }),
    // loginUser: builder.mutation({
    //   query: user => ({
    //     url: '/users/login',
    //     method: 'POST',
    //     body: user,
    //   }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     // try {
    //     //   const respons = await queryFulfilled

    //     //   dispatch(setCredentials(respons.data))
    //     // } catch ({ error }) {
    //     //   return error.status
    //     // }

    //     const respons = await queryFulfilled

    //     dispatch(setCredentials(respons.data))
    //   },
    //   invalidatesTags: ['movies'],
    // }),
    // logOutUser: builder.mutation({
    //   query: () => ({
    //     url: '/users/logout',
    //     method: 'POST',
    //   }),
    //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
    //     await queryFulfilled
    //     dispatch(clearCredentials())
    //   },
    // }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGenresQuery,
  useGetPopularMoviesQuery,
  useSearchMovieByNameQuery,
} = themoviedbApi
