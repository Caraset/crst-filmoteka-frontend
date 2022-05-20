// export interface IUser {
//   email: string | null
// }

export interface IUser {
  // password?: string
  email: string | null
  moviesQueue: {
    movies: number[]
    totalMovies: number
  }
  moviesWatched: {
    movies: number[]
    totalMovies: number
  }
  token: string | null
  verify?: boolean
  verificationToken?: string | null
}
