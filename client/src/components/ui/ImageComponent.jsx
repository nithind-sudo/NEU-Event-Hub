import React from 'react'
import Image from 'react-bootstrap/Image'

export default function ImageComponent({src, ...props}) {
  return (
    <div><Image src={src} {...props} responsive="true" /></div>
  )
}
