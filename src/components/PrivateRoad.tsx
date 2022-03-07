import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getIsLoggedIn } from 'redux/auth/authSelector'

interface Props {
  children: React.ReactElement
  restricted?: boolean
  redirectTo?: string
}

export default function PrivateRoute({ children, redirectTo = '/' }: Props) {
  const isLoggedIn = useSelector(getIsLoggedIn)
  return isLoggedIn ? children : <Navigate to={redirectTo} />
}
