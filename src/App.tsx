import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import MainInformation from './components/MainInformation/MainInformation'
import SearchContainer from './components/SearchContainer/SearchContainer'
import ToReadList from './components/ToReadList/ToReadList'
import './App.scss'
import { ResultObject } from './store/types'

const App: React.FC = (): JSX.Element => (
    <Provider store={store}>
        <div className='app'>
            <SearchContainer/>
            <MainInformation {...{} as ResultObject}/>
            <ToReadList/>
        </div>
    </Provider>
)

export default App