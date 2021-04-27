import React, { FormEvent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Input from '../UI/Input'
import Button from '../UI/Button'
import './styles/SearchForm.scss'
import api from '../../api/ApiHandler'
import { ActionTypesEnum } from '../../store/actionTypes'
import { State } from '../../store/types'
import isNotSmallDevice from '../../utils/windowDeviceWorker'
import useWindowSize, { WindowSize } from '../../hooks/UseWindowSize'

interface ISearchFormProps {
    setLoading: (value: boolean) => void
    setValue: (value: string) => void
    setSearch: (value: boolean) => void
    smallDeviceBreakpoint: number
}

const SearchForm: React.FC<ISearchFormProps> = (props: ISearchFormProps): JSX.Element => {
    const { smallDeviceBreakpoint } = props
    const windowSize: WindowSize = useWindowSize()
    const showButton: boolean = !isNotSmallDevice(windowSize, smallDeviceBreakpoint)
    const [value, setValue] = React.useState('')
    const searchEvent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        props.setLoading(true)
        props.setValue(value)
        e.preventDefault()
        await api.search(value, 1)
        props.setLoading(false)
    }
    const inputEvent = (e: FormEvent<HTMLInputElement>): void => setValue((e.target as HTMLInputElement).value)

    return (
        <form className="search-form">
            <Input type="text" placeholder="Search" name="search" onInput={(e) => inputEvent(e)}/>
            <Button color="yellow" onClick={(e) => searchEvent(e)}>Go!</Button>
            {showButton ? (<Button
                color="yellow"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => props.setSearch(false)}
            >Back to ToReadList</Button>) : <></>}
        </form>
    )
}

const mapStateToProps = (state: State) => ({ smallDeviceBreakpoint: state.smallDeviceBreakpoint })
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoading: (value: boolean) => dispatch({ type: ActionTypesEnum.SET_LOADING, value }),
    setValue: (value: string) => dispatch({ type: ActionTypesEnum.SET_VALUE, value }),
    setSearch: (value: boolean) => dispatch({ type: ActionTypesEnum.SET_SEARCH, value }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)