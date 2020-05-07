import * as type from '../constants/actionTypes'

const initialState = {
    current: {
        version: '1.0.0',
        user: {
            name: 'SBT-Tanko-IP',
            rights: [/*'VIEW_ALL', 'WRITE_ALL',*/ 'KAFKA_USE']
        }
    },
    settings: {
        hostApi: 'http://localhost:5000/api',
        fontSize: 100
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