import React, { useRef } from 'react'
import { Dispatch } from 'redux'
import './styles/SearchResult.scss'
import { connect } from 'react-redux'
import { ResultObject, State } from '../../store/types'
import api from '../../api/ApiHandler'
import Loader from '../UI/Loader'
import { ActionTypesEnum } from '../../store/actionTypes'
import SearchResultItem from './SearchResultItem'
import Error from '../UI/Error'

interface ISearchResultProps {
    searchResult: Array<ResultObject>
    isLoading: boolean
    value: string
    isLoadingNewPage: boolean
    error: string | Error
    setNewPageLoading: (value: boolean) => void
    found: number
    page: number
}

const SearchResult: React.FC<ISearchResultProps> = (props: ISearchResultProps): JSX.Element => {
    const { searchResult, isLoading, value, setNewPageLoading, isLoadingNewPage, error, found, page } = props

    const ref = useRef<HTMLDivElement>(null)

    const isNeedItems = (elem: HTMLDivElement): boolean => elem.scrollTop + elem.clientHeight >= (elem.scrollHeight - 4200)
    const isHaveMoreItems = (numberOfShownPage: number, numberOfFoundItems: number): boolean => (numberOfShownPage * 100) < numberOfFoundItems

    const onScroll = async () => {
        if (ref.current !== null && !isLoadingNewPage && isHaveMoreItems(page, found) && !isLoading) {
            if (isNeedItems(ref.current)) {
                setNewPageLoading(true)
                await api.search(value, (page + 1))
            }
        }
    }

    return (
        <section ref={ref} className={isLoading || error ? 'search-result search-result_center' : 'search-result'} onScroll={onScroll}>
            {isLoading ? <Loader/> : searchResult.map((elem: ResultObject) => <SearchResultItem {...elem} key={elem.keyItem}/>)}
            {isLoadingNewPage ? <div className="new-page-loading">Loading...</div> : <></>}
            {error ? <Error message={error} /> : null}
        </section>
    )
}

const mapStateToProps = (state: State) => (
    {
        searchResult: state.searchResult,
        isLoading: state.isLoading,
        value: state.searchValue,
        isLoadingNewPage: state.isLoadingNewPage,
        error: state.error,
        found: state.found,
        page: state.page,
    }
)
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setNewPageLoading: (value: boolean) => dispatch({ type: ActionTypesEnum.SET_NEW_PAGE_LOADING, value }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)