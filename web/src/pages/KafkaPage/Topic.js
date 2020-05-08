import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as type from '../../constants/actionTypes'
import {Redirect, Route, Switch, NavLink, Link, useParams, useRouteMatch} from 'react-router-dom'
import Partitions from "./Partitions"
import {loadTopic} from "../../actions/actionApp";

const Topic = (props) => {
    const {store = {}, dispatch} = props
    const {topic = {}, waitingTopic = null, firstReqTopic = false} = store
    const match = useRouteMatch()
    const {id} = useParams()

    const [topicRouters] = useState([
        {title: 'Partitions', path: `/partitions`, component: Partitions}
    ])

    useEffect(() => {
        dispatch(loadTopic(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timeId = null
        clearTimeout(timeId)
        if (firstReqTopic && !waitingTopic) {
            timeId = setTimeout(() => dispatch(loadTopic(id)), 1000)
        }

        return () => {
            clearTimeout(timeId)
            dispatch({
                type: type.KAFKA_UPDATE,
                payload: {
                    waitingTopic: null
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic])

    const {
        name = null,
        messagesRead = null,
        messagesWrite = null,
        underReplicated = null,
        inSync = null,
        outOfSync = null,
        bytesInPerSec = null,
        bytesOutPerSec = null
    } = topic

    useEffect(() => {
        props.dispatch({
            type: type.KAFKA_BREADCRUMBS_UPDATE,
            payload: {clusterChildName: {label: name, path: match.url}}
        })
        return () => {
            props.dispatch({
                type: type.KAFKA_BREADCRUMBS_UPDATE,
                payload: {clusterChildName: {label: name, path: null}}
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url, topic])

    return (
        <div className="scrollhide" style={{fontSize: '100%', height: '100%', overflow: 'auto'}}>
            <nav className="tabs">
                <ul>
                    <li>
                        <NavLink to={`${match.url}`}>
                            <small><em>Topic</em></small>
                            &nbsp;
                            <span style={{fontSize: '140%'}}>{name}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            &nbsp;
            <div>
                <table className="table md">
                    <tbody>
                    <tr>
                        <td className="align-right label">
                            <small>messages Read</small>
                        </td>
                        <td>{messagesRead}</td>
                        <td/>
                        <td className="align-right label">
                            <small>messages Write</small>
                        </td>
                        <td>{messagesWrite}</td>
                        <td/>
                        <td className="align-right label">
                            <small>bytes Out PerSec</small>
                        </td>
                        <td>{bytesOutPerSec}</td>
                    </tr>
                    <tr>
                        <td className="align-right label">
                            <small>under Replicated</small>
                        </td>
                        <td>{underReplicated}</td>
                        <td/>
                        <td className="align-right label">
                            <small>in Sync</small>
                        </td>
                        <td>{inSync}</td>
                        <td/>
                        <td colSpan={2}/>
                    </tr>
                    <tr>
                        <td className="align-right label">
                            <small>out Of Sync</small>
                        </td>
                        <td>{outOfSync}</td>
                        <td/>
                        <td className="align-right label">
                            <small>bytes In PerSec</small>
                        </td>
                        <td>{bytesInPerSec}</td>
                        <td/>
                        <td colSpan={2}/>
                    </tr>
                    </tbody>
                </table>
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
                {name && topicRouters
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

Topic.displayName = 'Topic'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(Topic)