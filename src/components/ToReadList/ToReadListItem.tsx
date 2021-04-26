import React from 'react'
import './styles/ToReadListItem.scss'
import { ResultObject } from '../../store/types'
import Button from '../UI/Button'
import localStorageWorker from '../../localStorage/LocalStorageWorkerHandler'

interface IToReadListItem {
    keyItem: string
}

const ToReadListItem: React.FC<ResultObject & IToReadListItem> = (props: ResultObject & IToReadListItem): JSX.Element => {
    const { title, subtitle, language, keyItem, author_name, status } = props

    const changeStatusEvent = (keyItemNewStatus: string): void => localStorageWorker.removeItem(keyItemNewStatus)

    const item = (): JSX.Element => (
        <>
            <div className="to-read-list-item__title">{title} {language ? `(${language.join(', ')})` : <></>}</div>
            <div className="to-read-list-item__subtitle">{subtitle}</div>
            <div className="to-read-list-item__author">Author:&nbsp;{author_name}</div>
        </>
    )

    const readBookItem = (): JSX.Element => (
        <div className="to-read-list-item to-read-list-item_read" key={keyItem}>
            {item()}
        </div>
    )

    const toReadBookItem = (): JSX.Element => (
        <div className="to-read-list-item" key={keyItem}>
            <div className="to-read-list-item__info">
                {item()}
            </div>
            <div className="to-read-list-item__button">
                <Button color="black">
                    Make as read
                </Button>
                <Button
                    color="black"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => changeStatusEvent(keyItem)}
                >Remove from list</Button>
            </div>
        </div>
    )

    return status ? readBookItem() : toReadBookItem()
}

export default ToReadListItem