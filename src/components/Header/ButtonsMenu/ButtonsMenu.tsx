import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
  // const loc = useLocation()
  // console.log(loc)
  const { type } = useParams()

  const [subLibrary, setSubLibrary] = useState<'watched' | 'queue'>('watched')
  // const loc = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    nav(`library/${subLibrary}`)
  }, [subLibrary])

  return (
    <div className={styleClass}>
      <div className={style.innerWrapper}>
        <Button
          text={buttonsOptions.leftText}
          // active={current === 'left'}
          // clickHandller={() => setCurrent('left')}
          active={subLibrary === 'watched'}
          clickHandller={() => setSubLibrary('watched')}
          // clickHandller={() => nav('watched')}
          theme={buttonsOptions.theme}
        />
        <Button
          text={buttonsOptions.rightText}
          // active={current === 'right'}
          // clickHandller={() => setCurrent('right')}
          active={subLibrary === 'queue'}
          clickHandller={() => setSubLibrary('queue')}
          // clickHandller={() => nav('queue')}
          theme={buttonsOptions.theme}
        />
      </div>
    </div>
  )
}
