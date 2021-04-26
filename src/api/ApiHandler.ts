import API from './Api'
import store from '../store/store'

const api: API = new API(`${process.env.REACT_APP_SEARCH_URL}`, store)

export default api