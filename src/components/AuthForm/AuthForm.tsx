import React, { FormEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSignInMutation, useSignUpMutation } from 'redux/query/ownApi'
import style from './AuthForm.module.css'
import IError from '__interface__/IError'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

export default function AuthForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [fulfilledFrom, setfulfilledForm] = useState(false)

  const loc = useLocation()

  const [signUp, signUpData] = useSignUpMutation()
  const [signIn, signInData] = useSignInMutation()

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()

    switch (loc.pathname) {
      case '/signup':
        const res = await signUp({ email, password })
        if ((res as { error: FetchBaseQueryError }).error) {
          break
        }
        setfulfilledForm(true)
        break
      case '/signin':
        await signIn({ email, password })
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
        <p>Success</p>
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
            {signInData.isError && (
              <p className={style.error}>
                {
                  ((signInData.error as FetchBaseQueryError).data as IError)
                    .message
                }
              </p>
            )}
            {signUpData.isError && (
              <p className={style.error}>
                {
                  ((signUpData.error as FetchBaseQueryError).data as IError)
                    .message
                }
              </p>
            )}
            <button className={style.btn} type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  )
}
