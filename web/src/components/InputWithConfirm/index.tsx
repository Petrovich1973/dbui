import React, {HTMLAttributes, ReactNode} from 'react'
import './InputWithConfirm.less'
import classNames from 'classnames'
import {IconEdit} from "../../svg/IconEdit";
import {IconCancel} from "../../svg/IconCancel";
import {IconOk} from "../../svg/IconOk";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
    name?: string,
    type?: string,
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
    autoComplete?: 'on' | 'off',
    onClickOk?: () => void,
    onClickCancel?: () => void
}

export const InputWithConfirm = ({
        id,
        name,
        className,
        type,
        label,
        message,
        value,
        direction = 'column',
        minlength,
        maxlength,
        icon,
        disabled,
        readonly,
        required,
        autoComplete= 'off',
        placeholder = '',
        onChange,
        onKeyUp,
        onClickOk,
        onClickCancel
    }: InputProps) => {

    return (
        <div className={classNames("fieldInputWithConfig", direction, className)}>
            {(label || required) && <span className='labelBlock'>
                {label && <label htmlFor={id}>{label}</label>}
                {required && <span className='inputRequired'> *</span>}
            </span>}
            <span className='inputBlock'>
                {icon && <span className="icon">{icon}</span>}
                <span className='input'>
                    <input
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
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                    />
                    {message && <span className='message'>{message}</span>}
                    <span className="iconEdit"><IconEdit size="14px" /></span>
                    <div className="saveOptions">
                        <span
                            onClick={onClickOk}
                            className="button"
                            // title="Нажмите Alt + S для подтверждения"
                        ><IconOk size="14px"/>
                        </span>
                        <span
                            onClick={onClickCancel}
                            className="button"
                            // title="Нажмите Alt + ` для отмены"
                        ><IconCancel size="14px"/>
                        </span>
                    </div>
                </span>
            </span>
        </div>
    )
}