import React, { FormEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { errorI } from 'types'

import { useSignInMutation, useSignUpMutation } from 'redux/query/ownApiAuth'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

import style from './AuthForm.module.css'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fulfilledForm, setfulfilledForm] = useState(false)

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
      {fulfilledForm && loc.pathname === '/signup' ? (
        <p>Success</p>
      ) : (
        <>
          <h2 className={style.title}>
            {loc.pathname === '/signup' ? 'Sign Up' : 'Sign In'}
          </h2>
          <p
            style={{
              fontWeight: '500',
              color: 'red',
              textTransform: 'uppercase',
            }}
          >
            do not use real email and password
          </p>
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
                  ((signInData.error as FetchBaseQueryError).data as errorI)
                    .message
                }
              </p>
            )}
            {signUpData.isError && (
              <p className={style.error}>
                {
                  ((signUpData.error as FetchBaseQueryError).data as errorI)
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
