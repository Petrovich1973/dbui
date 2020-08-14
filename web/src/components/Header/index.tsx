import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import './Header.less'
import {IconMore, IconUser, IconLogo} from "../../svg";
import Button from "../Button";
import {AppRoute} from "../../routes";

export interface HeaderProps {
    nav: AppRoute[]
}

export const Header = (props: HeaderProps) => {
    const {nav} = props
    let history = useHistory()

    const onClickSettingBtn = () => {
        history.push("/settings")
    }

    return (
        <header>
            <div className="left">
                <IconLogo size={'1.6em'}/>
                <span>Web Console</span>
            </div>
            <nav>
                <ul>
                    {nav
                        .map(route => {
                            const {path = '', title = '', icon = null} = route
                            return (
                                <li key={path}>
                                    <NavLink to={path}>
                                        {icon}
                                        <span>{title}</span>
                                    </NavLink>
                                </li>
                            )
                        })}
                </ul>
            </nav>
            <div className="right">
                <IconUser size={'1.6em'}/>
                <span className="user-name" title={'Administrator Ivanov Ivan Ivanovich'}>
                    <small>Administrator Ivanov Ivan Ivanovich</small>
                </span>
                <Button
                    onClick={onClickSettingBtn}
                    icon={<IconMore size={'1em'}/>}
                    className="sm" title={'Settings Web Console'}/>
            </div>
        </header>
    )
}