import React, { useState } from 'react'
import { useGetGenresQuery } from 'redux/query/movies'
import style from './Gallery.module.css'
import Item from './Item'

interface movieI {
  id: string
}

export default function Gallery() {
  const [movies, setMovies] = useState<movieI[]>([])

  return (
    <div className={style.container}>
      <ul>
        {movies.map((movie: movieI) => (
          <Item key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  )
}
