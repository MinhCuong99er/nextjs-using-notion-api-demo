import { action, observable, makeObservable } from 'mobx'
import clone from 'lodash/clone'
import RootStore from './RootStore'
import { IModal } from '@src/interfaces/Modal'

export type ModalHydration = {
  isShow?: boolean
  content?: string | JSX.Element

  modalOrderSuccess?: IModal
  modalProductDescription?: IModal

  setModal?: (params: {
    isShow: boolean
    content: string | JSX.Element | Record<string, unknown>
  }) => void
  // closeModal?: () => void
  setContent?: (_content: string | JSX.Element) => void
  setIsshow?: (value: boolean) => void

  setModalOrderSuccess?: (_data: IModal) => void
  setModalProductDescription?: (_data: IModal) => void
  closeModalOrderSuccess?: () => void
  closeModalProductDescription?: () => void
}

export default class ModalStore {
  @observable root: RootStore
  @observable isShow = false
  @observable content = null
  @observable modalOrderSuccess: IModal = {
    isShow: false,
    title: null,
    content: null,
  }
  @observable modalProductDescription: IModal = {
    isShow: false,
    title: null,
    content: null,
  }

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this)
  }

  @action setModal({
    isShow,
    content,
  }: {
    isShow: boolean
    content: string | JSX.Element
  }) {
    this.isShow = isShow
    this.content = content
  }

  @action setContent(_content: string | JSX.Element) {
    this.content = _content
  }

  @action setIsshow(value: boolean) {
    this.isShow = value
  }

  // @action closeModal() {
  //   const _params = {
  //     isShow: false,
  //     title: null,
  //     content: null,
  //   }
  //   this.setModal(_params)
  // }

  @action setModalOrderSuccess(_data: IModal) {
    const _orderSuccess = clone(this.modalOrderSuccess)
    Object.assign(_orderSuccess, _data)
    this.modalOrderSuccess = _orderSuccess
  }

  @action setModalProductDescription(_data: IModal) {
    const _productDescription = clone(this.modalProductDescription)
    Object.assign(_productDescription, _data)
    this.modalProductDescription = _productDescription
  }

  @action closeModalOrderSuccess() {
    const _params: IModal = {
      isShow: false,
      // title: null,
      // content: null,
    }
    this.setModalOrderSuccess(_params)
  }

  @action closeModalProductDescription() {
    const _params: IModal = {
      isShow: false,
    }
    this.setModalProductDescription(_params)
  }

  @action hydrate(data?: ModalHydration) {
    if (data && data.isShow) {
      this.isShow = data.isShow
    }
    if (data && data.content) {
      this.content = data.content
    }
    if (data && data.modalOrderSuccess) {
      this.modalOrderSuccess = data.modalOrderSuccess
    }
    if (data && data.modalProductDescription) {
      this.modalProductDescription = data.modalProductDescription
    }
  }
}
