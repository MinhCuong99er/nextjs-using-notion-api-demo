import React, { FC, useEffect /*CSSProperties*/, useState } from 'react'
import Helmet from '@src/helpers/Helmet'
import { withStaticProps } from '@src/helpers/wrapperProps'
import { GetStaticProps } from 'next'
import Config from '@src/contains/Config'
import withLayout from '@src/lib/withLayout'
import { Container, Input, InputGroup, Button } from 'rsuite'
import Link from 'next/link'
import { toastUtil } from '@src/helpers/Toast'
import { ToastContainer } from '@src/helpers/Toast'
import { AuthHydration } from '@src/stores/auth.store'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { RootStoreHydration } from '@src/stores/RootStore'
import { flowResult } from 'mobx'
import { useRouter } from 'next/router'
import PageLoading from '@src/helpers/PageLoading'

interface IndexProps {
	authStore: AuthHydration
}

const Index: FC<IndexProps> = (props: IndexProps) => {
	const router = useRouter()
	const { authStore } = props
	const [username, setusername] = useState<string>(''),
		[password, setpassword] = useState<string>('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			//
		}
	}, [])

	useEffect(() => {
		if (authStore?.token) {
			setTimeout(() => {
				router.replace('/')
			}, 1000)
		}
	}, [])

	const login = async () => {
		if (!username || !password) {
			toastUtil.error('Vui lòng điền các trường còn thiếu!')
		} else {
			const res = await flowResult<any>(authStore.login(username, password))
			if (res?.code !== 0) {
				toastUtil.error(res?.message || 'Có lỗi')
			} else {
				toastUtil.success(res?.message || 'Đăng nhập thành công')
				router.replace('/')
			}
		}
	}

	if (authStore?.token) {
		return (
			<div className="c-page-loading">
				<PageLoading />
			</div>
		)
	}

	return (
		<>
			<Helmet
				title="Đăng nhập"
				url={`${Config.publicRuntimeConfig.BASE_URL}`}
				image={`${Config.publicRuntimeConfig.APP_IMAGE}`}
				// keywords=""
				// descriptions=""
			/>
			<Container className="c-login-bg">
				<div className="c-login-box">
					<img src="/images/paydi/logo.png" />
					<InputGroup className="c-login-box__input">
						<Input placeholder="Tên đăng nhập" onChange={setusername} value={username} />
					</InputGroup>
					<InputGroup className="c-login-box__input">
						<Input placeholder="Mật khẩu" type="password" onChange={setpassword} value={password} />
					</InputGroup>
					<Link href={'/'}>
						<a>Quên mật khẩu?</a>
					</Link>
					<br />
					<br />
					<br />
					<br />
					<Button onClick={login} block>
						Đăng nhập
					</Button>
				</div>
				<ToastContainer />
			</Container>
		</>
	)
}

export const getStaticProps: GetStaticProps = withStaticProps(async function getStaticProps() {
	return {
		props: {},
	}
})

export default withLayout(
	inject(({ store }: { store: RootStoreHydration }) => ({
		authStore: store.authStore,
		loading: store.loading,
		store,
	}))(observer(Index))
)
