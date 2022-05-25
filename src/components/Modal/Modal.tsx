import React from 'react'
import { createPortal } from 'react-dom'

import BackDrop from 'components/BackDrop'
import ModalWindow from 'components/Modal/ModalWindow'
import { MovieI } from 'types'

import style from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

interface Props {
  movie: MovieI
  closeModal: () => void
}

export default function Modal({ movie, closeModal }: Props) {
  return createPortal(
    <div className={style.container}>
      <BackDrop closeModal={closeModal}>
        <ModalWindow movie={movie} closeModal={closeModal} />
      </BackDrop>
    </div>,
    modalRoot as Element,
  )
}
