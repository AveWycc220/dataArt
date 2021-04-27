import { Store } from 'redux'
import { Actions, ResultObject, State } from '../store/types'
import { ActionTypesEnum } from '../store/actionTypes'

interface ILocalStorageWorker {
    getItems: () => Array<ResultObject>
    addItem: (obj: ResultObject) => boolean
    removeItem: (key: string) => void
    changeStatus: (key: string) => void
}

export default class LocalStorageWorker implements ILocalStorageWorker {
    private readonly store?: Store<State, Actions> = undefined
    private readonly localStorage: Storage

    constructor()
    constructor(store: Store<State, Actions>)
    constructor(store?: Store<State, Actions>) {
        this.store = store || undefined
        this.localStorage = window.localStorage
        if (this.getItemsFromStorage() === null) {
            this.localStorage.setItem('items', JSON.stringify([] as Array<ResultObject>))
        }
        this.getItems()
    }

    getItems(): Array<ResultObject> {
        const items = JSON.parse(this.getItemsFromStorage()!)
        if (this.store) this.updateStore(items)
        return items || [] as Array<ResultObject>
    }

    addItem(obj: ResultObject): boolean {
        const items = JSON.parse(this.getItemsFromStorage()!)
        if (!('status' in obj)) {
            return false
        }
        const check = items.filter((elem: ResultObject) => elem.keyItem === obj.keyItem)
        if (check.length === 0) {
            items.push(obj)
            if (this.store) this.updateStore(items)
            this.localStorage.setItem('items', JSON.stringify(items))
            return true
        }
        return false
    }

    changeStatus(key: string): void {
        let items = JSON.parse(this.getItemsFromStorage()!)
        items = items.map((elem: ResultObject) => {
            if (elem.keyItem === key) {
                const newElem = Object.assign(elem)
                newElem.status = true
                return newElem
            }
            return elem
        })
        this.updateStore(items)
        this.localStorage.setItem('items', JSON.stringify(items))
    }

    removeItem(key: string): void {
        let items = JSON.parse(this.getItemsFromStorage()!)
        items = items.filter((elem: ResultObject) => elem.keyItem !== key)
        if (this.store) this.updateStore(items)
        this.localStorage.setItem('items', JSON.stringify(items))
    }

    private getItemsFromStorage(): string | null {
        return this.localStorage.getItem('items')
    }

    private updateStore(items: Array<ResultObject>): void {
        this.setCounts(items)
        this.store?.dispatch({ type: ActionTypesEnum.SET_TO_READ_LIST, value: items })
    }

    private setCounts(items: Array<ResultObject>): void {
        const readBooks = this.store ? items?.filter((elem: ResultObject) => elem.status) : null
        this.store?.dispatch({ type: ActionTypesEnum.SET_TO_READ_BOOK_COUNT, value: (items.length - readBooks!.length) })
        this.store?.dispatch({ type: ActionTypesEnum.SET_READ_BOOK_COUNT, value: (readBooks!.length) })
    }
}