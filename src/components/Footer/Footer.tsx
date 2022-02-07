import React from 'react'
import style from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.text}>
        © 2020 | All Rights Reserved | Developed with &#129505; by{' '}
        <span className={style.students}>GoIT Students</span>
      </p>
    </footer>
  )
}
