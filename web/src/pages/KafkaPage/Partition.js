import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as type from '../../constants/actionTypes'
import {useParams, useRouteMatch} from 'react-router-dom'
import {loadPartition} from "../../actions/actionApp";

const Partition = (props) => {
    const {store = {}, dispatch} = props
    const {partition = {}, waitingPartition = null, firstReqPartition = false} = store
    const match = useRouteMatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(loadPartition(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        clearTimeout(timeId)
        if (firstReqPartition && !waitingPartition) {
            timeId = setTimeout(() => dispatch(loadPartition(id)), 1000)
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
        name = null,
        role = null,
        status = null
    } = partition

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChildSecondName: {label: name, path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChildSecondName: {label: name, path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url, partition])

    return (
        <div>
            <div>
                <small><em>Partition</em></small>
                &nbsp;
                <span style={{fontSize: '120%'}}>{name}</span>
            </div>
            &nbsp;
            <div>
                <table className="table md">
                    <tbody>
                    <tr>
                        <td className="align-right label"><small>role</small></td>
                        <td>{role}</td>
                    </tr>
                    <tr>
                        <td className="align-right label"><small>status</small></td>
                        <td>{status}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Partition.displayName = 'Partition'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(Partition)