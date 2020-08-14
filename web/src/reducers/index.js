import { combineReducers } from 'redux'

import reducerApp from './reducerApp'
import reducerKafka from './reducerKafka'
import {themeSlice} from "./themes";
import {notifiesSlice} from "./notifies";
import {kafkaSlice} from "./kafka";

export default combineReducers({
    reducerApp,
    reducerKafka,
    kafka: kafkaSlice.reducer,
    theme: themeSlice.reducer,
    notifies: notifiesSlice.reducer
});