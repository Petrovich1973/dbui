import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as type from '../../constants/actionTypes'
import {useParams, useRouteMatch} from 'react-router-dom'
import {loadPartition} from "../../actions/actionApp";

const Partition = (props) => {
    const {store = {}, hostApi = '', dispatch} = props
    const {partition = {}, waitingPartition = null, firstReqPartition = false} = store
    const match = useRouteMatch()
    const {id} = useParams()

    // TODO Переписать роутинг - избавиться от необходимости replace
    const url = `${hostApi}${match.url.replace(/\/console\/kafka/, '')}`;

    useEffect(() => {
        dispatch(loadPartition({id, url}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        clearTimeout(timeId)
        if (firstReqPartition && !waitingPartition) {
            timeId = setTimeout(() => dispatch(loadPartition({id, url})), 1000)
        }

        return () => {
            clearTimeout(timeId)
            dispatch({
                type: type.KAFKA_UPDATE,
                payload: {
                    waitingPartition: null
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [partition])

    const {
        replicas = [],
        isr = [],
        osr = [],
        leader = null
    } = partition

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChildSecondName: {label: id, path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChildSecondName: {label: id, path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url, partition])

    return (
        <div>
            <div>
                <small><em>Partition</em></small>
                &nbsp;
                <span style={{fontSize: '120%'}}>{id}</span>
            </div>
            &nbsp;
            <div>
                {firstReqPartition && Object.keys(partition).length ? <table className="table md">
                    <tbody>
                    <tr>
                        <td className="align-right">{id}</td>
                        <td>
                            {Array.isArray(replicas) && replicas
                                .map((el, idxEl) => {
                                    return (
                                        <small key={idxEl}>{el}</small>
                                    )
                                })
                                .reduce((prev, curr) => [prev, ', ', curr])}
                        </td>
                        <td>
                            {Array.isArray(isr) && isr
                                .map((el, idxEl) => {
                                    return (
                                        <small key={idxEl}>{el}</small>
                                    )
                                })
                                .reduce((prev, curr) => [prev, ', ', curr])}
                        </td>
                        <td>
                            {Array.isArray(osr) && osr
                                .map((el, idxEl) => {
                                    return (
                                        <small key={idxEl}>{el}</small>
                                    )
                                })
                                .reduce((prev, curr) => [prev, ', ', curr])}
                        </td>
                        <td>{leader}</td>
                    </tr>
                    </tbody>
                </table> : firstReqPartition && !Object.keys(partition).length ?
                    <div className="waiting">ничего не найдено</div> :
                    <div className="waiting">waiting brokers...</div>}
            </div>
        </div>
    )
}

Partition.displayName = 'Partition'

const mapStateToProps = state => ({
    store: state.reducerKafka,
    hostApi: state.reducerApp.settings.hostApi
})

export default connect(mapStateToProps)(Partition)