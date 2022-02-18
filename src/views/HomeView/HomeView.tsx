import React, { useState } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import Container from 'components/Container'
import Gallery from 'components/Gallery'
import { useGetPopularMoviesQuery } from 'redux/query/movies'
import { MoviesI } from 'redux/query/types'
import style from './HomeView.module.css'

const duration = 5000

export default function HomeView() {
  const [page, setPage] = useState<number>(1)
  const [inProp, setInProp] = useState(false)
  const { data, isFetching } = useGetPopularMoviesQuery(page)

  const { results, total_pages: totalPages } = (data as MoviesI) ?? {
    results: [],
    total_pages: 0,
  }

  return (
    <>
      <Container>
        <div className={style.wrapper}>
          {isFetching ? (
            <div>fetching</div>
          ) : (
            <Gallery
              movies={results}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </Container>
    </>
  )

  // return (
  //   <>
  //     <Container>
  //       <div className={style.wrapper}>
  //         {isFetching ? (
  //           <div>fetching</div>
  //         ) : (
  //           <Transition
  //             in={inProp}
  //             timeout={duration}
  //             onEntering={() => setInProp(true)}
  //           >
  //             {state => (
  //               <div className={state}>
  //                 <Gallery
  //                   movies={results}
  //                   totalPages={totalPages}
  //                   page={page}
  //                   setPage={setPage}
  //                 />
  //               </div>
  //             )}
  //           </Transition>
  //         )}
  //       </div>
  //     </Container>
  //   </>
  // )
}
