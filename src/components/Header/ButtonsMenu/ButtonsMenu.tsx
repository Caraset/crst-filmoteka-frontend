import React, { useEffect, useState } from 'react'
import style from './ButtonsMenu.module.css'
import Button from 'components/Button'
import { IbuttonOptions } from '__interface__'

interface Props {
  styleClass?: string
  currentActive?: 'left' | 'right'
  buttonsOptions: IbuttonOptions
  // changeCurrentActive: () => void
}

export default function ButtonsMenu({
  styleClass,
  buttonsOptions,
  currentActive,
}: // changeCurrentActive,
Props) {
  const [current, setCurrent] = useState(currentActive)

  return (
    <div className={styleClass}>
      <div className={style.innerWrapper}>
        <Button
          text={buttonsOptions.leftText}
          active={current === 'left'}
          changeCurrent={() => setCurrent('left')}
          theme={buttonsOptions.theme}
        />
        <Button
          text={buttonsOptions.rightText}
          active={current === 'right'}
          changeCurrent={() => setCurrent('right')}
          theme={buttonsOptions.theme}
        />
      </div>
    </div>
  )
}
