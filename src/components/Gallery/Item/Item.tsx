import React from 'react'

interface Props {
  movie: object
}

export default function Item({ movie }: Props) {
  return <li>{movie}</li>
}
