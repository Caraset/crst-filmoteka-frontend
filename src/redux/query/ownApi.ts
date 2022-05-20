import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'redux/store'
import { setCredentials, clearCredentials, setUser } from 'redux/auth/authSlice'
import { IUser } from '__interface__/IUser'
import { MovieI } from './types'
import { MoviesI } from './types'

export interface errorResponsApi {
  code: number
  data: {
    message: string
  }
}

export interface userLibraryI {
  moviesLibrary: { moviesWatched: number[]; moviesQueue: number[] }
  page: number
  total_pages: number
}

export const ownApi = createApi({
  reducerPath: 'ownApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://crst-filmoteka.herokuapp.com/api',
    baseUrl: 'http://localhost:6969/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['movies', 'user', 'watchedMovies', 'queueMovies'],
  endpoints: builder => ({
    signUp: builder.mutation({
      query: user => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['movies'],
    }),
    signIn: builder.mutation({
      query: user => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(setCredentials(data))
        } catch (error) {}
      },
      invalidatesTags: ['movies', 'user'],
    }),
    getCurrentUser: builder.query<IUser, void>({
      query: () => '/users/current',
      providesTags: ['user'],

      onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
        try {
          const persistedToken = (getState() as RootState).auth.token
          if (!persistedToken) {
            throw new Error('no token')
          }
          const { data: user } = await queryFulfilled
          dispatch(setUser(user))
        } catch ({ error }) {
          const errorMessage = (error as errorResponsApi)?.data?.message
          if (errorMessage === 'jwt expired') {
            dispatch(clearCredentials())
          }
        }
      },
    }),
    logOutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(clearCredentials())
      },
    }),
    saveMovie: builder.mutation<
      void,
      { movie: MovieI; type: 'watched' | 'queue' }
    >({
      query: payload => ({
        url: '/movie/save',
        method: 'POST',
        body: { ...payload },
      }),
      invalidatesTags: ['user', 'watchedMovies', 'queueMovies'],
    }),
    removeMovie: builder.mutation<
      void,
      { movieId: number; type: 'watched' | 'queue' }
    >({
      query: payload => ({
        url: '/movie/delete',
        method: 'DELETE',
        body: { ...payload },
      }),
      invalidatesTags: ['user', 'queueMovies', 'watchedMovies'],
    }),

    getUserMovies: builder.query<
      MoviesI,
      { page: number; type: 'watched' | 'queue' | undefined }
    >({
      query: ({ page, type }) => ({
        url: `/movie?page=${page}&type=${type}`,
        method: 'GET',
      }),
      providesTags: ['movies'],
    }),
    getUserWatchedMovies: builder.query<
      MoviesI,
      { page: number; limit?: number }
    >({
      query: ({ page }) => ({
        url: `/movie/watched?page=${page}`,
        method: 'GET',
        // body: { ...payload },
      }),
      providesTags: ['watchedMovies'],
    }),
    getUserQueueMovies: builder.query<
      MoviesI,
      { page: number; limit?: number }
    >({
      query: ({ page }) => `/movie/queue?page=${page}`,
      providesTags: ['queueMovies'],
    }),
  }),
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogOutUserMutation,
  useGetCurrentUserQuery,
  useSaveMovieMutation,
  useRemoveMovieMutation,
  useGetUserMoviesQuery,
  useGetUserQueueMoviesQuery,
  useGetUserWatchedMoviesQuery,
} = ownApi
