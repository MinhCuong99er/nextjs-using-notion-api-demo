import React, { FC, useEffect } from 'react'
import Helmet from '@src/helpers/Helmet'
import { withStaticProps } from '@src/helpers/wrapperProps'
import Layout from '@src/layouts'
import { GetStaticProps } from 'next'
import Config from '@src/contains/Config'
import withLayout from '@src/lib/withLayout'
import { Container, Content, Footer, Header } from 'rsuite'
// import TopNav from '@src/components/common/TopNav'
// import Home from '@src/components/Home'

interface IndexProps {
	token: string
}

const Index: FC<IndexProps> = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			//
		}
	}, [])

	return (
		<Layout>
			<>
				<Helmet
					title="Tạo sản phẩm/hàng hóa - Paydi"
					url={`${Config.publicRuntimeConfig.BASE_URL}`}
					image={`${Config.publicRuntimeConfig.APP_IMAGE}`}
					// keywords=""
					// descriptions=""
				/>
				<Container>
					<Header>{/* <h2>Trang chủ</h2> */}</Header>
					<Content>
						{/* <TopNav active={1} />
						<div className="container">
							<Home />
						</div> */}
					</Content>
					<Footer>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							@Copyright 2022 MediaOne
						</div>
					</Footer>
				</Container>
			</>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = withStaticProps(async function getStaticProps() {
	return {
		props: {},
	}
})

export default withLayout(Index)
