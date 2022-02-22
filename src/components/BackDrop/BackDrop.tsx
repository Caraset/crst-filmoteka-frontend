import React from 'react'
import style from './BackDrop.module.css'

interface Props {
  children: React.ReactElement
  closeModal: () => void
}

export default function BackDrop({ children, closeModal }: Props) {
  const backDropClickHabdle = (e: React.SyntheticEvent<EventTarget>): void => {
    const targedClass = (e.target as HTMLElement).className
    const backDropClass = (e.currentTarget as HTMLElement).className

    if (targedClass !== backDropClass) {
      return
    }

    closeModal()
  }
  return (
    <div className={style.backdrop} onClick={backDropClickHabdle}>
      {children}
    </div>
  )
}
