import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import style from './App.module.css'
import Header from './components/Header'
import Container from './components/Container'
import HomeView from 'views/home'
import LibraryView from 'views/library'
import PublicRoute from 'components/publicRoute'

function App() {
  return (
    <div className={style.App}>
      <>
        <Routes>
          <Route path="library" element={<LibraryView />} />
          <Route path="home" element={<HomeView />} />
          <Route path="/" element={<Navigate to={'/home'} />} />
        </Routes>
      </>
    </div>
  )
}
// function App() {
//   return (
//     <div className={style.App}>
// <Header />
// <Container>
//   <div className={style.test}>test</div>
// </Container>
//     </div>
//   )
// }

export default App
