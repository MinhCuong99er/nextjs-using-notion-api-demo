import { action, observable, makeObservable } from 'mobx'
import { create } from 'mobx-persist'
import AuthStore, { AuthHydration } from './auth.store'
import ModalStore, { ModalHydration } from './modal.store'

const isClient = typeof window !== 'undefined'
let hydrate
if (isClient) {
  hydrate = create({
    storage: localStorage,
    jsonify: true,
  })
}

export type RootStoreHydration = {
  loading?: boolean
  setLoader?: (loading: boolean) => void
  authStore?: AuthHydration
  modalStore?: ModalHydration
}

export default class RootStore {
  @observable loading = false
  authStore: AuthStore
  modalStore: ModalStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.modalStore = new ModalStore(this)
    
    if (isClient) {
      hydrate('authStore', this.authStore).then(() =>
        console.warn('authStore hydrated')
      )
    }
    makeObservable(this)
  }

  @action setLoader(_loading: boolean) {
    this.loading = _loading
  }

  @action hydrate(data: RootStoreHydration) {
    if (data.authStore) {
      this.authStore.hydrate(data.authStore)
      if (isClient) {
        hydrate('authStore', this.authStore, data.authStore).then(() =>
          console.warn('authStore rehydrated')
        )
      }
    }
    if (data.modalStore) {
      this.modalStore.hydrate(data.modalStore)
    }
  }
}
