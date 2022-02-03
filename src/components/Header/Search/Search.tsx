import React from 'react'
import style from './Search.module.css'
import { ReactComponent as SearchButton } from 'images/search-icon.svg'

export default function Search() {
  return (
    <form className={style.form}>
      <input
        id="search"
        className={style.input}
        type="search"
        placeholder="Поиск фильмов"
      />
      <button className={style.button} type="submit">
        <SearchButton className={style.icon} />
      </button>
    </form>
  )
}
