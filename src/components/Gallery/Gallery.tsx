import React, { useState } from 'react'
import { useGetGenresQuery, useGetPopularMoviesQuery } from 'redux/query/movies'
import { EntityState } from '@reduxjs/toolkit'
import style from './Gallery.module.css'
import Item from './Item'
import type { MoviesI, MovieI, GenreI } from 'redux/query/types'

interface Props {
  movies: MovieI[]
  totalPages: number
}

export default function Gallery({ movies, totalPages }: Props) {
  const { data } = useGetGenresQuery('genres')

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {movies.map((movie: MovieI) => (
          <li className={style.item} key={movie.id}>
            <Item movie={movie} genres={data as EntityState<GenreI>} />
          </li>
        ))}
      </ul>
    </div>
  )
}
