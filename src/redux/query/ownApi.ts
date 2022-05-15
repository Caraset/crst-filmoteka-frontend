import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'redux/store'
import { setCredentials, clearCredentials, setUser } from 'redux/auth/authSlice'
import { IUser } from '__interface__/IUser'
import { MovieI } from './types'
import { MoviesI } from './types'

interface errorResponsApi {
  code: number
  data: {
    message: string
  }
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
  tagTypes: ['movies', 'user'],
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
      invalidatesTags: ['movies'],
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
    // getCurrentUser: builder.query<IUser | string, void>({
    //   async queryFn(__, { getState, dispatch, signal }, _, baseQuery) {
    //     const persistedToken = (getState() as RootState).auth.token

    //     if (persistedToken === null) {
    //       return { data: 'no token' }
    //     }

    //     const respons = await baseQuery('/users/current')

    //     if (respons.error) {
    //       if (
    //         (respons.error.data as { message: string }).message ===
    //         'jwt expired'
    //       ) {
    //         dispatch(clearCredentials())
    //         return { error: respons.error as FetchBaseQueryError }
    //       }

    //       return { error: respons.error as FetchBaseQueryError }
    //     }

    //     const user = respons.data as IUser

    //     if (user) {
    //       dispatch(setUser(user))
    //       return { data: user }
    //     }

    //     return { data: 'no user' }
    //   },
    //   providesTags: ['user'],
    // }),
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
        // body: { movie },
        body: { ...payload },
      }),
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
    }),

    getUserMovies: builder.query<MoviesI, void>({
      query: () => ({
        url: `/movie/user_movies/`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogOutUserMutation,
  useGetCurrentUserQuery,
  useSaveMovieMutation,
  useGetUserMoviesQuery,
  useRemoveMovieMutation,
  // useSaveMovieIdMutation,
} = ownApi
