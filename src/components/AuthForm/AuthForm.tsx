import React, { FormEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSignInMutation, useSignUpMutation } from 'redux/query/ownApi'
import style from './AuthForm.module.css'

export default function AuthForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fulfilledFrom, setfulfilledForm] = useState(false)

  const loc = useLocation()

  const [signUp] = useSignUpMutation()
  const [signIn] = useSignInMutation()

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    switch (loc.pathname) {
      case '/signup':
        signUp({ email, password })
        setfulfilledForm(true)
        break
      case '/signin':
        signIn({ email, password })
        break
      default:
        break
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className={style.container}>
      {fulfilledFrom && loc.pathname === '/signup' ? (
        <p>Verification mail was sent.</p>
      ) : (
        <>
          <h2 className={style.title}>
            {loc.pathname === '/signup' ? 'Sign Up' : 'Sign In'}
          </h2>
          <form action="" className={style.form} onSubmit={submitHandler}>
            <span className={style.labelContainer}>
              <input
                className={style.input}
                id="email"
                type="email"
                name="email"
                value={email}
                placeholder=" "
                onChange={({ target }) => setEmail(target.value)}
              />
              <label className={style.label} htmlFor="email">
                email<span className={style.dots}>:</span>
              </label>
            </span>
            <span className={style.labelContainer}>
              <input
                className={style.input}
                id="password"
                type="password"
                name="password"
                value={password}
                placeholder=" "
                onChange={({ target }) => setPassword(target.value)}
              />
              <label className={style.label} htmlFor="password">
                password<span className={style.dots}>:</span>
              </label>
            </span>
            <button className={style.btn} type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}
