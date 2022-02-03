import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Header.module.css'
import Logo from 'components/Logo'
import Container from 'components/Container'
import Menu from './Menu'
import Search from './Search'

interface Props {
  children: React.ReactElement
}

export default function Header() {
  return (
    <header className={style.header}>
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
