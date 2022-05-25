import React from 'react'
import style from './BackDrop.module.css'

interface Props {
  children: React.ReactElement
  closeModal: () => void
}

export default function BackDrop({ children, closeModal }: Props) {
  const backDropClickHabdle: React.MouseEventHandler<HTMLElement> = e => {
    // e.target not reliable https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
    const targedClass = (e.target as HTMLElement).className

    const backDropClass = e.currentTarget.className

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
