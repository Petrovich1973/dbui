import React, {ReactNode} from 'react'
import classnames from 'classnames'
import './Button.less'

export interface ButtonProps {
    icon?: ReactNode,
    text?: string,
    title?: string,
    className?: string,
    onClick?: () => void,
    disabled?: boolean
}

const Button = (props: ButtonProps) => {
    const {icon, className, text} = props

    return (
        <span className="button">
            <button
                title={props.title}
                disabled={props.disabled}
                className={classnames("btn", className, {disabled: props.disabled})}
                onClick={props.onClick}>
                {icon && <span className="svg">{icon}</span>}
                {text && <span>{text}</span>}
                {!icon && !text && <span>Button</span>}
            </button>
        </span>
    )
}

export default Button