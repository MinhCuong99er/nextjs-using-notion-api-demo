import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import Config from '@src/contains/Config'
import Helmet from '@src/helpers/Helmet'
import Layout from '@src/layouts'
import withLayout from '@src/lib/withLayout'
import { withStaticProps } from '@src/helpers/wrapperProps'
import PageError from '@src/components/common/PageError'
import { PAGE_ERROR } from '@src/interfaces/enums'
import * as notionServices from '@src/services/notion.service'

interface IndexProps {
  books: any
}

const Index: FC<IndexProps> = (props: IndexProps) => {
  const { books } = props
  console.log("🚀 ~ file: index.tsx:18 ~ books:", books)

  return (
    <Layout>
      <>
        <Helmet
          title={"Trang chủ"}
          url={`${Config.publicRuntimeConfig.BASE_URL}`}
          image={`${Config.publicRuntimeConfig.APP_IMAGE}`}
        />
        <PageError title={PAGE_ERROR.PAGE_404} />
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = withStaticProps(async function getStaticProps() {
  const resListBooks = await notionServices.getListBooks()
  return {
    props: {
      books: resListBooks
    },
  }
})

export default withLayout(Index)
