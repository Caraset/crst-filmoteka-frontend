import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import style from './Header.module.css'
import Logo from 'components/Logo'
import Container from 'components/Container'
import Menu from './Menu'
import Search from './Search'

interface Props {
  children: React.ReactElement
}

export default function Header() {
  const loc = useLocation()

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
        <Search />
      </Container>
    </header>
  )
}
