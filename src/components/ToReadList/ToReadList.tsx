import React from 'react'
import { connect } from 'react-redux'
import './styles/ToReadList.scss'
import ToReadListHeader from './ToReadListHeader'
import ToReadListItem from './ToReadListItem'
import { ResultObject, State } from '../../store/types'

interface IToReadList {
    toReadList: Array<ResultObject>
}

const ToReadList: React.FC<IToReadList> = (props: IToReadList): JSX.Element => {
    const { toReadList } = props

    return (
        <section className="to-read-list">
            <ToReadListHeader/>
            <section className="to-read-list-container">
                {toReadList ? toReadList.map((elem: ResultObject) => <ToReadListItem key={elem.keyItem} {...elem} />) : <></>}
            </section>
        </section>
    )
}

const mapStateToProps = (state: State) => ({ toReadList: state.toReadList })

export default connect(mapStateToProps)(ToReadList)