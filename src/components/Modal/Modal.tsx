import React from 'react'
import style from './Modal.module.css'

import BackDrop from 'components/BackDrop'
import ModalWindow from 'components/ModalWindow'
import { createPortal } from 'react-dom'
import { useGetPopularMoviesQuery } from 'redux/query/themoviedbApi'
import { MovieI } from 'redux/query/types'

const modalRoot = document.querySelector('#modal-root')

interface Props {
  movie: MovieI
  closeModal: () => void
}

export default function Modal({ movie, closeModal }: Props) {
  return createPortal(
    <div className={style.container}>
      <BackDrop closeModal={closeModal}>
        {/* <div className={style.overflowContainer}> */}
        <ModalWindow movie={movie} closeModal={closeModal} />
        {/* </div> */}
      </BackDrop>
    </div>,
    modalRoot as Element,
  )
}
