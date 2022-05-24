import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from 'components/Container'
import Gallery from 'components/Gallery'
import {
  useGetUserMoviesQuery,
  useGetUserQueueMoviesQuery,
  useGetUserWatchedMoviesQuery,
  userLibraryI,
} from 'redux/query/ownApi'
import { MovieI, MoviesI } from 'redux/query/types'

import style from './LibraryView.module.css'

import { TailSpin } from 'react-loader-spinner'

export default function LibraryView() {
  const [page, setPage] = useState<number>(1)

  const { type } = useParams<{ type: 'watched' | 'queue' }>()

  const { data, isFetching } =
    type === 'watched'
      ? useGetUserWatchedMoviesQuery({ page })
      : useGetUserQueueMoviesQuery({ page })

  const { results, total_pages: totalPages } = (data as MoviesI) ?? {
    results: [],
    total_pages: 0,
  }

  return (
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
  )
}
