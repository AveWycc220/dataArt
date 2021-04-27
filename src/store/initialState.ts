import { ResultObject, State } from './types'

const initialState: State = {
    searchResult: [] as Array<ResultObject>,
    searchParameters: { value: '', page: 0 },
    isLoading: false,
    isLoadingNewPage: false,
    searchValue: '',
    error: '',
    found: 0,
    shown: 0,
    page: 0,
    selected: {} as ResultObject,
    toReadBookCount: 0,
    readBookCount: 0,
    toReadList: [] as Array<ResultObject>,
    search: false,
    mainInformation: false,
    smallDeviceBreakpoint: 1100,
}

export default initialState