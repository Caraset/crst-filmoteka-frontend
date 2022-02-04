import React, { useState } from 'react'
import { useGetGenresQuery } from 'redux/query/movies'
import Item from './Item'

interface movieI {
  id: string
}

export default function Gallery() {
  const [movies, setMovies] = useState<movieI[]>([])

  const { data } = useGetGenresQuery()

  console.log('data: ', data)

  return (
    <ul>
      {movies.map((movie: movieI) => (
        <Item key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}
