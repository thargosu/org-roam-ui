/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Image from 'next/image'
import path from 'path'
import { Container } from '@chakra-ui/react'
//import '../../../public/placeholder.png'

const convertToNextImageAttr = (value: string | number | undefined): number | undefined => {
  if (value === undefined) {
    return undefined
  }

  if (typeof value === 'number' || !isNaN(Number(value))) {
    return Number(value)
  }

  if (value.endsWith('px')) {
    return Number(value.replace('px', ''))
  }

  return undefined
}

export interface OrgImageProps {
  org: React.ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>
  file: string
}

export const OrgImage = (props: OrgImageProps) => {
  const { org, file } = props
  const { src, ...attr } = org

  if (!src) {
    return null
  }

  const dumbLoader = ({ src, width, quality }: { [key: string]: string | number }) => {
    return `${src}`
  }
  const homeLoader = ({ src, width, quality }: { [key: string]: string | number }) => {
    return `img/${src}`
  }

  if (src?.startsWith("file:")) {
    const srcName = src.replace(/file:/g, './')
    const attrWidth = convertToNextImageAttr(attr.width)
    const attrHeight = convertToNextImageAttr(attr.height)
    const layout = attrWidth || attrHeight ? undefined : "responsive"
    return (
      <Image
        {...attr}
        layout={layout}
        loader={dumbLoader}
        src={srcName}
        width={attrWidth}
        height={attrHeight}
        alt={attr.alt ?? "Wow, an image."}
      />
    )
  }

  if (/(http)?.*/g.test(src.replace(/(http)?.*/g, '$1'))) {
    const attrWidth = convertToNextImageAttr(attr.width)
    const attrHeight = convertToNextImageAttr(attr.height)
    const layout = attrWidth || attrHeight ? undefined : "responsive"
    return (
      <Image
        {...attr}
        layout={layout}
        loader={dumbLoader}
        src={src}
        width={attrWidth}
        height={attrHeight}
        alt={attr.alt ?? "Wow, an image."}
      />
    )
  }

  const srcName = src.replace(/file:/g, '')

  const dir = path.dirname(file)
  const fullPath =
    path.isAbsolute(srcName) || srcName.slice(0, 1) === '~' ? srcName : path.join(dir, srcName)
  const encodedPath = encodeURIComponent(encodeURIComponent(fullPath))
  console.log(srcName, " is ", "local")
  return (
    <Container my={4} position="relative">
      <img {...attr} alt={attr.alt ?? "Wow, an image."} src={fullPath} />
    </Container>
  )
}
