import React from 'react'
import style from './Logo.module.css'
import { ReactComponent as FilmotekaLogo } from 'images/filmoteka-logo.svg'

export default function Logo() {
  return (
    <div className={style.logo}>
      <FilmotekaLogo className={style.icon} />
    </div>
  )
}
