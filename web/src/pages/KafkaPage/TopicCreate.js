import React, {useState, useEffect, useCallback} from "react"
import {useHistory, useRouteMatch} from 'react-router-dom'
import Button from "../../components/Button";
import {connect} from "react-redux";
import {Input} from "../../components/Input";
import {createTopic, loadDefaultTopic} from "../../actions/actionApp";

function TopicCreate(props) {
    const {store = {}, dispatch} = props
    const {defaultTopic = null} = store
    const history = useHistory()
    const [topic, setTopic] = useState({})
    const [advancedMode, setAdvancedMode] = useState(false)
    const match = useRouteMatch()
    const {config = []} = topic

    useEffect(() => {
        dispatch(loadDefaultTopic())
    }, [dispatch])

    useEffect(() => {
        defaultTopic && setTopic(defaultTopic)
    }, [defaultTopic])

    const onChangeField = useCallback(e => {
        const result = {[e.target.name]: e.target.value}

        setTopic({
            ...topic,
            config: config.map(item => {
                const [key] = Object.keys(item)
                if (key !== e.target.name) return item
                return result
            })
        })
    }, [topic, config])

    const onChangeFieldMain = useCallback(e => {
        const result = {[e.target.name]: e.target.value}

        setTopic({
            ...topic,
            ...result
        })
    }, [topic])

    const rowConfig = (topic?.['replica-assignment'] && topic?.['replica-assignment'].length) || false //NOTE: lodash `_.get(topic, 'foo'`

    const onCreateTopic = useCallback(() => {
        createTopic(topic).then(action => {
            dispatch(action)
        }).then(() => {
                history.push(`${match.url.replace(/\/topicCreate/, '')}/${topic.name}`)
            }
        )
    }, [dispatch, history, match.url, topic])

    const onCancel = useCallback(() => {
        history.push(`${match.url.replace(/\/topicCreate/, '')}`)
    }, [history, match.url])

    return (
        <>
            {defaultTopic && Object.keys(defaultTopic).length ?
                <>
                    <div>
                        <ul className="topicConfigList">
                            <li>
                                <Input
                                    id="topicCreateName"
                                    label="name"
                                    className="sm"
                                    name="name"
                                    value={topic?.name || ''}
                                    onChange={onChangeFieldMain}/>
                            </li>
                            <li>
                                <Input
                                    id="topicCreatePartitions"
                                    label="partitions"
                                    className="sm"
                                    disabled={rowConfig}
                                    name="partitions"
                                    value={rowConfig ? '' : topic?.partitions || ''}
                                    onChange={onChangeFieldMain}/>
                            </li>
                            <li>
                                <Input
                                    id="topicCreateReplicationFactor"
                                    label="replication-factor"
                                    className="sm"
                                    disabled={rowConfig}
                                    name="replication-factor"
                                    value={rowConfig ? '' : topic?.['replication-factor'] || ''}
                                    onChange={onChangeFieldMain}/>
                            </li>
                            <li>
                                <Input
                                    id="topicCreateReplicationAssignment"
                                    label="replica-assignment"
                                    className="sm"
                                    name=" replica-assignment"
                                    value={topic?.['replica-assignment'] || ''}
                                    onChange={onChangeFieldMain}/>
                            </li>
                        </ul>
                        <div className={advancedMode ? 'collapsed hidden-panel'
                            : 'hidden-panel'}>
                            <h5 onClick={() => {
                                setAdvancedMode(!advancedMode)
                            }} className="title">Advanced configuration</h5>
                            {advancedMode ?
                                <ul className="topicConfigList">
                                    {config.map((item, idx) => {
                                        const [key] = Object.keys(item)
                                        return (
                                            <li key={idx}>
                                                <Input
                                                    label={key}
                                                    className="sm"
                                                    name={key}
                                                    value={item[key]}
                                                    onChange={onChangeField}/>
                                            </li>
                                        )
                                    })}
                                </ul> : null}
                        </div>
                    </div>
                    <div className="button-group">
                        <Button onClick={onCancel} text=" Cancel" className="radius sl"/>
                        <Button onClick={onCreateTopic} text=" Create topic" className=" radius sl black"/>
                    </div>
                </> : defaultTopic && !Object.keys(defaultTopic).length ?
                    <p>отсутствуют значения топика по-умолчанию</p> :
                    <p>waiting...</p>
            }
        </>
    )
}

TopicCreate.displayName = 'Create Topic'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(TopicCreate)