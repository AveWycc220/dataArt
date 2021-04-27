import React from 'react'
import { connect } from 'react-redux'
import './styles/ToReadList.scss'
import ToReadListHeader from './ToReadListHeader'
import ToReadListItem from './ToReadListItem'
import { ResultObject, State } from '../../store/types'
import isNotSmallDevice from '../../utils/windowDeviceWorker'
import useWindowSize, { WindowSize } from '../../hooks/UseWindowSize'

interface IToReadList {
    toReadList: Array<ResultObject>
    search: boolean
    mainInformation: boolean
    smallDeviceBreakpoint: number
}

const ToReadList: React.FC<IToReadList> = (props: IToReadList): JSX.Element => {
    const { toReadList, smallDeviceBreakpoint, search, mainInformation } = props
    const windowSize: WindowSize = useWindowSize()

    const show: boolean = isNotSmallDevice(windowSize, smallDeviceBreakpoint) || (!search && !mainInformation)

    return show ? (
        <section className="to-read-list">
            <ToReadListHeader/>
            <section className="to-read-list-container">
                {toReadList ? toReadList.map((elem: ResultObject) => <ToReadListItem key={elem.keyItem} {...elem} />) : <></>}
            </section>
        </section>
    ) : (
        <></>
    )
}

const mapStateToProps = (state: State) => (
    {
        toReadList: state.toReadList,
        search: state.search,
        mainInformation: state.mainInformation,
        smallDeviceBreakpoint: state.smallDeviceBreakpoint,
    }
)

export default connect(mapStateToProps)(ToReadList)