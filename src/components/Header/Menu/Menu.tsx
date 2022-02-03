import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Menu.module.css'

export default function Menu() {
  return (
    <ul className={style.list}>
      <li className={style.item}>
        {/* <NavLink to="home" className={style.link}> */}
        <NavLink
          to="home"
          className={({ isActive }) =>
            isActive ? `${style.link} ${style.active}` : `${style.link}`
          }
        >
          home
        </NavLink>
      </li>
      <li className={style.item}>
        <NavLink
          to="library"
          className={({ isActive }) =>
            isActive ? `${style.link} ${style.active}` : `${style.link}`
          }
        >
          my library
        </NavLink>
      </li>
    </ul>
  )
}
