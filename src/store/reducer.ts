import { Actions, State } from './types'
import initialState from './initialState'
import { ActionTypesEnum } from './actionTypes'

const reducer = (state: State = initialState, action: Actions): State => {
    switch (action.type) {
        case ActionTypesEnum.SEARCH: return { ...state, searchResult: action.value, shown: 0 }
        case ActionTypesEnum.SET_LOADING: return { ...state, isLoading: action.value }
        case ActionTypesEnum.SET_NEW_PAGE_LOADING: return { ...state, isLoadingNewPage: action.value }
        case ActionTypesEnum.NEW_PAGE: return { ...state, searchResult: state.searchResult.concat(action.value) }
        case ActionTypesEnum.SET_VALUE: return { ...state, searchValue: action.value }
        case ActionTypesEnum.ERROR: return { ...state, error: action.value }
        case ActionTypesEnum.SET_FOUND: return { ...state, found: action.value }
        case ActionTypesEnum.SET_SHOWN: return { ...state, shown: state.shown + action.value }
        case ActionTypesEnum.SET_PAGE: return { ...state, page: action.value }
        case ActionTypesEnum.SET_SELECTED: return { ...state, selected: action.value }
        case ActionTypesEnum.SET_TO_READ_BOOK_COUNT: return { ...state, toReadBookCount: action.value }
        case ActionTypesEnum.SET_READ_BOOK_COUNT: return { ...state, readBookCount: action.value }
        case ActionTypesEnum.SET_TO_READ_LIST: return { ...state, toReadList: action.value }
        case ActionTypesEnum.SET_SEARCH: return { ...state, search: action.value }
        case ActionTypesEnum.SET_MAIN_INFORMATION: return { ...state, mainInformation: action.value }
        default: return state
    }
}

export default reducer