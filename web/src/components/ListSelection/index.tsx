import React, {HTMLAttributes} from 'react'
import "./ListSelection.less"
import classNames from 'classnames'

export interface List extends HTMLAttributes<HTMLElement> {
    selected?: string,
    align?: string,
    width?: string,
    height?: string,
    items?: ListItem[]
}

export interface ListItem {
    value?: string,
    bgColor?: string
}

export const ListSelection = (
    {
        className,
        selected,
        onClick,
        width = '20px',
        height = '20px',
        items = [],
        style
    }: List) => (
    <div className={classNames("list-selection", className)} style={style}>
        {items.map(
            ({
                 value,
                 bgColor = '#333333'
             }: ListItem, idxL) => (
                <div key={idxL}
                     data-name={value}
                     style={{
                         backgroundColor: bgColor,
                         width: width,
                         height: height
                     }}
                     className={classNames(value === selected ? 'active' : '')}
                     onClick={onClick}/>
            ))}
    </div>
)