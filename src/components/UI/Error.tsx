import React from 'react'
import IErrorProps from './interfaces/IError'
import './styles/Error.scss'

const Error: React.FC<IErrorProps> = (props: IErrorProps): JSX.Element => {
    const { message } = props

    return <div className="error-ui">{message}</div>
}

export default Error