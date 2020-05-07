import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {NotFoundPage} from './pages'
import './styles/App.less'
import routesApp from './routes'
import Header from "./components/Header"
import isRight from "./utils/isRight"
import SettingsPage from "./pages/SettingsPage";

const App = (props) => {
    const {rightsCurrent = [], fontSize = 100} = props
    const [navHeader, setNavHeader] = useState([])

    const renderRoutes = routes => routes.filter(route => {
        const {rights = []} = route
        if (!rights.length) return true
        return isRight({rights, rightsCurrent})
    })

    useEffect(() => {
        createNavHeader()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createNavHeader = () => {
        const [first, second] = routesApp
        setNavHeader([
            first,
            ...renderRoutes(second.routes)
                .map(rout => ({...rout, path: `${second.path}${rout.path}`}))
        ])
    }

    return (
        <div className="App" style={{fontSize: `${fontSize}%`}}>
            <Header nav={navHeader}/>
            <Switch>
                <Redirect exact from='/' to='/console'/>
                {renderRoutes(routesApp)
                    .map(route => {
                        const {path} = route
                        return (
                            <Route
                                key={path}
                                path={path}
                                render={props => <route.component
                                    {...props}
                                    {...{...route}}/>}/>
                        )
                    })}
                <Route path={`/settings`} component={SettingsPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    )
}

App.displayName = 'App'

const mapStateToProps = state => ({
    rightsCurrent: state.reducerApp.current.user.rights,
    fontSize: state.reducerApp.settings.fontSize
})

export default connect(mapStateToProps)(App)