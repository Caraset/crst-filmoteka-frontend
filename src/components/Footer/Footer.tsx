import React from 'react'

import style from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.text}>
        © 2022 | All Rights Reserved | Developed with &#129505; by{' '}
        <a
          className={style.link}
          rel="noreferrer"
          referrerPolicy="no-referrer"
          target={'_blank'}
          href="https://github.com/Caraset"
        >
          Valerii
        </a>
      </p>
    </footer>
  )
}
