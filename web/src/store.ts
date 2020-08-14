import { createStore, applyMiddleware, compose } from 'redux'
import {bindActionCreators} from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import reducer from './reducers'
import {themeSlice} from "./reducers/themes";
import {notifiesSlice} from "./reducers/notifies";
import {kafkaSlice} from "./reducers/kafka";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export type AppState = ReturnType<typeof reducer>

export const dispatcher = {
    theme: bindActionCreators(themeSlice.actions, store.dispatch),
    notifies: bindActionCreators(notifiesSlice.actions, store.dispatch),
    kafka: bindActionCreators(kafkaSlice.actions, store.dispatch)
}