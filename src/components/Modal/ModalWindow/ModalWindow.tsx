import React, { useEffect, useState } from 'react'
import { useGetGenresQuery } from 'redux/query/themoviedbApi'
import { MovieI } from 'redux/query/types'
import { ReactComponent as CloseIcon } from 'images/close.svg'
import style from './ModalWindow.module.css'
import ButtonsMenu from './ButtonsMenu'
import { IbuttonOptions } from '__interface__'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from 'redux/auth/authSelector'
import {
  useSaveMovieMutation,
  useGetCurrentUserQuery,
  useRemoveMovieMutation,
  useGetUserMoviesQuery,
} from 'redux/query/ownApi'

interface Props {
  movie: MovieI
  closeModal: () => void
}

export default function ModalWindow({ movie, closeModal }: Props) {
  const { data: genres } = useGetGenresQuery('genres')
  const navigate = useNavigate()
  const isLoggedIn = useSelector(getIsLoggedIn)
  const [isMovieInWatched, setIsMovieInWatched] = useState(false)
  const [isMovieInQueue, setIsMovieInQueue] = useState(false)

  const movieGenres: string[] = movie.genre_ids.map(
    gen => genres?.entities[gen]?.name,
  ) as string[]

  const [saveMovie] = useSaveMovieMutation()
  const [deleteMovie] = useRemoveMovieMutation()

  const { data: user } = useGetCurrentUserQuery()

  useEffect(() => {
    if ((user?.moviesWatched.movies as number[])?.find(id => id === movie.id)) {
      setIsMovieInWatched(true)
    }
    if ((user?.moviesQueue.movies as number[])?.find(id => id === movie.id)) {
      setIsMovieInQueue(true)
    }
  }, [])

  const modalButtonsOptions: IbuttonOptions = {
    leftText: isMovieInWatched ? 'remove from watched' : 'add to watched',
    rightText: isMovieInQueue ? 'remove from queue' : 'add to queue',
    theme: 'dark',
  }

  const closeModalByEsc = (e: KeyboardEvent) => {
    const { key } = e

    if (key !== 'Escape') {
      return
    }

    closeModal()
  }

  const notLoggedRedirect = () => {
    if (!isLoggedIn) {
      navigate('/signin')
      return true
    }

    return false
  }

  const addMovie = (type: 'watched' | 'queue') => {
    switch (type) {
      case 'watched':
        saveMovie({ movie, type })
        setIsMovieInWatched(!isMovieInWatched)
        break
      case 'queue':
        saveMovie({ movie, type })
        setIsMovieInQueue(!isMovieInQueue)
        break
      default:
        break
    }
  }

  const removeMovie = (type: 'watched' | 'queue') => {
    switch (type) {
      case 'watched':
        deleteMovie({ movieId: movie.id, type })
        setIsMovieInWatched(!isMovieInWatched)
        break
      case 'queue':
        deleteMovie({ movieId: movie.id, type })
        setIsMovieInQueue(!isMovieInQueue)
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', closeModalByEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', closeModalByEsc)
      document.body.style.overflow = 'unset'
    }
  })

  return (
    <div className={style.frame}>
      <div className={style.container}>
        <div className={style.poster}>
          <img
            className={style.image}
            srcSet={`https://image.tmdb.org/t/p/w342${movie.poster_path} 342w, https://image.tmdb.org/t/p/w500${movie.poster_path} 500w, https://image.tmdb.org/t/p/w780${movie.poster_path} 780w`}
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt="movie poster"
          />
        </div>
        <div className={style.innerContainer}>
          <div className={style.description}>
            <div className={style.info}>
              <h3 className={style.title}>{movie.original_title}</h3>
              <div className={style.subInfo}>
                <div className={style.row}>
                  <span className={style.left}>Vote / Votes</span>
                  <span className={`${style.right} ${style.votes}`}>
                    <span className={style.average}>{movie.vote_average}</span>
                    &nbsp;/&nbsp;
                    <span className={style.count}>{movie.vote_count}</span>
                  </span>
                </div>
                <div className={style.row}>
                  <span className={style.left}>Popularity</span>
                  <span className={style.right}>
                    {Math.round(movie.popularity * 10) / 10}
                  </span>
                </div>
                <div className={style.row}>
                  <span className={style.left}>Original Title</span>
                  <span className={`${style.right} ${style.subTitle}`}>
                    {movie.original_title}
                  </span>
                </div>
                <div className={style.row}>
                  <span className={style.left}>Genre</span>
                  <span className={style.right}>{movieGenres.join(', ')}</span>
                </div>
              </div>
            </div>
            <div className={style.overview}>
              <h4 className={style.overviewTitle}>about</h4>
              <p className={style.text}>{movie.overview}</p>
            </div>
          </div>
          <ButtonsMenu
            leftBtnActive={isMovieInWatched}
            rightBtnActive={isMovieInQueue}
            buttonsOptions={modalButtonsOptions}
            styleClass={style.buttonsContainer}
            leftBtnFunc={
              !isLoggedIn
                ? () => navigate('/signin')
                : isMovieInWatched
                ? () => {
                    removeMovie('watched')
                    setIsMovieInWatched(false)
                  }
                : () => {
                    addMovie('watched')
                    setIsMovieInWatched(true)
                  }
            }
            rightBtnFunc={
              !isLoggedIn
                ? () => navigate('/signin')
                : isMovieInQueue
                ? () => {
                    removeMovie('queue')
                    setIsMovieInQueue(false)
                  }
                : () => {
                    addMovie('queue')
                    setIsMovieInQueue(true)
                  }
            }
          />
        </div>
      </div>
      <button type="button" className={style.closeBtn} onClick={closeModal}>
        <CloseIcon className={style.closeIcon} />
      </button>
    </div>
  )
}
