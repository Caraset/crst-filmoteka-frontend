import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import style from './App.module.css'
import Header from './components/Header'
import Container from './components/Container'
import HomeView from 'views/HomeView/HomeView'
import LibraryView from 'views/library'
import PublicRoute from 'components/publicRoute'
import Footer from 'components/Footer'
import { useGetGenresQuery } from 'redux/query/movies'
import { GenreI } from 'redux/query/types'

function App() {
  return (
    <div className={style.App}>
      <Header />
      <div className={style.wrapper}>
        <Routes>
          <Route path="library" element={<LibraryView />} />
          <Route path="home" element={<HomeView />} />
          <Route path="/" element={<Navigate to={'/home'} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
