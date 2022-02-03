import React from 'react'
import style from './Container.module.css'

interface Props {
  children: React.ReactNode
}

export default function Container({ children }: Props) {
  return <div className={style.container}>{children}</div>
}
