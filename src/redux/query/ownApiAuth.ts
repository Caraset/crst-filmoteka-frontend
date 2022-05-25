import { ownApi } from './ownApi'
import { RootState } from 'redux/store'
import { setCredentials, clearCredentials, setUser } from 'redux/auth/authSlice'

import { IUser } from 'types'

export interface errorResponsApi {
  code: number
  data: {
    message: string
  }
}

const authApi = ownApi.injectEndpoints({
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
    logOutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/users/logout',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(clearCredentials())
      },
      // invalidatesTags: ['user', 'movies'],
    }),
  }),
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogOutUserMutation,
  useGetCurrentUserQuery,
} = authApi
