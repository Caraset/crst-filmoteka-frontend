import React from 'react'
import style from './AuthView.module.css'

import AuthForm from 'components/AuthForm'

export default function AuthView() {
  return (
    <div className={style.container}>
      <AuthForm />
    </div>
  )
}
