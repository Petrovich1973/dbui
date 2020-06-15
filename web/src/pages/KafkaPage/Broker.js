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

    // console.log(broker)

    const {
        partitions = {},
        production = {},
        consumption = {},
        system = {}
    } = broker

    const {
        cpu = null,
        disk = null,
        ram = null,
    } = system

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
                {firstReqBroker && Object.keys(broker).length ? <table className="table">
                    <colgroup>
                        <col span="1"/>
                        <col className="col-yellow" span="4"/>
                        <col className="col-green" span="4"/>
                        <col className="col-red" span="4"/>
                        <col className="col-blue" span="3"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th rowSpan={3}>id</th>

                        <th className="border-bottom opacity" colSpan={4}>partitions</th>

                        <th className="border-bottom opacity" colSpan={4}>production</th>

                        <th className="border-bottom opacity" colSpan={4}>consumption</th>

                        <th className="border-bottom opacity" colSpan={3}>system</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>total</th>
                        <th rowSpan={2}>in sync</th>
                        <th rowSpan={2}>out of sync</th>
                        <th rowSpan={2}>under replicated</th>

                        <th rowSpan={2}>bytes in per sec</th>
                        <th colSpan={2} className="border-left border-right opacity">request latency</th>
                        <th rowSpan={2}>failed request</th>
                        <th rowSpan={2}>bytes in per sec</th>
                        <th colSpan={2} className="border-left border-right opacity">request latency</th>
                        <th rowSpan={2}>failed request</th>

                        <th rowSpan={2}>cpu</th>
                        <th rowSpan={2}>disk</th>
                        <th rowSpan={2}>ram</th>
                    </tr>
                    <tr>
                        <th>95th</th>
                        <th>99.9th</th>

                        <th>95th</th>
                        <th>99.9th</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="align-center">{id}</td>

                        <td className="align-center">{partitions.total}</td>
                        <td className="align-center">{partitions.inSync}</td>
                        <td className="align-center">{partitions.outOfSync}</td>
                        <td className="align-center">{partitions.underReplicated}</td>

                        <td className="align-center">{production.bytesInPerSec}</td>
                        {Object.keys(production.requestLatency).map((key, idxL) => (
                            <td className="align-center"
                                key={idxL}>{production.requestLatency[key]}</td>
                        ))}
                        <td className="align-center">{production.faileRequests}</td>

                        <td className="align-center">{consumption.bytesInPerSec}</td>
                        {Object.keys(consumption.requestLatency).map((key, idxL) => (
                            <td className="align-center"
                                key={idxL}>{consumption.requestLatency[key]}</td>
                        ))}
                        <td className="align-center">{consumption.faileRequests}</td>

                        <td className="align-center">{cpu}</td>
                        <td className="align-center">{disk}</td>
                        <td className="align-center">{ram}</td>
                    </tr>
                    </tbody>
                </table> : firstReqBroker && !Object.keys(broker).length ?
                    <div className="waiting">ничего не найдено</div> :
                    <div className="waiting">waiting brokers...</div>}
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