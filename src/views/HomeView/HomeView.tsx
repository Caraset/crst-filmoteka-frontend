import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Container from 'components/Container'
import Gallery from 'components/Gallery'
import {
  useGetPopularMoviesQuery,
  useSearchMovieByNameQuery,
} from 'redux/query/themoviedbApi'
import { MoviesI } from 'types'
import { getSearchValue } from 'redux/selectors'

import style from './HomeView.module.css'

export default function HomeView() {
  const [page, setPage] = useState(1)
  const { input: name } = useSelector(getSearchValue)

  useEffect(() => {
    setPage(1)
  }, [name])

  const { data, isFetching } =
    name.length === 0
      ? useGetPopularMoviesQuery(page)
      : useSearchMovieByNameQuery({ name, page })

  const { results, total_pages: totalPages } = (data as MoviesI) ?? {
    results: [],
    total_pages: 0,
  }

  return (
    <>
      <Container>
        <div className={style.wrapper}>
          {isFetching ? (
            <div className={style.loadingContainer}>
              <TailSpin color="#ff6b08" height={100} width={100} />
            </div>
          ) : (
            <>
              {results.length < 1 ? (
                <div className={style.textPlaceHolderContainer}>
                  <p className={style.textPlaceHolder}>Nothing found... :(</p>
                </div>
              ) : (
                <Gallery
                  movies={results}
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                />
              )}
            </>
          )}
        </div>
      </Container>
    </>
  )
}
