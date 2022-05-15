// export interface IUser {
//   email: string | null
// }

export interface IUser {
  password?: string
  email?: string | null
  moviesWatched?: string[] | number[]
  moviesQueue?: string[] | number[]
  token?: string | null
  verify?: boolean
  verificationToken?: string | null
}
