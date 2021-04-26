import React from 'react'
import { connect } from 'react-redux'
import { ResultObject, State } from '../../store/types'
import localStorageWorker from '../../localStorage/LocalStorageWorkerHandler'
import './styles/MainInformation.scss'
import Button from '../UI/Button'

const MainInformation: React.FC<ResultObject> = (props: ResultObject): JSX.Element => {
    const { title, subtitle, language, has_fullText, first_publish_year, publish_year } = props
    const selected = { ...props }

    const clickEvent = (): boolean => {
        selected.status = false
        return localStorageWorker.addItem(selected)
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
            </div>
        </>
    )

    return (
        <main className="main-information">
            { isExist() ? mainContent() : <></>}
        </main>
    )
}

const mapStateToProps = (state: State) => {
    console.log(state)
    return state.selected
}

export default connect(mapStateToProps)(MainInformation)