import React from 'react'
import { connect } from 'react-redux'
import SearchForm from './SearchForm'
import SearchResult from './SearchResult'
import SearchFooter from './SearchFooter'
import './styles/SearchContainer.scss'
import isNotSmallDevice from '../../utils/windowDeviceWorker'
import { State } from '../../store/types'
import useWindowSize, { WindowSize } from '../../hooks/UseWindowSize'

interface ISearchContainer {
    search: boolean
    smallDeviceBreakpoint: number
}

const SearchContainer: React.FC<ISearchContainer> = (props: ISearchContainer): JSX.Element => {
    const { search, smallDeviceBreakpoint } = props

    const windowSize: WindowSize = useWindowSize()
    const show: boolean = (isNotSmallDevice(windowSize, smallDeviceBreakpoint) || search)

    return show ? (
        <aside className="search-container">
            <SearchForm/>
            <SearchResult/>
            <SearchFooter/>
        </aside>
    ) : (
        <></>
    )
}

const mapStateToProps = (state: State) => ({ search: state.search, smallDeviceBreakpoint: state.smallDeviceBreakpoint })

export default connect(mapStateToProps)(SearchContainer)