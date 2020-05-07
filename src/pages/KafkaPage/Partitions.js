import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as type from "../../constants/actionTypes"
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import Partition from "./Partition"
import {loadPartitions} from "../../actions/actionApp";

const Partitions = (props) => {
    const {store = {}, dispatch} = props
    const {partitions = [], waitingPartitions = null, firstReqPartitions = false} = store
    const match = useRouteMatch()
    const location = useLocation()

    const isEqualPath = (match.url === location.pathname)

    useEffect(() => {
        dispatch(loadPartitions({}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        if (firstReqPartitions && !waitingPartitions && isEqualPath) {
            timeId = setTimeout(() => dispatch(loadPartitions({})), 1000)
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
                                    <th>Имя</th>
                                    <th>Роль</th>
                                    <th>Статус</th>
                                </tr>
                                </thead>
                                <tbody>
                                {partitions.map((row, i) => {
                                    const {
                                        id = null,
                                        name = null,
                                        role = null,
                                        status = null
                                    } = row
                                    return (
                                        <tr key={i} onClick={() => {
                                            props.history.push(`${match.url}/${id}`)
                                        }}>
                                            <td>{id}</td>
                                            <td className="align-center"><small>{name}</small></td>
                                            <td>{role}</td>
                                            <td>{status}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table> : firstReqPartitions && !partitions.length ? <div className="waiting">ничего не найдено</div> :
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
    store: state.reducerKafka
})

export default connect(mapStateToProps)(Partitions)