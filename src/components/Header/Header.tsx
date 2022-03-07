import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import style from './Header.module.css'
import Logo from 'components/Logo'
import Container from 'components/Container'
import Menu from './Menu'
import Search from './Search'
import ButtonsMenu from './ButtonsMenu'
import { IbuttonOptions } from '__interface__'

const headerButtonsOptions: IbuttonOptions = {
  leftText: 'watched',
  rightText: 'queue',
  theme: 'light',
}

export default function Header() {
  const loc = useLocation()
  const [isLoged, setIsLoged] = useState(false)

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
          {/* {isLoged ? <Menu /> : <Link to="/signup">Login</Link>} */}
        </div>
        {loc.pathname === '/home' ? (
          <Search />
        ) : (
          <ButtonsMenu
            styleClass={style.buttonsContainer}
            buttonsOptions={headerButtonsOptions}
            currentActive={'left'}
          />
        )}
      </Container>
    </header>
  )
}
