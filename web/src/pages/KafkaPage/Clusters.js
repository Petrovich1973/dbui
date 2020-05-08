import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as type from "../../constants/actionTypes"
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import Cluster from "./Cluster"
import classnames from "classnames"
import {loadClusters} from '../../actions/actionApp'

const Clusters = (props) => {
    const {store = {}, dispatch} = props
    const {clusters = [], waiting = null, firstReq = false} = store
    const match = useRouteMatch()
    const location = useLocation()

    const isEqualPath = (match.url === location.pathname)

    useEffect(() => {
        dispatch(loadClusters({}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        if (firstReq && !waiting && isEqualPath) {
            timeId = setTimeout(() => dispatch(loadClusters({})), 1000)
        }

        return () => {
            clearTimeout(timeId)
            dispatch({
                type: type.KAFKA_UPDATE,
                payload: {
                    waiting: null
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clusters, location])

    useEffect(() => {
        dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusters: {label: 'clusters', path: match.url}}
        })
        return () => {
            dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusters: {label: 'clusters', path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url])

    const cpuColor = value => {
        if (value < 30) return 'green'
        if (value < 80) return 'yellow'
        return 'red'
    }

    // console.log('Clusters', props)

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <div className="scrollhide" style={{fontSize: '100%', height: '100%', overflow: 'auto'}}>
                        {firstReq ? <table className="table">
                            <colgroup>
                                <col span="4"/>
                                <col className="col-yellow" span="5"/>
                                <col span="1"/>
                                <col className="col-blue" span="3"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th rowSpan={2}>id</th>
                                <th rowSpan={2}>name</th>
                                <th rowSpan={2}>host</th>
                                <th rowSpan={2}>topics</th>
                                <th className="border-bottom opacity" colSpan={5}>partitions</th>
                                <th rowSpan={2}>controller id</th>
                                <th className="border-bottom opacity" colSpan={3}>system</th>
                            </tr>
                            <tr>
                                <th>total</th>
                                <th>online</th>
                                <th>in sync</th>
                                <th>out of sync</th>
                                <th>under replicated</th>
                                <th>cpu</th>
                                <th>disk</th>
                                <th>ram</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clusters.map((row, i) => {
                                const {
                                    id = null,
                                    name = null,
                                    host = null,
                                    topics: {
                                        totalTopic = row.topics.total
                                    },
                                    partitions: {
                                        totalPart = row.partitions.total,
                                        online = null,
                                        inSync = null,
                                        outOfSync = null,
                                        underReplicated = null
                                    },
                                    controllerId = null,
                                    system: {
                                        cpu = null,
                                        disk = null,
                                        ram = null
                                    }
                                } = row

                                return (
                                    <tr key={i} onClick={() => {
                                        props.history.push(`${match.url}/${id}`)
                                    }}>
                                        <td className="align-center">{id}</td>
                                        <td className="align-center"><small>{name}</small></td>
                                        <td className="align-center"><small>{host}</small></td>
                                        <td className="align-center">{totalTopic}</td>
                                        <td className="align-center">{totalPart}</td>
                                        <td className="align-center">{online}</td>
                                        <td className="align-center">{inSync}</td>
                                        <td className="align-center">{outOfSync}</td>
                                        <td className="align-center">{underReplicated}</td>
                                        <td className="align-center">{controllerId}</td>
                                        <td className={classnames("align-center", cpuColor(cpu))}>{cpu}</td>
                                        <td className="align-center"><small>{disk}</small></td>
                                        <td className="align-center"><small>{ram}</small></td>
                                    </tr>)
                            })}
                            </tbody>
                        </table> : <div className="waiting">waiting clusters...</div>}
                    </div>
                </Route>
                <Route path={`${match.path}/:id`}>
                    {clusters.length ? <Cluster/> : <div className="waiting">waiting cluster...</div>}
                </Route>
            </Switch>
        </>
    )
}

Clusters.displayName = 'Clusters'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(Clusters)

// const scheme = {
//     name: 'kafkaCluster1',
//     zookeeper: 'grid1220:2181',
//     saslMechanism: 'PLAIN',
//     securityProtocol: 'PLAINTEXT',
//     groupOffsetReaderThreadPoolSize: 8,
//     rollingRestartConfig: {
//         sshUser: 'kafka',
//         sshPassword: 'kafka',
//         pathToKafka: '/opt/u01/kafka',
//         startBrokerScriptName: 'kafka-server-start',
//         startBrokerPropertiesFilePath: '/opt/u01/kafka/etc/kafka/server.properties',
//         stopBrokerScriptName: 'kafka-server-stop',
//         kafkaServiceName: 'kafka.service',
//         globalRestartTimeout: 3600000,
//         stopBrokerCheckingTimeout: 10000,
//         stopBrokerCheckingCount: 1000,
//         brokerJmxPort: 7010,
//         jmxUserLogin: 'myuser',
//         jmxUserPassword: 'mypassword',
//         sslJmx: false
//     }
// }
