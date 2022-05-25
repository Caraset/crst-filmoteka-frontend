import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import { IbuttonOptions } from 'types'

import style from './ButtonsMenu.module.css'

interface Props {
  styleClass?: string
  buttonsOptions: IbuttonOptions
  buttonFunc?: () => boolean | void
}

export default function ButtonsMenu({ styleClass, buttonsOptions }: Props) {
  const [subLibrary, setSubLibrary] = useState<'watched' | 'queue'>('watched')
  const nav = useNavigate()

  useEffect(() => {
    nav(`library/${subLibrary}`)
  }, [subLibrary])

  return (
    <div className={styleClass}>
      <div className={style.innerWrapper}>
        <Button
          text={buttonsOptions.leftText}
          active={subLibrary === 'watched'}
          clickHandller={() => setSubLibrary('watched')}
          theme={buttonsOptions.theme}
        />
        <Button
          text={buttonsOptions.rightText}
          active={subLibrary === 'queue'}
          clickHandller={() => setSubLibrary('queue')}
          theme={buttonsOptions.theme}
        />
      </div>
    </div>
  )
}
