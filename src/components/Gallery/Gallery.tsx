import React, { useEffect, useState } from 'react'
import { Transition } from 'react-transition-group'

import { useGetGenresQuery } from 'redux/query/themoviedbApi'
import { EntityState } from '@reduxjs/toolkit'
import type { MovieI, GenreI } from 'types'

import Item from './Item'
import Pagination from './Pagination'
import Modal from 'components/Modal'

import style from './Gallery.module.css'

interface Props {
  movies: MovieI[]
  totalPages: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const moviePlaceHolder: MovieI = {
  poster_path: 'poster path',
  adult: true,
  overview: 'overview of a movie',
  release_date: 'release date',
  genre_ids: [15, 20],
  id: 6969696969,
  original_title: 'movie title',
  original_language: 'english',
  title: 'movie title',
  backdrop_path: null,
  popularity: 54,
  vote_count: 68,
  video: false,
  vote_average: 5.9,
}

const duration = 300

const time = {
  appear: 300,
  enter: 300,
  exit: 200,
}

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
}

export default function Gallery({ movies, totalPages, page, setPage }: Props) {
  const nodeRef = React.useRef(null)

  const [selectedMovie, setSelectedMovie] = useState<MovieI>(moviePlaceHolder)
  const [showModal, setShowModal] = useState(false)
  const [inProp, setInProp] = useState(false)

  const { data } = useGetGenresQuery('genres')

  const openModal = (movie: MovieI) => {
    return () => {
      setSelectedMovie(movie)
      setShowModal(true)
    }
  }

  useEffect(() => {
    setInProp(true)
  }, [movies])

  return (
    <div className={style.container}>
      <Transition in={inProp} nodeRef={nodeRef} timeout={time} appear={true}>
        {state => (
          <ul
            ref={nodeRef}
            className={`${style.list} ${state}`}
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            {movies.map((movie: MovieI) => (
              <li
                className={style.item}
                key={movie.id}
                onClick={openModal(movie)}
              >
                <Item movie={movie} genres={data as EntityState<GenreI>} />
              </li>
            ))}
          </ul>
        )}
      </Transition>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          setAnimation={setInProp}
        />
      )}
      {showModal && (
        <Modal movie={selectedMovie} closeModal={() => setShowModal(false)} />
      )}
    </div>
  )
}
