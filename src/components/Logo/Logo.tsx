import React from 'react'

import { ReactComponent as FilmotekaLogo } from 'images/filmoteka-logo.svg'

import style from './Logo.module.css'

export default function Logo() {
  return (
    <div className={style.logo}>
      <FilmotekaLogo className={style.icon} />
    </div>
  )
}
