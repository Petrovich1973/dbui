import React, {useEffect, useLayoutEffect} from 'react';
import {APP_NAME, APP_VERSION} from '../../constants/common'
import {useRouteMatch} from "react-router-dom";

export const LocalStoragePagesHoc = (WrappedComponent, params) => (props) => {
    const {rememberField = [], reducerName = ''} = params || {}
    // eslint-disable-next-line
    const match = useRouteMatch()
    const name = `${APP_NAME}${match.path} ${APP_VERSION}`
    const setLocalStorage = (value) => {
        let lS = localStorage.getItem(name)
        lS = {...JSON.parse(lS), ...value}
        localStorage.setItem(name, JSON.stringify(lS))
    }
    const reducerInit = props[reducerName] || {}
    const fields = rememberField.reduce((acc, el) => {
        acc[el] = reducerInit[el]
        return acc
    }, {})

    // eslint-disable-next-line
    useLayoutEffect(() => {
        const {action = ''} = params || {}
        const lS = localStorage.getItem(name)
        if (lS) {
            props.dispatch({
                type: action,
                payload: {...JSON.parse(lS)}
            })
        } else {
            localStorage.setItem(name, JSON.stringify(fields))
            props.dispatch({
                type: action,
                payload: fields
            })
        }
        // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line
    useEffect(() => {
        setLocalStorage(fields)
        // eslint-disable-next-line
    }, [props])

    return <WrappedComponent {...props} />
}