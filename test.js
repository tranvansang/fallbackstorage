const {MemoryStorage} = require('./index')

describe('memory storage', () => {
	let memoryStorage
	beforeEach(() => {
		memoryStorage = new MemoryStorage()
	})
	test('length getter', () => {
		expect(memoryStorage.length).toBe(0)
		memoryStorage.setItem('foo', 'bar')
		memoryStorage.setItem('foo', 'baar')
		expect(memoryStorage.length).toBe(1)
	})
	test('key method', () => {
		expect(memoryStorage.key(1)).toBeUndefined()
		memoryStorage.setItem(1, 'bar')
		expect(memoryStorage.key(0)).toBe('1')
	})
	test('get/set item', () => {
		expect(memoryStorage.key(1)).toBeUndefined()
		memoryStorage.setItem(1, 'bar')
		memoryStorage.setItem(1, 'baar')
		expect(memoryStorage.getItem('1')).toBe('baar')
		memoryStorage.setItem('foo', 1)
		expect(memoryStorage.getItem('foo')).toBe('1')
	})
	test('clear', () => {
		memoryStorage.setItem(1, 'bar')
		memoryStorage.setItem('foo', 1)
		expect(memoryStorage.length).toBe(2)
		memoryStorage.clear()
		expect(memoryStorage.length).toBe(0)
		expect(memoryStorage.getItem('foo')).toBeUndefined()
	})
})
