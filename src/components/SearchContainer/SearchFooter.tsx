import React from 'react'
import { connect } from 'react-redux'
import './styles/SearchFooter.scss'
import { State } from '../../store/types'

interface ISearchFooterProps {
    found: number
    shown: number
    page: number
}

const SearchFooter: React.FC<ISearchFooterProps> = (props: ISearchFooterProps): JSX.Element => {
    const { found, shown, page } = props

    return (
        <footer className="search-footer">
            <div className="search-footer__found">Found: {found}</div>
            <div className="search-footer__shown">Shown: {shown}</div>
            <div className="search-footer__page">Page: {page}</div>
        </footer>
    )
}

const mapStateToProps = (state: State) => (
    { found: state.found, shown: state.shown, page: state.page }
)

export default connect(mapStateToProps)(SearchFooter)