import React, { CSSProperties, FC } from 'react'
import { Image } from 'react-bootstrap'

interface DefaultImageProps {
  image: string
  style?: CSSProperties
  alt?: string
  styleImg?: CSSProperties
}

const DefaultImage: FC<DefaultImageProps> = (props: DefaultImageProps) => {
  const { image, style, alt, styleImg } = props
  return (
    <div className="c-default-image">
      <div className="is-image" style={style}>
        <div className="is-outer">
          <Image src={image} alt={alt} style={styleImg} />
        </div>
      </div>
    </div>
  )
}

export default DefaultImage
