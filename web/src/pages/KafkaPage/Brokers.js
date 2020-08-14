import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as type from "../../constants/actionTypes"
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import Broker from "./Broker"
import {loadBrokers} from '../../actions/actionApp'
import {LocalStoragePagesHoc} from "../../components/LocalStoragePagesHoc";

const Brokers = (props) => {
    const {store = {}, dispatch} = props
    const {brokers = [], waitingBrokers = null, firstReqBrokers = false} = store
    const match = useRouteMatch()
    const location = useLocation()

    const isEqualPath = (match.url === location.pathname)

    useEffect(() => {
        dispatch(loadBrokers({}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        if (firstReqBrokers && !waitingBrokers && isEqualPath) {
            timeId = setTimeout(() => dispatch(loadBrokers({})), 1000)
        }

        return () => {
            clearTimeout(timeId)
            dispatch({
                type: type.KAFKA_UPDATE,
                payload: {
                    waitingBrokers: null
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brokers, location])

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChild: {label: 'brokers', path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChild: {label: 'brokers', path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url, brokers])

    const [ tableHeader , setTableHeader ] = useState([])

    useEffect(() => {
        if (firstReqBrokers && brokers.length) {
            const {
                production = {},
                consumption = {}
            } = brokers[0]
            const allReqLatency = [...production.requestLatency, ...consumption.requestLatency]
                .map(({name}) => name.split(' ')[0])
            setTableHeader(allReqLatency)
        }
        // eslint-disable-next-line
    }, [brokers])

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <div className="scrollhide">
                        {firstReqBrokers && brokers.length ? <table className="table">
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
                            {brokers.map((row, i) => {
                                const {
                                    id = null,
                                    listeners = [],
                                    isController = false,
                                    partitions = {},
                                    production = {},
                                    consumption = {},
                                    system: {
                                        cpu = null,
                                        disk = null,
                                        ram = null,
                                    }
                                } = row
                                return (
                                    <tr key={i} onClick={() => {
                                        props.history.push(`${match.url}/${id}`)
                                    }}>
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
                                    </tr>)
                            })}
                            </tbody>
                        </table> : firstReqBrokers && !brokers.length ?
                            <div className="waiting">ничего не найдено</div> :
                            <div className="waiting">waiting brokers...</div>}
                    </div>
                </Route>
                <Route path={`${match.path}/:id`}>
                    {brokers.length ? <Broker/> : <div className="waiting">waiting broker...</div>}
                </Route>
            </Switch>
        </>
    )
}

Brokers.displayName = 'Brokers'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

// Пример использования LocalStorageComponentsHoc
const localStorageParams = {
    action: type.KAFKA_BREADCRUMBS_UPDATE,
    rememberField: ['name'],
    reducerName: 'cluster'
}

export default connect(mapStateToProps)(LocalStoragePagesHoc(Brokers, localStorageParams))