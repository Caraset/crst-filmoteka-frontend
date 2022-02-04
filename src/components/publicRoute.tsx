import React from 'react'
// import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// import { getIsLoggedIn } from 'redux/auth/authSelectors'

interface Props {
  children: React.ReactElement
  restricted?: boolean
  redirectTo?: string
}

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = '/home',
}: Props) {
  // const isLoggedIn = useSelector(getIsLoggedIn)
  const isLoggedIn = true
  const shouldRedirect = isLoggedIn && restricted
  return shouldRedirect ? <Navigate to={redirectTo} /> : children
  // return isLoggedIn ? <Navigate to={redirectTo} /> : children
}
