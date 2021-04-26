import { Action } from '@ngrx/store'
import { ActionTypesObj, ActionTypes } from './actionTypes'

export type State = {
    searchResult: Array<ResultObject>
    searchParameters: { value: string, page: number }
    isLoading: boolean
    isLoadingNewPage: boolean
    searchValue: string
    error: string | Error
    found: number
    shown: number
    page: number
    selected: ResultObject
    toReadBookCount: number
    readBookCount: number
    toReadList: Array<ResultObject>
}

const ActionFactory = <T>(type: ActionTypes) => class implements Action {
    readonly type = type
    constructor(public value: T) {}
}

export const SearchAction = ActionFactory<Array<ResultObject>>(ActionTypesObj.SEARCH)
export const SetLoadingAction = ActionFactory<boolean>(ActionTypesObj.SET_LOADING)
export const NewPageAction = ActionFactory<Array<ResultObject>>(ActionTypesObj.NEW_PAGE)
export const SetValueAction = ActionFactory<string>(ActionTypesObj.SET_VALUE)
export const SetNewPageLoadingAction = ActionFactory<boolean>(ActionTypesObj.SET_NEW_PAGE_LOADING)
export const ErrorAction = ActionFactory<string | Error>(ActionTypesObj.ERROR)
export const SetFoundAction = ActionFactory<number>(ActionTypesObj.SET_FOUND)
export const SetShownAction = ActionFactory<number>(ActionTypesObj.SET_SHOWN)
export const SetPageAction = ActionFactory<number>(ActionTypesObj.SET_PAGE)
export const SetSelectedAction = ActionFactory<ResultObject>(ActionTypesObj.SET_SELECTED)
export const SetToReadBooksCount = ActionFactory<number>(ActionTypesObj.SET_TO_READ_BOOK_COUNT)
export const SetReadBooksCount = ActionFactory<number>(ActionTypesObj.SET_READ_BOOK_COUNT)
export const SetToReadList = ActionFactory<Array<ResultObject>>(ActionTypesObj.SET_TO_READ_LIST)

export type ResultObject = {
    keyItem: string
    title: string
    language: Array<string>
    subtitle?: string
    has_fullText?: boolean
    first_publish_year?: number
    publish_year?: Array<number>
    status?: boolean
    author_name?: string
}

export type Actions = SearchAction
    | SetLoadingAction
    | NewPageAction
    | SetValueAction
    | SetNewPageLoadingAction
    | ErrorAction
    | SetFoundAction
    | SetShownAction
    | SetPageAction
    | SetSelectedAction
    | SetToReadBookCount
    | SetReadBooksCount