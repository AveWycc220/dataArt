import React from 'react'
import { connect } from 'react-redux'
import './styles/ToReadListHeader.scss'
import { State } from '../../store/types'

interface IToReadListHeaderProps {
    toReadBookCount: number
    readBookCount: number
}

const ToReadListHeader: React.FC<IToReadListHeaderProps> = (props: IToReadListHeaderProps): JSX.Element => {
    const { toReadBookCount, readBookCount } = props
    console.log(toReadBookCount, readBookCount)

    return (
        <header className="to-read-list-header">
            <div className="to-read-list-header__title">To Read List</div>
            <div className="to-read-list-header__info">
                <div className="to-read-list-header__to-read-book-count">{toReadBookCount} books</div>
                <div className="to-read-list-header__read-book-count">{readBookCount} read</div>
            </div>
        </header>
    )
}

const mapStateToProps = (state: State) => ({ toReadBookCount: state.toReadBookCount, readBookCount: state.readBookCount })

export default connect(mapStateToProps)(ToReadListHeader)