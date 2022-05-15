import React from 'react'

import style from './Button.module.css'

interface Props {
  text: string
  active: boolean
  clickHandller?: () => void
  theme: 'dark' | 'light'
}

export default function Button({ text, active, clickHandller, theme }: Props) {
  return (
    <button
      onClick={clickHandller}
      className={`${style.button} ${style[theme]} ${
        active ? style.active : ''
      }`}
    >
      {text}
    </button>
  )
}
