import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import * as type from "../../../constants/actionTypes"
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import Cluster from "../Cluster"
import {loadClusters} from '../../../actions/actionApp'
import {ClustersTable} from "./components/ClustersTable";
import {useStateSelector} from "../../../hooks/utils/useStateSelector";

const Clusters = () => {
    const store = useStateSelector(s => s.reducerKafka),
        dispatch = useDispatch()

    const {clusters = [], waiting = null, firstReq = false} = store
    const match = useRouteMatch()
    const location = useLocation()

    const isEqualPath = (match.url === location.pathname)

    useEffect(() => {
        dispatch(loadClusters({}))
    }, [dispatch])

    useEffect(() => {
        let timeId = null
        if (firstReq && !waiting && isEqualPath) {
            timeId = setTimeout(() => dispatch(loadClusters({})), 1000)
            return () => {
                clearTimeout(timeId)
                dispatch({
                    type: type.KAFKA_UPDATE,
                    payload: {
                        waiting: null
                    }
                })
            }
        }
    }, [clusters, dispatch, firstReq, isEqualPath, location, waiting])

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
    }, [dispatch, match.url])

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <div className="scrollhide" style={{fontSize: '100%', height: '100%', overflow: 'auto'}}>
                        {firstReq  && clusters.length ? (<ClustersTable clusters={clusters} />) : firstReq && !clusters.length ?
                            <div className="waiting">ничего не найдено</div> :
                            <div className="waiting">waiting clusters...</div>}
                    </div>
                </Route>
                <Route path={`${match.path}/:id`}>
                    {clusters.length ? <Cluster/> : <div className="waiting">waiting cluster...</div>}
                </Route>
            </Switch>
        </>
    )
}

export default Clusters