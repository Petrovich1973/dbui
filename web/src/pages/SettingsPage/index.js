import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as type from '../../constants/actionTypes'
import './Settings.less'
import TitlePage from "../../components/TitlePage"
import {IconSettings} from "../../svg"
import Button from "../../components/Button"
import {DARK_THEME, LIGHT_THEME} from "../../constants/common"
import {ListSelection} from "../../components/ListSelection";
import {LocalStoragePagesHoc} from "../../components/LocalStoragePagesHoc";
import {themes} from "../../themes";
import {dispatcher} from "../../store";

const SettingsPage = (props) => {
    const {settings, dispatch} = props

    const [title] = useState('Settings Web Console')
    const [hostApi, setHostApi] = useState('')
    const [saveBtn, setSaveBtn] = useState(false)

    useEffect(() => {
        document.title = title
        setHostApi(settings.hostApi)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeHostApi = value => {
        setHostApi(value)
        setSaveBtn(settings.hostApi !== value)
    }

    const onKeyUpHostApi = e => {
        if (e.keyCode === 13) {
            handleUpdate()
        }
    }

    const handleUpdate = () => {
        dispatch({
            type: type.APP_SETTINGS_UPDATE,
            payload: {hostApi}
        })
        setSaveBtn(false)
    }

    const handleUpdateFontSize = e => {
        const fontSize = e.target.value
        if (fontSize < 151 && fontSize > 49) {
            dispatch({
                type: type.APP_SETTINGS_UPDATE,
                payload: {fontSize}
            })
        }
    }

    const handleUpdateTheme = (e) => {
        const theme = e.target.dataset.name
        dispatch({
            type: type.APP_SETTINGS_UPDATE,
            payload: {theme}
        })
        if (themes[theme]) {
            dispatcher.theme.setTheme(themes[theme])
        } else {
            dispatcher.notifies.add({
                variant: "error",
                title: "Ошибка смены темы",
                time: 3000
            })
        }
    }

    return (
        <div className="settingsPage" style={{height: '100%', overflow: 'hidden'}}>
            &nbsp;
            <TitlePage icon={<IconSettings size={'1em'}/>} label={title} className="flex-center"/>
            &nbsp;
            <table>
                <tbody>
                <tr className="rowGroup">
                    <td className="align-right">
                        <h6>font-size App</h6>
                    </td>
                    <td>
                        <div className="fieldInput">
                            <input
                                type="number"
                                max={150}
                                min={50}
                                value={settings.fontSize}
                                onChange={handleUpdateFontSize}/>
                        </div>
                    </td>
                    <td>%</td>
                </tr>
                <tr className="rowGroup">
                    <td className="align-right">
                        <h6>host services api</h6>
                    </td>
                    <td>
                        <div className="fieldInput">
                            <input
                                type="text"
                                placeholder={'http://localhost:8080/api'}
                                value={hostApi}
                                onKeyUp={onKeyUpHostApi}
                                onChange={e => onChangeHostApi(e.target.value)}/>
                        </div>
                    </td>
                    <td>
                        {saveBtn ? <Button
                            text={'Save'}
                            className="sx green"
                            onClick={handleUpdate}/> : <span>url</span>}
                    </td>
                </tr>
                <tr className="rowGroup">
                    <td className="align-right">
                        <h6>themes App</h6>
                    </td>
                    <td colSpan={2}>
                        <ListSelection
                            className = 'list-color-selection'
                            selected={settings.theme}
                            onClick={handleUpdateTheme}
                            style={{textAlign: 'left'}}
                            width='20px'
                            height='20px'
                            items={[
                                {
                                    value: LIGHT_THEME,
                                    bgColor: '#ffffff'
                                }, {
                                    value: DARK_THEME,
                                    bgColor: '#000000'
                                }
                            ]}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

SettingsPage.displayName = 'SettingsPage'

const mapStateToProps = state => ({
    settings: state.reducerApp.settings
})

const localStorageParams = {
    action: type.APP_SETTINGS_UPDATE,
    rememberField: ['hostApi','fontSize','theme'],
    reducerName: 'settings'
}

export default connect(mapStateToProps)(LocalStoragePagesHoc(SettingsPage, localStorageParams))