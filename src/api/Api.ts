import { Store } from 'redux'
import { Actions, ResultObject, State } from '../store/types'
import { ActionTypesEnum } from '../store/actionTypes'

interface IApiOpenLibraryWorker {
    search: (value: string, page: number) => Promise<Object> | Error
}

type FetchResult = {
    start: number
    numFound: number
    num_found: number
    docs: Array<ResultObject>
}

export default class API implements IApiOpenLibraryWorker {
    private readonly url: string = ''
    private readonly store?: Store<State, Actions> = undefined
    private controllers: Array<AbortController | undefined>

    constructor(url: string)
    constructor(url: string, store: Store<State, Actions>)
    constructor(url: string, store?: Store<State, Actions>) {
        this.url = url
        this.store = store || undefined
        this.controllers = [] as Array<AbortController | undefined>
    }

    async search(value: string, page: number) {
        try {
            if (page === 1) {
                this.abort()
                this.store?.dispatch({ type: ActionTypesEnum.SET_SELECTED, value: {} as ResultObject })
                if (this.store?.getState().isLoadingNewPage) {
                    this.store.dispatch({ type: ActionTypesEnum.SET_NEW_PAGE_LOADING, value: false })
                }
            }
            const response = await this.makeFetchWithController(value, page)
            if (!(response.ok)) {
                throw new Error(`ServerError ${response.status} ${response.statusText}. Try again.`)
            }
            const res = await response.json()
            res.docs = removeKey(res.docs)
            this.dispatchNewItems(res, value, page)
            return res.docs
        } catch (e) {
            if (e.name !== 'AbortError') {
                this.dispatchError(e)
            }
            return e
        }
    }

    private abort(): void {
        this.controllers = this.controllers.map(elem => {
            elem?.abort()
            return undefined
        }).filter(elem => Boolean(elem))
    }

    private async makeFetchWithController(value: string, page: number): Promise<Response> {
        const controller = new AbortController()
        this.controllers.push(controller)
        return fetch(`${this.url}?q=${value}&page=${page}`, { signal: controller.signal })
    }

    private dispatchError(e: Error): void {
        if (this.store) this.store.dispatch({ type: ActionTypesEnum.ERROR, value: e.message })
    }

    private dispatchNewItems(res: FetchResult, value: string, page: number) {
        this.store?.dispatch({ type: ActionTypesEnum.SET_VALUE, value })
        if (page === 1) {
            this.store?.dispatch({ type: ActionTypesEnum.SEARCH, value: res.docs })
            this.store?.dispatch({ type: ActionTypesEnum.SET_FOUND, value: res.numFound })
        } else {
            this.store?.dispatch({ type: ActionTypesEnum.NEW_PAGE, value: res.docs })
            this.store?.dispatch({ type: ActionTypesEnum.SET_NEW_PAGE_LOADING, value: false })
        }
        if (res.docs.length === 0) this.store?.dispatch({ type: ActionTypesEnum.SET_PAGE, value: 0 })
        else this.store?.dispatch({ type: ActionTypesEnum.SET_PAGE, value: page })
        this.store?.dispatch({ type: ActionTypesEnum.SET_SHOWN, value: res.docs.length })
    }
}

const removeKey = (res: Array<object>) => res.map((elem: any) => {
    const newObj = { keyItem: elem.key, ...elem }
    delete newObj.key
    return newObj
})