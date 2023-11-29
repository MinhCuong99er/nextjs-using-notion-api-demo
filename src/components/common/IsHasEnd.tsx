import React, { FC } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import RootStore from '@src/stores/RootStore'

interface IsHasEndProps {
  listItems: Array<any>
  hasMoreItems: boolean
  loading?: boolean
}

const IsHasEnd: FC<IsHasEndProps> = (props: IsHasEndProps) => {
  const { listItems, hasMoreItems, loading } = props
  return (
    <span className={`c-has-end ${listItems?.length > 0 && !hasMoreItems && !loading ? 'd-block' : 'd-none'}`}>
      Đang ở cuối danh sách
    </span>
  )
}

export default inject(({ store }: { store: RootStore }) => ({
  loading: store.loading,
}))(observer(IsHasEnd))
