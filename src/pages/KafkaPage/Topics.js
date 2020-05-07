import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as type from "../../constants/actionTypes"
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import Topic from "./Topic"
import {loadTopics} from '../../actions/actionApp'

const Topics = (props) => {
    const {store = {}, dispatch} = props
    const {topics = [], waitingTopics = null, firstReqTopics = false} = store
    const match = useRouteMatch()
    const location = useLocation()

    const isEqualPath = (match.url === location.pathname)

    useEffect(() => {
        dispatch(loadTopics({}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        if (firstReqTopics && !waitingTopics && isEqualPath) {
            timeId = setTimeout(() => dispatch(loadTopics({})), 1000)
        }

        return () => {
            clearTimeout(timeId)
            dispatch({
                type: type.KAFKA_UPDATE,
                payload: {
                    waitingTopics: null
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topics, location])

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChild: {label: 'topics', path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChild: {label: 'topics', path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url, topics])

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`}>
                    <div className="scrollhide">
                        {firstReqTopics && topics.length ? <table className="table">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>messages Read</th>
                                <th>messages Write</th>
                                <th>under Replicated</th>
                                <th>in Sync</th>
                                <th>out Of Sync</th>
                                <th>bytes In PerSec</th>
                                <th>bytes Out PerSec</th>
                            </tr>
                            </thead>
                            <tbody>
                            {topics.map((row, i) => {
                                const {
                                    id = null,
                                    name = null,
                                    messagesRead = null,
                                    messagesWrite = null,
                                    underReplicated = null,
                                    inSync = null,
                                    outOfSync = null,
                                    bytesInPerSec = null,
                                    bytesOutPerSec = null
                                } = row
                                return (
                                    <tr key={i} onClick={() => {
                                        props.history.push(`${match.url}/${id}`)
                                    }}>
                                        <td className="align-center">{id}</td>
                                        <td className="align-center">
                                            <small>{name}</small>
                                        </td>
                                        <td className="align-center">{messagesRead}</td>
                                        <td className="align-center">{messagesWrite}</td>
                                        <td className="align-center">{underReplicated}</td>
                                        <td className="align-center">{inSync}</td>
                                        <td className="align-center">{outOfSync}</td>
                                        <td className="align-center">{bytesInPerSec}</td>
                                        <td className="align-center">{bytesOutPerSec}</td>
                                    </tr>)
                            })}
                            </tbody>
                        </table> : firstReqTopics && !topics.length ? <div className="waiting">ничего не найдено</div> :
                            <div className="waiting">waiting topics...</div>}
                    </div>
                </Route>
                <Route path={`${match.path}/:id`}>
                    {topics.length ? <Topic/> : <div className="waiting">waiting topic...</div>}
                </Route>
            </Switch>
        </>
    )
}

Topics.displayName = 'Topics'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(Topics)
