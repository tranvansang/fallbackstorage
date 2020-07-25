// specs: https://html.spec.whatwg.org/multipage/webstorage.html#storage-2
// value = storage[key], storage[key] = value, delete storage[key] are not implemented
export class MemoryStorage implements Storage {
	private readonly memoryStorage: Record<string, string> = {}
	public get length(){
		return Object.keys(this.memoryStorage).length
	}
	public key(n: number){
		return Object.keys(this.memoryStorage)[n]
	}
	public getItem(key: string){
		return this.memoryStorage[key]
	}
	public setItem(key: string, value: string){
		this.memoryStorage[key] = String(value)
	}
	public removeItem(key: string){
		delete this.memoryStorage[key]
	}
	public clear(){
		for (const key of Object.keys(this.memoryStorage))
			delete this.memoryStorage[key]
	}
}
const memoryStorage = new MemoryStorage()

const isStorageAvailable = (type: 'localStorage' | 'sessionStorage') => {
	let storage
	try {
		storage = window[type]
		const storageTestKey = '__storage_test_key__'
		storage.setItem(storageTestKey, storageTestKey)
		storage.removeItem(storageTestKey)
	} catch(e) {
		return e instanceof DOMException && (
				// everything except Firefox
				e.code === 22
				// Firefox
				|| e.code === 1014
				// test name field too, because code might not be present
				// everything except Firefox
				|| e.name === 'QuotaExceededError'
				// Firefox
				|| e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
			)
			// acknowledge QuotaExceededError only if there's something already stored
			&& storage && storage.length !== 0
	}
	return true
}

enum StorageType {
	localStorage,
	sessionStorage,
	memoryStorage,
}
let storageType: StorageType | undefined

export const getSafeStorage = () => {
	if (typeof storageType === 'undefined') {
		storageType = isStorageAvailable('localStorage') ? StorageType.localStorage
			: isStorageAvailable('sessionStorage') ? StorageType.sessionStorage : StorageType.memoryStorage
	}
	return storageType === StorageType.localStorage
		? window.localStorage
		: storageType === StorageType.sessionStorage
			? window.sessionStorage
			: memoryStorage
}
