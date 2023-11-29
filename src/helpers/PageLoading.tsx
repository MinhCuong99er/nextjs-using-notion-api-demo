import React, { CSSProperties, FC } from 'react'
import { isMobile } from 'react-device-detect'

interface IPageLoading {
  style?: CSSProperties
}

const PageLoading: FC<IPageLoading> = (props: IPageLoading) => {
  const { style } = props

  if (isMobile) {
    return (
      <React.Fragment>
        <div className="c-loadingcs" style={style}>
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="loader loading" style={style}>
        <img src="/loader.svg" alt="loader" />
      </div>
    </React.Fragment>
  )
}

export default PageLoading
