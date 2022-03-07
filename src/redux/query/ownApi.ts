import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'redux/store'
import { setCredentials, clearCredentials, setUser } from 'redux/auth/authSlice'
import { IUser } from '__interface__/IUser'
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export const ownApi = createApi({
  reducerPath: 'ownApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://crst-filmoteka.herokuapp.com/api',
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
        } catch (error) {
          console.log('error: ', error)
        }
      },
      invalidatesTags: ['movies'],
    }),
    getCurrentUser: builder.query<IUser | string | { message: string }, void>({
      async queryFn(__, { getState, dispatch }, _, baseQuery) {
        const persistedToken = (getState() as RootState).auth.token

        if (persistedToken === null) {
          // throw new Error('no token')
          return { data: { message: 'no token' } }
        }

        const respons = await baseQuery('/users/current')

        if (respons.error) {
          if (
            (respons.error.data as { message: string }).message ===
            'jwt expired'
          ) {
            dispatch(clearCredentials())
            return { error: respons.error as FetchBaseQueryError }
          }

          return { error: respons.error as FetchBaseQueryError }
        }

        // if ((respons.data as { message: string }).message === 'jwt expired') {
        //   dispatch(clearCredentials())
        //   return { data: (respons.data as { message: string }).message }
        // }

        const user = respons.data as IUser

        if (!user) {
          dispatch(setUser(user))
          return { data: user }
        }

        return { data: 'no user' }
      },
      providesTags: ['user'],
    }),
    // getRandomUserPosts: builder.query<Post, void>({
    //   async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
    //     // get a random user
    //     const randomResult = await fetchWithBQ('users/random')
    //     if (randomResult.error) throw randomResult.error
    //     const user = randomResult.data as User
    //     const result = await fetchWithBQ(`user/${user.id}/posts`)
    //     return result.data
    //       ? { data: result.data as Post }
    //       : { error: result.error as FetchBaseQueryError }
    //   },
    // }),
    logOutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(clearCredentials())
      },
    }),
  }),
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogOutUserMutation,
  useGetCurrentUserQuery,
} = ownApi
