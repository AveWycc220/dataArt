import { createStore, Store } from 'redux'
import reducer from './reducer'
import initialState from './initialState'
import { Actions, State } from './types'

const store: Store<State, Actions> = createStore(reducer, initialState)

export default store