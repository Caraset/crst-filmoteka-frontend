import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import style from './App.module.css'
import Header from './components/Header'
import Container from './components/Container'
import HomeView from 'views/HomeView/HomeView'
import LibraryView from 'views/LibraryView'
// import PublicRoute from 'components/PublicRoute'
import Footer from 'components/Footer'
import { useGetGenresQuery } from 'redux/query/themoviedbApi'
import { useGetCurrentUserQuery } from 'redux/query/ownApi'
import { GenreI } from 'redux/query/types'
import AuthView from 'views/AuthView'
import PrivateRoad from 'components/PrivateRoad'
import PublicRoute from 'components/PublicRoute'

function App() {
  const { isFetching } = useGetCurrentUserQuery()
  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'q') {
        window.scrollTo({ top: document.body.offsetHeight })
      }
      if (e.key === 'w') {
        window.scrollTo({ top: -document.body.offsetHeight })
      }
    })
  }, [])
  return (
    <div className={style.App}>
      <Header />
      <div className={style.wrapper}>
        <Routes>
          <Route
            path="/library/*"
            element={<Navigate to={'/library/watched'} />}
          />
          <Route
            path="/library/:type/*"
            element={
              <PrivateRoad redirectTo="/signin">
                <LibraryView />
                {/* <div>lib</div> */}
              </PrivateRoad>
            }
          />
          <Route path="home" element={<HomeView />} />
          <Route
            path="signup"
            element={
              <PublicRoute restricted={true}>
                <AuthView />
              </PublicRoute>
            }
          />
          <Route
            path="signin"
            element={
              <PublicRoute restricted={true} redirectTo="/library">
                <AuthView />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to={'/home'} />} />
          {/* <Route path="*" element={<div>res</div>} /> */}
          <Route path="/*" element={<div>route</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
