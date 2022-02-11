import React from 'react'
import Header from 'components/Header'
import Container from 'components/Container'
import Gallery from 'components/Gallery'
import { useGetPopularMoviesQuery } from 'redux/query/movies'
import { MoviesI } from 'redux/query/types'

export default function HomeView() {
  const { data, isFetching } = useGetPopularMoviesQuery({ page: 2, skip: 5 })

  const { results, total_pages: totalPages } = (data as MoviesI) ?? {
    results: [],
    total_pages: 0,
  }

  return (
    <>
      {/* <Header /> */}
      <Container>
        {isFetching ? (
          <div>fetching</div>
        ) : (
          <Gallery movies={results} totalPages={totalPages} />
        )}
        {/* <div>test</div> */}
        {/* <Gallery movies={movies} totalPages={totalPages} /> */}
      </Container>
    </>
  )
}
