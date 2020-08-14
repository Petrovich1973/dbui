import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import App from './App'
import "./fonts/fonts.less";
import './index.less'

import {store} from './store'
import DbuiThemeProvider from "./themes/DBUIThemeProvider";
import {Notify} from "./components/Notify";

ReactDOM.render(
    <Provider store={store}>
        <DbuiThemeProvider>
            <Router>
                <App/>
            </Router>
            <Notify />
        </DbuiThemeProvider>
    </Provider>,
    document.querySelector('#root')
)
