import React, { FormEvent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Input from '../UI/Input'
import Button from '../UI/Button'
import './styles/SearchForm.scss'
import api from '../../api/ApiHandler'
import { ActionTypesEnum } from '../../store/actionTypes'

interface ISearchFormProps {
    setLoading: (value: boolean) => void
    setValue: (value: string) => void
}

const SearchForm: React.FC<ISearchFormProps> = (props: ISearchFormProps): JSX.Element => {
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
        </form>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLoading: (value: boolean) => dispatch({ type: ActionTypesEnum.SET_LOADING, value }),
    setValue: (value: string) => dispatch({ type: ActionTypesEnum.SET_VALUE, value }),
})

export default connect(null, mapDispatchToProps)(SearchForm)