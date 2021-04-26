import React from 'react'
import SearchForm from './SearchForm'
import SearchResult from './SearchResult'
import SearchFooter from './SearchFooter'
import './styles/SearchContainer.scss'

const SearchContainer: React.FC = (): JSX.Element => <aside className="search-container">
    <SearchForm/>
    <SearchResult/>
    <SearchFooter/>
</aside>

export default SearchContainer