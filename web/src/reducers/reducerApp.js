import * as type from '../constants/actionTypes'
import * as api from "../constants/api"
import {DARK_THEME} from "../constants/common"

const initialState = {
    current: {
        version: '1.0.0',
        user: {
            name: 'SBT-Tanko-IP',
            rights: [/*'VIEW_ALL', 'WRITE_ALL',*/ 'KAFKA_USE']
        }
    },
    settings: {
        // hostApi: '/api',
        hostApi: api.url_host,
        fontSize: 100,
        theme: DARK_THEME
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.APP_UPDATE:
            return {
                ...state,
                ...action.payload
            }
        case type.APP_SETTINGS_UPDATE:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

export default reducer