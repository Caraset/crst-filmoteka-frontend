import React from 'react'
import { useParams } from 'react-router-dom'
import style from './App.module.css'
import Header from './components/Header'
import Container from './components/Container'
import Logo from 'components/Logo'

function App() {
  return (
    <div className={style.App}>
      <Header />
      <Container>
        <div className={style.test}>test</div>
      </Container>
    </div>
  )
}

export default App
