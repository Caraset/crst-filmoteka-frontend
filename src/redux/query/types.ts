/* eslint-disable */

export interface MoviesI {
  id?: number
  page: number
  results: MovieI[]
  total_results: number
  total_pages: number
}

export interface MovieI {
  poster_path: string | null
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface GenreI {
  id: number
  name: string
}
