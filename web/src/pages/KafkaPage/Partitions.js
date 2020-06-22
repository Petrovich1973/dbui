import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as type from "../../constants/actionTypes"
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import Partition from "./Partition"
import {loadPartitions} from "../../actions/actionApp";

const Partitions = (props) => {
    const {store = {}, hostApi = '', dispatch} = props
    const {partitions = [], waitingPartitions = null, firstReqPartitions = false} = store
    const match = useRouteMatch()
    const location = useLocation()

    const isEqualPath = (match.url === location.pathname)
    const url = `${hostApi}${match.url.replace(/\/console\/kafka/, '')}`

    useEffect(() => {
        dispatch(loadPartitions({params: {}, url}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        if (firstReqPartitions && !waitingPartitions && isEqualPath) {
            timeId = setTimeout(() => dispatch(loadPartitions({params: {}, url})), 1000)
        }

        return () => {
            clearTimeout(timeId)
            dispatch({
                type: type.KAFKA_UPDATE,
                payload: {
                    waitingPartitions: null
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partitions, location])

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChildSecond: {label: 'partitions', path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChildSecond: {label: 'partitions', path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url, partitions])

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <div>
                        {firstReqPartitions && partitions.length ? <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Brokers ids</th>
                                <th>Isr</th>
                                <th>Osr</th>
                                <th>Leader</th>
                            </tr>
                            </thead>
                            <tbody>
                            {partitions.map((row, i) => {
                                const {
                                    id = null,
                                    replicas = [],
                                    isr = [],
                                    osr = [],
                                    leader = null
                                } = row
                                return (
                                    <tr key={i} onClick={() => {
                                        props.history.push(`${match.url}/${id}`)
                                    }}>
                                        <td className="align-right">{id}</td>
                                        <td>
                                            {Array.isArray(replicas) && replicas.join(', ')}
                                        </td>
                                        <td>
                                            {Array.isArray(isr) && isr.join(', ')}
                                        </td>
                                        <td>
                                            {Array.isArray(osr) && osr.join(', ')}
                                        </td>
                                        <td>{leader}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table> : firstReqPartitions && !partitions.length ?
                            <div className="waiting">ничего не найдено</div> :
                            <div className="waiting">waiting topics...</div>}
                    </div>
                </Route>
                <Route path={`${match.path}/:id`}>
                    {partitions.length ? <Partition/> : <div className="waiting">waiting partition...</div>}
                </Route>
            </Switch>
        </>
    )
}

Partitions.displayName = 'Partitions'

const mapStateToProps = state => ({
    store: state.reducerKafka,
    hostApi: state.reducerApp.settings.hostApi
})

export default connect(mapStateToProps)(Partitions)