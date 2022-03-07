import React from 'react'

import style from './Button.module.css'

interface Props {
  text: string
  active: boolean
  changeCurrent?: () => void
  theme: 'dark' | 'light'
}

export default function Button({ text, active, changeCurrent, theme }: Props) {
  return (
    <button
      onClick={changeCurrent}
      className={`${style.button} ${style[theme]} ${
        active ? style.active : ''
      }`}
    >
      {text}
    </button>
  )
}
