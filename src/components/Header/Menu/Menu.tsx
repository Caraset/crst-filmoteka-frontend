import React, { EventHandler, useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import style from './Menu.module.css'

import { getIsLoggedIn } from 'redux/auth/authSelector'
import { useSelector } from 'react-redux'
import { useLogOutUserMutation } from 'redux/query/ownApi'
import Button from 'components/Button'

export default function Menu() {
  const [logout] = useLogOutUserMutation()
  const isLoggedIn = useSelector(getIsLoggedIn)

  const logOutHandller: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()

    logout()
  }

  return (
    <ul className={style.list}>
      <li className={style.item}>
        <NavLink
          to={`${isLoggedIn ? '/home' : '/signup'}`}
          className={({ isActive }) =>
            isActive ? `${style.link} ${style.active}` : `${style.link}`
          }
        >
          {`${isLoggedIn ? 'home' : 'signUp'}`}
        </NavLink>
      </li>
      <li className={style.item}>
        <NavLink
          // to="/library"
          to={`${isLoggedIn ? '/library' : '/signin'}`}
          className={({ isActive }) =>
            isActive ? `${style.link} ${style.active}` : `${style.link}`
          }
        >
          {/* my library */}
          {`${isLoggedIn ? 'my library' : 'signIn'}`}
        </NavLink>
      </li>
      {isLoggedIn ? (
        <button type="button" onClick={logOutHandller}>
          logOut
        </button>
      ) : null}
    </ul>
  )
}
