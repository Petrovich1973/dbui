import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import './Header.less'
import {IconMore, IconUser} from "../../svg";
import Button from "../Button";

const Header = ({nav = []}) => {

    let history = useHistory()

    const onClickSettingBtn = () => {
        history.push("/settings")
    }

    return (
        <header>
            <div className="left">
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

export default Header