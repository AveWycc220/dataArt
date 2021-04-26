import React from 'react'
import IInputProps from './interfaces/IInputProps'
import './styles/Input.scss'

const Input: React.FC<IInputProps> = (props: IInputProps): JSX.Element => {
    const { type } = props

    return <input className="input-ui" type={type} {...props} />
}

export default Input