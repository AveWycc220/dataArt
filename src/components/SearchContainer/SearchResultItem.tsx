import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ResultObject, State } from '../../store/types'
import './styles/SearchResultItem.scss'
import { ActionTypesEnum } from '../../store/actionTypes'

interface ISearchResultItem {
    setSelected: (value: ResultObject) => void
    searchResult: Array<ResultObject>
    keyItem: string
}

const SearchResultItem: React.FC<ResultObject & ISearchResultItem> = (props: ResultObject & ISearchResultItem): JSX.Element => {
    const { title, subtitle, language, keyItem, searchResult, setSelected } = props

    const selectEvent = () => {
        const foundElem = searchResult.find((elem: ResultObject) => elem.keyItem === keyItem)
        foundElem!.keyItem = foundElem!.keyItem
        foundElem ? setSelected(foundElem) : setSelected({} as ResultObject)
    }

    return (
        <section className="search-result__item" onClick={selectEvent} role="button" onKeyPress={selectEvent} tabIndex={0}>
            <div className="search-result__title">{title} {language ? `[${language.join(', ')}]` : <></>}</div>
            <div className="search-result__subtitle">{subtitle}</div>
        </section>
    )
}

const mapStateToProps = (state: State) => ({ searchResult: state.searchResult })

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSelected: (value: ResultObject) => dispatch({ type: ActionTypesEnum.SET_SELECTED, value }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultItem)