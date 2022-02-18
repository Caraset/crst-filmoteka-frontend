import React, { useState, useEffect, useMemo } from 'react'
import throttle from 'lodash.throttle'
import ReactPaginate from 'react-paginate'
import { ReactComponent as Arrow } from 'images/arrow-left.svg'
import style from './Pagination.module.css'

interface Props {
  totalPages: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Pagination({
  totalPages,
  setPage,
  page,
  setAnimation,
}: Props) {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const throttledHandleResize = throttle((): void => {
    setWidth(window.innerWidth)
  }, 1000)

  useEffect(() => {
    window.addEventListener('resize', throttledHandleResize)
    return () => {
      window.removeEventListener('resize', throttledHandleResize)
    }
  }, [])

  return (
    <ReactPaginate
      breakLabel="..."
      // previousLabel="< "
      // nextLabel=" >"
      previousLabel={<Arrow className={style.prevIcon} />}
      nextLabel={<Arrow className={style.nextIcon} />}
      onPageChange={e => setPage(e.selected + 1)}
      // pageRangeDisplayed={5}
      pageRangeDisplayed={4}
      marginPagesDisplayed={width >= 425 ? 1 : 0}
      pageCount={totalPages}
      // pageCount={0}
      renderOnZeroPageCount={() => null}
      containerClassName={style.list}
      breakClassName={style.dots}
      pageClassName={style.item}
      pageLinkClassName={style.link}
      activeClassName={style.active}
      previousClassName={style.arrovBtn}
      nextClassName={style.arrovBtn}
      disabledClassName={style.disabled}
      forcePage={page - 1}
      onClick={() => {
        window.scrollTo({ top: -window.innerHeight, behavior: 'smooth' })
        setAnimation(false)
      }}
    />
  )
}
