import React, { CSSProperties, FC } from 'react'

interface IPageLoadingAll {
	style?: CSSProperties
}

const PageLoadingAll: FC<IPageLoadingAll> = (props: IPageLoadingAll) => {
	const { style } = props
	return (
		<React.Fragment>
			<div className="c-loading-fillop" style={style}>
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

export default PageLoadingAll
