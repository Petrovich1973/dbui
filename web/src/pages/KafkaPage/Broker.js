import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as type from '../../constants/actionTypes'
import {Redirect, Route, Switch, NavLink, Link, useParams, useRouteMatch} from 'react-router-dom'
import Partitions from "./Partitions"
import {loadBroker} from "../../actions/actionApp";

const Broker = (props) => {
    const {store = {}, dispatch} = props
    const {broker = {}, waitingBroker = null, firstReqBroker = false} = store
    const match = useRouteMatch()
    const {id} = useParams()

    const [brokerRouters] = useState([
        {title: 'Partitions', path: `/partitions`, component: Partitions}
    ])

    useEffect(() => {
        dispatch(loadBroker(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        clearTimeout(timeId)
        if (firstReqBroker && !waitingBroker) {
            timeId = setTimeout(() => dispatch(loadBroker(id)), 1000)
        }

        return () => {
            clearTimeout(timeId)
            dispatch({
                type: type.KAFKA_UPDATE,
                payload: {
                    waitingBroker: null
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [broker])

    // const {
    //     name = null,
    //     underReplicated = null,
    //     inSync = null,
    //     outOfSync = null,
    //     bytesInPerSec = null,
    //     bytesOutPerSec = null
    // } = broker

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChildName: {label: id, path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChildName: {label: id, path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url, broker])

    return (
        <div className="scrollhide" style={{fontSize: '100%', height: '100%', overflow: 'auto'}}>
            <nav className="tabs">
                <ul>
                    <li>
                        <NavLink to={`${match.url}`}>
                            <small><em>Broker</em></small>
                            &nbsp;
                            <span style={{fontSize: '140%'}}>{id}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            &nbsp;
            <div>
                <table className="table md">
                    <tbody>
                    <tr>
                        <td className="align-right label">
                            <small>id</small>
                        </td>
                        <td>{id}</td>
                        <td/>
                        <td className="align-right label">
                            <small>id</small>
                        </td>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <td className="align-right label">
                            <small>id</small>
                        </td>
                        <td>{id}</td>
                        <td/>
                        <td className="align-right label">
                            <small>id</small>
                        </td>
                        <td>{id}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            &nbsp;
            <nav className="tabs">
                <ul>
                    <li>
                        <Link to={`${match.url}/partitions`}>Partitions</Link>
                    </li>
                </ul>
            </nav>
            &nbsp;
            <Switch>
                <Redirect exact from={`${match.url}`} to={`${match.url}/partitions`}/>
                {brokerRouters
                    .map(route => {
                        const {path} = route
                        return (
                            <Route
                                key={path}
                                path={`${match.path}${path}`}
                                render={props => <route.component
                                    {...props}
                                    {...{...route}}/>}/>
                        )
                    })}
            </Switch>
        </div>
    )
}

Broker.displayName = 'Broker'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(Broker)