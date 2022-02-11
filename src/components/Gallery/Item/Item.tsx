import React from 'react'
import { EntityState } from '@reduxjs/toolkit'
import type { GenreI, MovieI } from 'redux/query/types'
import { useGetGenresQuery } from 'redux/query/movies'
import style from './Item.module.css'

interface Props {
  movie: MovieI
  // genres: GenreI[]
  genres: EntityState<GenreI>
}

export default function Item({ movie, genres }: Props) {
  const movieGenres: string[] = movie.genre_ids.map(
    gen => genres?.entities[gen]?.name,
  ) as string[]

  const formatedGen: string =
    movieGenres.length <= 2
      ? (movieGenres.join(', ') as string)
      : ((movieGenres.slice(0, 2).join(', ') + ', Other') as string)

  return (
    <div className={style.container}>
      <img
        className={style.poster}
        srcSet={`https://image.tmdb.org/t/p/w342${movie.poster_path} 342w, https://image.tmdb.org/t/p/w500${movie.poster_path} 500w, https://image.tmdb.org/t/p/w780${movie.poster_path} 780w`}
        src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
        alt="movie poster"
      />
      <div className={style.description}>
        <h2 className={style.title}>{movie.original_title}</h2>
        <p className={style.aditionalInfo}>
          {formatedGen} | {movie.release_date.slice(0, 4)}
        </p>
      </div>
    </div>
  )
}
