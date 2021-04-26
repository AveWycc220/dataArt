import React from 'react'
import IButtonProps from './interfaces/IButtonProps'
import './styles/Button.scss'

const Button: React.FC<IButtonProps> = (props: IButtonProps): JSX.Element => {
    const { children, color } = props
    return <button className={`button-ui button-ui_${color}`} type="submit" {...props}>{children}</button>
}

export default Button