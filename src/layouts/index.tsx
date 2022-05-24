import React, { FC, useEffect } from 'react'
import { ToastContainer } from '@src/helpers/Toast'
import { CustomProvider } from 'rsuite'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { AuthHydration } from '@src/stores/auth.store'
import { locale } from '@src/helpers/rsuite/locales/vi_VN'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLoading from '@src/helpers/PageLoading'
// import SideBar from '@src/components/common/SideBar'

interface LayoutProps {
	children: React.ReactChild
	authStore?: AuthHydration
}

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
	const { authStore } = props
	const router = useRouter()

	useEffect(() => {
		if (!authStore?.token) {
			setTimeout(() => {
				router.replace('/login')
			}, 1000)
		}
	}, [])

	if (!authStore?.token) {
		return (
			<div className="c-page-loading">
				<PageLoading />
			</div>
		)
	}

	return (
		<React.Fragment>
			<CustomProvider locale={locale}>
				<div>
					<div className="c-header">
						<div className="container clearfix">
							<div className="c-header__left">
								<Link href={'/'}>
									<a>
										<img src="/images/paydi/logo-white.png" />
									</a>
								</Link>
							</div>
							{/* <div className="c-header__right">
								<span> {authStore?.auth?.storeOwnerName}</span>
								<div className="is-ava">
									<img src="/images/paydi/ava.png" />
								</div>
							</div> */}
						</div>
					</div>
					{/* <SideBar /> */}
					<div style={{ marginTop: 91 }}>{props.children}</div>
				</div>
				<ToastContainer />
			</CustomProvider>
		</React.Fragment>
	)
}

export default inject(({ store }) => ({
	authStore: store?.authStore,
}))(observer(Layout))
