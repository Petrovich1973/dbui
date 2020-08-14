import React, { HTMLAttributes, ReactNode } from 'react'
import classnames from 'classnames'
import './SideBar.less'

export interface SideBarProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode
    width: string
    className: string
}

export const SideBar = (props: SideBarProps) => {
    const {children, width = '30%', title, className = ''} = props

    return (
        <div className={classnames("sidebar scrollhide col-blue", className)} style={{width: width}}>
            {title && <h4>{title}</h4>}
            {children}
        </div>
    )
}
