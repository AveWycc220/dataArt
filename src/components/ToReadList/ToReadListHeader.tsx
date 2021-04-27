import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import './styles/ToReadListHeader.scss'
import { State } from '../../store/types'
import useWindowSize from '../../hooks/UseWindowSize'
import isNotSmallDevice from '../../utils/windowDeviceWorker'
import Button from '../UI/Button'
import { ActionTypesEnum } from '../../store/actionTypes'

interface IToReadListHeaderProps {
    toReadBookCount: number
    readBookCount: number
    smallDeviceBreakpoint: number
    setSearch: (value: boolean) => void
}

const ToReadListHeader: React.FC<IToReadListHeaderProps> = (props: IToReadListHeaderProps): JSX.Element => {
    const { toReadBookCount, readBookCount, smallDeviceBreakpoint, setSearch } = props
    const windowSize = useWindowSize()

    const button: JSX.Element = (
        <div className="to-read-list-header__btn-search">
            <Button
                color="yellow"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => setSearch(true)}
            >Search</Button>
        </div>
    )

    return (
        <header className="to-read-list-header">
            <div className="to-read-list-header__title">To Read List</div>
            <div className="to-read-list-header__info">
                <div className="to-read-list-header__to-read-book-count">{toReadBookCount} books</div>
                <div className="to-read-list-header__read-book-count">{readBookCount} read</div>
            </div>
            {isNotSmallDevice(windowSize, smallDeviceBreakpoint) ? <></> : button}
        </header>
    )
}

const mapStateToProps = (state: State) => (
    {
        toReadBookCount: state.toReadBookCount,
        readBookCount: state.readBookCount,
        smallDeviceBreakpoint: state.smallDeviceBreakpoint,
    }
)

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSearch: (value: boolean) => dispatch({ type: ActionTypesEnum.SET_SEARCH, value }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToReadListHeader)