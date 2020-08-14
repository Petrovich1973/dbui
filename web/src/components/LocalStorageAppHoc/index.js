import React, {useLayoutEffect} from 'react';
import {APP_NAME, APP_VERSION} from '../../constants/common'

export const LocalStorageAppHoc = (WrappedComponent, params) => (props) => {
    const name = `${APP_NAME}${params.target} ${APP_VERSION}`
    // eslint-disable-next-line
    useLayoutEffect(() => {
        const {action = '', reducerName = ''} = params || {}
        const reducerInit = props[reducerName] || {}
        const lS = localStorage.getItem(name)
        if (lS) {
            props.dispatch({
                type: action,
                payload: {...JSON.parse(lS)}
            })
        } else {
            localStorage.setItem(name, JSON.stringify(reducerInit))
            props.dispatch({
                type: action,
                payload: reducerInit
            })
        }
        // eslint-disable-next-line
    }, [])

    return <WrappedComponent {...props} />
}