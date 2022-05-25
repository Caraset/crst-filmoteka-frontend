import React from 'react'
import { useDispatch } from 'react-redux'

import { ReactComponent as SearchButton } from 'images/search-icon.svg'
import { change } from 'redux/search/searchSlice'

import style from './Search.module.css'

export default function Search() {
  const dispatch = useDispatch()

  const setSearch = (value: string) => dispatch(change(value))

  return (
    <form className={style.form}>
      <input
        id="search"
        className={style.input}
        type="search"
        placeholder="Поиск фильмов"
        onChange={({ target }) => {
          setSearch(target.value)
        }}
      />
      <button className={style.button} type="submit">
        <SearchButton className={style.icon} />
      </button>
    </form>
  )
}
