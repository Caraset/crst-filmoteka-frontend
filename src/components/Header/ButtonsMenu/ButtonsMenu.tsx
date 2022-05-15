import React, { useEffect, useState } from 'react'
import style from './ButtonsMenu.module.css'
import Button from 'components/Button'
import { IbuttonOptions } from '__interface__'

interface Props {
  styleClass?: string
  currentActive?: 'left' | 'right'
  buttonsOptions: IbuttonOptions
  buttonFunc?: () => boolean | void
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
          clickHandller={() => setCurrent('left')}
          // clickHandller={() => {
          //   const shoudRedirect = buttonFunc()
          //   if (shoudRedirect) {
          //     return
          //   }
          //   setCurrent('left')
          // }}
          theme={buttonsOptions.theme}
        />
        <Button
          text={buttonsOptions.rightText}
          active={current === 'right'}
          clickHandller={() => setCurrent('right')}
          // clickHandller={() => {
          //   const shoudRedirect = buttonFunc()
          //   if (shoudRedirect) {
          //     return
          //   }
          //   setCurrent('right')
          // }}
          theme={buttonsOptions.theme}
        />
      </div>
    </div>
  )
}
