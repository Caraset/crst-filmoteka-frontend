import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import style from './App.module.css'
import Header from './components/Header'
import Container from './components/Container'
import HomeView from 'views/home'
import LibraryView from 'views/library'
import PublicRoute from 'components/publicRoute'
import Footer from 'components/Footer'

function App() {
  return (
    <div className={style.App}>
      <Header />
      <>
        <Routes>
          <Route path="library" element={<LibraryView />} />
          <Route path="home" element={<HomeView />} />
          <Route path="/" element={<Navigate to={'/home'} />} />
        </Routes>
      </>
      <Footer />
    </div>
  )
}

export default App
