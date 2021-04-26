import LocalStorageWorker from './LocalStorageWorker'
import store from '../store/store'

const localStorageWorker = new LocalStorageWorker(store)

export default localStorageWorker