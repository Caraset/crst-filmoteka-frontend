import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import HomeView from 'views/HomeView/HomeView'
import LibraryView from 'views/LibraryView'
import AuthView from 'views/AuthView'

import Header from './components/Header'
import Footer from 'components/Footer'
import PrivateRoad from 'components/PrivateRoad'
import PublicRoute from 'components/PublicRoute'
import { useGetCurrentUserQuery } from 'redux/query/ownApiAuth'

import style from './App.module.css'

function App() {
  useGetCurrentUserQuery()

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
          <Route path="/*" element={<div>route</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
