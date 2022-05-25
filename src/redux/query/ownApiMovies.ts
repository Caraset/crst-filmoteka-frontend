import { ownApi } from './ownApi'

import { MovieI, MoviesI } from 'types'

const moviesApi = ownApi.injectEndpoints({
  endpoints: builder => ({
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
  useSaveMovieMutation,
  useRemoveMovieMutation,
  useGetUserMoviesQuery,
  useGetUserQueueMoviesQuery,
  useGetUserWatchedMoviesQuery,
} = moviesApi
