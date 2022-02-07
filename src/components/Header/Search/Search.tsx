import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './Search.module.css'
import { ReactComponent as SearchButton } from 'images/search-icon.svg'
import { change } from 'redux/search/searchSlice'

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
