import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Logo from 'components/Logo'
import Container from 'components/Container'
import Menu from './Menu'
import Search from './Search'
import ButtonsMenu from './ButtonsMenu'
import { IbuttonOptions } from 'types'
import { getIsLoggedIn } from 'redux/auth/authSelector'

import style from './Header.module.css'

const headerButtonsOptions: IbuttonOptions = {
  leftText: 'watched',
  rightText: 'queue',
  theme: 'light',
}

export default function Header() {
  const loc = useLocation()
  const isLoggedIn = useSelector(getIsLoggedIn)

  return (
    <header
      className={
        loc.pathname === '/home'
          ? `${style.header} ${style.homebg}`
          : `${style.header} ${style.librarybg}`
      }
    >
      <Container>
        <div className={style.menu}>
          <div className={style.logo}>
            <NavLink to="/home" className={style.link}>
              <Logo />
              <span className={style.title}>Filmoteka</span>
            </NavLink>
          </div>
          <Menu />
        </div>
        {loc.pathname === '/home' ? (
          <Search />
        ) : (
          isLoggedIn && (
            <ButtonsMenu
              styleClass={style.buttonsContainer}
              buttonsOptions={headerButtonsOptions}
            />
          )
        )}
      </Container>
    </header>
  )
}
