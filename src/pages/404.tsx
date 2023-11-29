import React, { FC } from 'react'
import { PAGE_ERROR } from '@src/interfaces/enums'
import PageError from '@src/components/common/PageError'

interface IPage404 {}

const Page404: FC<IPage404> = (props: IPage404) => {
  const {} = props
  return <PageError title={PAGE_ERROR.PAGE_404} />
}

export default Page404
