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
        listeners = [],
        isController = false,
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

    const [ tableHeader , setTableHeader ] = useState([])

    useEffect(() => {
        if (firstReqBroker && Object.keys(broker).length) {
            const allReqLatency = [...production.requestLatency, ...consumption.requestLatency]
                .map(({name}) => name.split(' ')[0])
            setTableHeader(allReqLatency)
        }
        // eslint-disable-next-line
    }, [broker])

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
                        <col span="3"/>
                        <col className="col-yellow" span="4"/>
                        <col className="col-green" span="6"/>
                        <col className="col-red" span="6"/>
                        <col className="col-blue" span="3"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th rowSpan={3} className="align-right">id</th>
                        <th rowSpan={3} className="align-left">listeners</th>
                        <th rowSpan={3} className="align-left">Controller</th>

                        <th className="border-bottom opacity" colSpan={4}>partitions</th>

                        <th className="border-bottom opacity" colSpan={6}>production</th>

                        <th className="border-bottom opacity" colSpan={6}>consumption</th>

                        <th className="border-bottom opacity" colSpan={3}>system</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>total</th>
                        <th rowSpan={2}>in sync</th>
                        <th rowSpan={2}>out of sync</th>
                        <th rowSpan={2}>under replicated</th>

                        <th rowSpan={2}>bytes in per sec</th>
                        <th colSpan={4} className="border-left border-right opacity">request latency (ms)</th>
                        <th rowSpan={2}>failed request</th>
                        <th rowSpan={2}>bytes out per sec</th>
                        <th colSpan={4} className="border-left border-right opacity">request latency (ms)</th>
                        <th rowSpan={2}>failed request</th>

                        <th rowSpan={2}>cpu</th>
                        <th rowSpan={2}>disk</th>
                        <th rowSpan={2}>ram</th>
                    </tr>
                    <tr>
                        {tableHeader.map((td, idxL) => <th key={idxL}>{td}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="align-right">{id}</td>
                        <td><small>{Array.isArray(listeners) && listeners.join(', ')}</small></td>
                        <td>{isController ? 'yes' : 'no'}</td>

                        <td className="align-center">{partitions.total}</td>
                        <td className="align-center">{partitions.inSync}</td>
                        <td className="align-center">{partitions.outOfSync}</td>
                        <td className="align-center">{partitions.underReplicated}</td>

                        <td className="align-center">{production.bytesInPerSec}</td>
                        {production.requestLatency.map((td, idxL) => {
                            const {value} = td
                            return (
                                <td className="align-center"
                                    key={idxL}>{value}</td>
                            )
                        })}
                        <td className="align-center">{production.failedRequests}</td>

                        <td className="align-center">{consumption.bytesOutPerSec}</td>
                        {consumption.requestLatency.map((td, idxL) => {
                            const {value} = td
                            return (
                                <td className="align-center"
                                    key={idxL}>{value}</td>
                            )
                        })}
                        <td className="align-center">{consumption.failedRequests}</td>

                        <td className="align-center">{cpu}</td>
                        <td className="align-center">{disk}</td>
                        <td className="align-center">{ram}</td>
                    </tr>
                    </tbody>
                </table> : firstReqBroker && !Object.keys(broker).length ?
                    <div className="waiting">ничего не найдено</div> :
                    <div className="waiting">waiting broker...</div>}
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