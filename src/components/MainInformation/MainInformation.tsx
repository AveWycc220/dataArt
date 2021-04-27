import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ResultObject, State } from '../../store/types'
import localStorageWorker from '../../localStorage/LocalStorageWorkerHandler'
import './styles/MainInformation.scss'
import Button from '../UI/Button'
import isNotSmallDevice from '../../utils/windowDeviceWorker'
import useWindowSize, { WindowSize } from '../../hooks/UseWindowSize'
import { ActionTypesEnum } from '../../store/actionTypes'

export interface IMainInformation {
    selected: ResultObject
    mainInformation: boolean
    smallDeviceBreakpoint: number
    setSearch: (value: boolean) => void
    setMainInformation: (value: boolean) => void
}

const MainInformation: React.FC<IMainInformation> = (props: IMainInformation): JSX.Element => {
    const { selected, mainInformation, smallDeviceBreakpoint, setSearch, setMainInformation } = props
    const { title, subtitle, language, has_fullText, first_publish_year, publish_year } = selected
    const windowSize: WindowSize = useWindowSize()

    const isNotSmallDeviceValue = isNotSmallDevice(windowSize, smallDeviceBreakpoint)
    const show: boolean = isNotSmallDeviceValue || mainInformation

    const clickEvent = (): boolean => {
        selected.status = false
        setSearch(false)
        setMainInformation(false)
        return localStorageWorker.addItem(selected)
    }
    const backToSearchEvent = () => {
        setSearch(true)
        setMainInformation(false)
    }

    const backToReadList = () => {
        setSearch(false)
        setMainInformation(false)
    }

    const isExist = (): boolean => Boolean(title)
    const mainContent = (): JSX.Element => (
        <>
            <div className="main-information__title">{title}</div>
            <div className="main-information__subtitle">{subtitle}</div>
            <div className="main-information__languages">Languages available: {language?.join(', ')}</div>
            <div className="main-information__has-fullText">Full text available: {has_fullText ? 'Yes' : 'No'}</div>
            <div className="main-information__first-publish-year">First publish year: {first_publish_year}</div>
            <div className="main-information__publish-year">Years published: {publish_year?.join(', ')}</div>
            <div className="main-information__button">
                <Button color="black" onClick={clickEvent}>Add book to Read List</Button>
                {isNotSmallDeviceValue ? (
                    <></>
                ) : (
                    <Button color="black" onClick={backToSearchEvent}>Back to Search</Button>
                )
                }
                {isNotSmallDeviceValue ? (
                    <></>
                ) : (
                    <Button color="black" onClick={backToReadList}>Back to ToReadList</Button>
                )
                }
            </div>
        </>
    )

    return show ? (
        <main className="main-information">
            { isExist() ? mainContent() : <></>}
        </main>
    ) : (
        <></>
    )
}

const mapStateToProps = (state: State) => (
    { selected: state.selected, mainInformation: state.mainInformation, smallDeviceBreakpoint: state.smallDeviceBreakpoint }
)
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setMainInformation: (value: boolean) => dispatch({ type: ActionTypesEnum.SET_MAIN_INFORMATION, value }),
    setSearch: (value: boolean) => dispatch({ type: ActionTypesEnum.SET_SEARCH, value }),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainInformation)