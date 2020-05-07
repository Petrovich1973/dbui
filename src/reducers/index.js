import { combineReducers } from 'redux'

import reducerApp from './reducerApp'
import reducerKafka from './reducerKafka'

export default combineReducers({
    reducerApp,
    reducerKafka
})