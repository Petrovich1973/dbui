import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom'
import NotFoundPage from "../NotFoundPage"
import isRight from "../../utils/isRight"

const ConsolePage = (props) => {
    const {routes = [], rightsCurrent = []} = props
    let match = useRouteMatch()
    const [first] = routes

    const renderRoutes = routes
        .filter(route => {
            const {rights = []} = route
            return isRight({rights, rightsCurrent})
        })

    return (
        <Switch>
            <Redirect exact from={`${match.path}`} to={`${match.path}${first.path}`}/>
            {renderRoutes
                .map((route, i) => {
                    const {path} = route
                    return (
                        <Route
                            key={i}
                            path={`${match.path}${path}`}
                            render={props => <route.component
                                {...props}
                                {...{...route}}/>}/>
                    )
                })}
            <Route component={NotFoundPage}/>
        </Switch>
    )
}

ConsolePage.displayName = 'ConsolePage'

const mapStateToProps = state => ({
    rightsCurrent: state.reducerApp.current.user.rights
})

export default connect(mapStateToProps)(ConsolePage)
