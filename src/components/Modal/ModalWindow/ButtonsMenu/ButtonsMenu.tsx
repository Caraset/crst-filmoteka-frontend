import React from 'react'

import Button from 'components/Button'
import { IbuttonOptions } from 'types'

import style from './ButtonsMenu.module.css'

interface Props {
  styleClass?: string
  buttonsOptions: IbuttonOptions
  leftBtnFunc: () => void
  rightBtnFunc: () => void
  leftBtnActive: boolean
  rightBtnActive: boolean
}

export default function ButtonsMenu({
  styleClass,
  buttonsOptions,
  leftBtnFunc,
  rightBtnFunc,
  leftBtnActive,
  rightBtnActive,
}: Props) {
  return (
    <div className={styleClass}>
      <div className={style.innerWrapper}>
        <Button
          text={buttonsOptions.leftText}
          active={leftBtnActive}
          clickHandller={leftBtnFunc}
          theme={buttonsOptions.theme}
        />
        <Button
          text={buttonsOptions.rightText}
          active={rightBtnActive}
          clickHandller={rightBtnFunc}
          theme={buttonsOptions.theme}
        />
      </div>
    </div>
  )
}
