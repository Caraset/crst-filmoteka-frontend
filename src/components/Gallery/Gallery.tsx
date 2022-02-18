import React, { useEffect, useState, useRef, useMemo } from 'react'
import {
  Transition,
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group'
import { useGetGenresQuery, useGetPopularMoviesQuery } from 'redux/query/movies'
import { EntityState } from '@reduxjs/toolkit'
import style from './Gallery.module.css'
import Item from './Item'
import Pagination from './Pagination'
import type { MoviesI, MovieI, GenreI } from 'redux/query/types'

interface Props {
  movies: MovieI[]
  totalPages: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
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

  const [inProp, setInProp] = useState(false)
  const { data } = useGetGenresQuery('genres')

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
              <li className={style.item} key={movie.id}>
                <Item movie={movie} genres={data as EntityState<GenreI>} />
              </li>
            ))}
          </ul>
        )}
      </Transition>
      <Pagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
        setAnimation={setInProp}
      />
    </div>
  )
}
