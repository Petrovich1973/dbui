import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import App from './App'
import './index.less'

import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.querySelector('#root')
)
