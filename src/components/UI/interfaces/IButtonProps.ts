import { ButtonHTMLAttributes } from 'react'

export default interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: Color
}

export type Color = 'yellow' | 'black'