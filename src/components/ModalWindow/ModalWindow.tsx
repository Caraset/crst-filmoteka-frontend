import React, { useEffect } from 'react'
import { useGetGenresQuery } from 'redux/query/themoviedbApi'
import { MovieI } from 'redux/query/types'
import { ReactComponent as CloseIcon } from 'images/close.svg'
import style from './ModalWindow.module.css'
import ButtonsMenu from 'components/Header/ButtonsMenu'
import { IbuttonOptions } from '__interface__'

interface Props {
  movie: MovieI
  closeModal: () => void
}

const modalButtonsOptions: IbuttonOptions = {
  leftText: 'add to watched',
  rightText: 'add to queue',
  theme: 'dark',
}

export default function ModalWindow({ movie, closeModal }: Props) {
  const { data: genres } = useGetGenresQuery('genres')

  const movieGenres: string[] = movie.genre_ids.map(
    gen => genres?.entities[gen]?.name,
  ) as string[]

  const closeModalByEsc = (e: KeyboardEvent) => {
    const { key } = e

    if (key !== 'Escape') {
      return
    }

    closeModal()
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
            buttonsOptions={modalButtonsOptions}
            styleClass={style.buttonsContainer}
          />
        </div>
      </div>
      <button type="button" className={style.closeBtn} onClick={closeModal}>
        <CloseIcon className={style.closeIcon} />
      </button>
    </div>
  )
}
