import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as type from "../../constants/actionTypes"
import {Route, Switch, useRouteMatch, useLocation} from 'react-router-dom'
import Topic from "./Topic"
import {deleteTopic, loadTopics} from '../../actions/actionApp'
import TopicCreate from "./TopicCreate";
import Button from "../../components/Button";
import {SideBar} from "../../components/SideBar";
import {IconDelete} from "../../svg";
import classnames from 'classnames';

const Topics = (props) => {
    const {store = {}, dispatch} = props
    const {topics = [], waitingTopics = null, firstReqTopics = false} = store
    const match = useRouteMatch()
    const location = useLocation()

    const [listItemWait, setListItemWait] = useState([])

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

    const handleClick = (e, name) => {
        setListItemWait([name, ...listItemWait]);
        dispatch(deleteTopic(name))
        e.stopPropagation()
    }

    return (
        <>
            <Switch>
                <Route exact path={[`${match.path}`, `${match.path}/topicCreate`]}>
                    <div className="mainPanel scrollhide">
                        {firstReqTopics && topics.length ? <table className="table">
                            <thead>
                            <tr>
                                <th>name</th>
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
                                    name = null,
                                    underReplicated = null,
                                    inSync = null,
                                    outOfSync = null,
                                    bytesInPerSec = null,
                                    bytesOutPerSec = null
                                } = row
                                return (
                                    <tr key={i} onClick={() => {
                                        props.history.push(`${match.url}/${name}`)
                                    }} className={classnames(listItemWait.includes(name) && 'wait')}>
                                        <td className="align-center">
                                            <small>{name}</small>
                                        </td>
                                        <td className="align-center">{underReplicated}</td>
                                        <td className="align-center">{inSync}</td>
                                        <td className="align-center">{outOfSync}</td>
                                        <td className="align-center">{bytesInPerSec}</td>
                                        <td className="align-center">{bytesOutPerSec}</td>
                                        <td className="align-center">
                                            <span className='btn' onClick={(e) => handleClick(e, name)}>
                                                <IconDelete size='22px'/>
                                            </span>
                                        </td>
                                    </tr>)
                            })}
                            </tbody>
                        </table> : firstReqTopics && !topics.length ?
                            <div className="waiting">ничего не найдено</div> :
                            <div className="waiting">waiting topics...</div>}
                    </div>
                    <Switch>
                        <Route exact path={`${match.path}`}>
                            <SideBar className="align-left" width={'160px'}>
                                <Button onClick={() => {
                                    props.history.push(`${match.url}/topicCreate`)
                                }} text="New topic" className="border radius sl"/>
                            </SideBar>
                        </Route>
                        <Route exact path={`${match.path}/topicCreate`}>
                            <SideBar className="align-left" width={'30%'} title="New Topic">
                                <TopicCreate/>
                            </SideBar>
                        </Route>
                    </Switch>
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
