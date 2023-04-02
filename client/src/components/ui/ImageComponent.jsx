import React from 'react'
import Image from 'react-bootstrap/Image'

export default function ImageComponent({src}) {
  return (
    <div><Image src={src} responsive /></div>
  )
}
