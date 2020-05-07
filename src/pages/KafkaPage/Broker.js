import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as type from '../../constants/actionTypes'
import {Redirect, Route, Switch, NavLink, Link, useParams, useRouteMatch} from 'react-router-dom'
import Partitions from "./Partitions"

const Broker = (props) => {
    const {brokers = []} = props
    const match = useRouteMatch()
    const {id} = useParams()
    const [brokerRouters] = useState([
        {title: 'Partitions', path: `/partitions`, component: Partitions}
    ])

    const {
        name = null,
        version = '',
        address = '',
        controller = null,
        velocity = ''
    } = brokers.find(item => item.id === +id) || {}

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChildName: {label: name, path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChildName: {label: name, path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url])

    return (
        <div className="scrollhide" style={{fontSize: '100%', height: '100%', overflow: 'auto'}}>
            <nav className="tabs">
                <ul>
                    <li>
                        <NavLink to={`${match.url}`}>
                            <small><em>Broker</em></small>
                            &nbsp;
                            <span style={{fontSize: '140%'}}>{name}</span>
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
                            <small>version</small>
                        </td>
                        <td>{version}</td>
                        <td/>
                        <td className="align-right label">
                            <small>address</small>
                        </td>
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td className="align-right label">
                            <small>controller</small>
                        </td>
                        <td>{controller}</td>
                        <td/>
                        <td className="align-right label">
                            <small>velocity</small>
                        </td>
                        <td>{velocity}</td>
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

export default connect()(Broker)