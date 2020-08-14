import React, {HTMLAttributes, ReactNode} from 'react'
import './Input.less'
import classNames from 'classnames'

export interface InputProps extends HTMLAttributes<HTMLElement> {
    name?: string,
    type: 'textarea' | 'input',
    label?: string,
    message?: string,
    value: string,
    direction?: 'column' | 'row',
    minlength?: number,
    maxlength?: number,
    icon?: ReactNode,
    disabled?: boolean,
    readonly?: boolean,
    required?: boolean,
}

export const Input = ({
                   id,
                   name,
                   className,
                   type,
                   label,
                   message,
                   value,
                   direction = 'column',
                   onChange,
                   onKeyUp,
                   minlength,
                   maxlength,
                   icon,
                   disabled,
                   readonly,
                   required,
                   ...attrs
               }: InputProps) => {

    const Tag = type === 'textarea' ? 'textarea' : 'input'

    return (
        <div className={classNames("fieldInput", direction, className)}>
            {(label || required) && <span className='labelBlock'>
                {label && <label htmlFor={id}>{label}</label>}
                {required && <span className='inputRequired'> *</span>}
            </span>}
            <span className='inputBlock'>
                {icon && <span className="icon">{icon}</span>}
                <span className='input'>
                    <Tag
                        id={id}
                        name={name}
                        type={type}
                        className={classNames(type, {disabled: disabled}, {readonly: readonly})}
                        disabled={disabled}
                        readOnly={readonly}
                        minLength={minlength}
                        maxLength={maxlength}
                        value={value}
                        onChange={onChange}
                        onKeyUp={onKeyUp}
                        {...attrs}
                    />
                    {message && <span className='message'>{message}</span>}
                </span>
            </span>
        </div>
    )
}