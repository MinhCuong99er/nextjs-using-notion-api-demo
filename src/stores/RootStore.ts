import { action, observable, makeObservable } from 'mobx'
import { create } from 'mobx-persist'
import AuthStore, { AuthHydration } from './auth.store'
import GlobalStore, { GlobalHydration } from './global.store'

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
	globalStore?: GlobalHydration
}

export default class RootStore {
	@observable loading = false
	authStore: AuthStore
	globalStore: GlobalStore

	constructor() {
		// this.sizeSwitcherStore = sizeSwitcherStoreFactory(this);
		this.authStore = new AuthStore(this)
		this.globalStore = new GlobalStore(this)
		if (isClient) {
			hydrate('authStore', this.authStore).then(() => console.warn('authStore hydrated'))
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
				hydrate('authStore', this.authStore, data.authStore).then(() => console.warn('authStore rehydrated'))
			}
		}
		if (data.globalStore) {
			this.globalStore.hydrate(data.globalStore)
		}
	}
}
