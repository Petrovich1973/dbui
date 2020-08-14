import React, {useEffect, useState, useCallback} from "react"
import {useHistory, useParams, useRouteMatch} from 'react-router-dom'
import {connect} from "react-redux";
import {InputWithConfirm} from "../../components/InputWithConfirm";
import {updateTopic} from "../../actions/actionApp";
import * as types from "../../constants/actionTypes";

function TopicConfig(props) {
    const {store = {}, dispatch} = props
    const history = useHistory()
    const {topicConfig = {}, firstReqTopic = false, topicRedirect = null, elementsWaiting = []} = store
    const {name: topicName = ''} = topicConfig
    const [waiting] = useState(false)
    const [topicForm, setTopicForm] = useState({})
    const match = useRouteMatch()

    const {config = []} = topicForm
    const {id = null} = useParams()

    useEffect(() => {
        setTopicForm(topicConfig)
        // eslint-disable-next-line
    }, [firstReqTopic, topicName])

    useEffect(() => {
        topicRedirect && history.push(`${match.url.substring(0, match.url.lastIndexOf("/"))}/${topicConfig.name}`)
        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                topicRedirect: null
            }
        })
        // eslint-disable-next-line
    }, [topicRedirect])

    const onClickCancelBtnMain = useCallback( name => () => {
        setTopicForm({
            ...topicForm,
            ...{[name]: topicConfig[name]}
        })
    }, [topicForm, topicConfig])

    const onClickCancelBtn = useCallback( name => () => {
        const {config = []} = topicConfig
        setTopicForm({
            ...topicForm,
            config: topicForm.config.map(item => {
                const [key] = Object.keys(item)
                if (key !== name) return item
                return config.find(x => Object.keys(x)[0] === name)
            })
        })
    }, [topicForm, topicConfig])

    const onClickOkBtn = useCallback( name => () => {
        const applyChanges = () => {
            try {
                dispatch(updateTopic(id, topicForm, name))
            } catch (e) {
                console.log(e)
            }
        }
        if (name === 'name') {
            if (window.confirm("Будет совершен переход на новую страницу")) {
                applyChanges()
            } else {
                return false;
            }
        } else {
            applyChanges()
        }
    }, [id, topicForm, dispatch])

    const onKeyUpField = useCallback( e => {
        const isEnter = e.keyCode === 13
        const elementName = e.target.name

        const applyChanges = () => {
            try {
                dispatch(updateTopic(id, topicForm, elementName))
            } catch (e) {
                console.log(e)
            }
        }
        if (isEnter && elementName === 'name') {
            if (window.confirm("Будет совершен переход на новую страницу")) {
                applyChanges()
            } else {
                return false;
            }
        } else if (isEnter) {
            applyChanges()
        }
    }, [id, topicForm, dispatch])

    const onChangeFieldMain = useCallback( e => {
        const result = {[e.target.name]: e.target.value}

        setTopicForm({
            ...topicForm,
            ...result
        })
    }, [topicForm])

    const onChangeField = useCallback( e => {
        const result = {[e.target.name]: e.target.value}

        setTopicForm({
            ...topicForm,
            config: config.map(item => {
                const [key] = Object.keys(item)
                if (key !== e.target.name) return item
                return result
            })
        })
    }, [topicForm, config])

    const rowConfig = (topicForm['replica-assignment'] && topicForm['replica-assignment'].length) || false

    return (
        <div className="detail align-left">
            {waiting ? <h2>waiting...</h2> : null}
            {Object.keys(topicForm).length ? <ul className="topicConfigList editInputList">
                <li>
                    <InputWithConfirm
                        id="topicConfigName"
                        label="name"
                        disabled={elementsWaiting.includes("name")}
                        className="sm title"
                        autoComplete="off"
                        name="name"
                        value={'name' in topicForm && topicForm.name}
                        onKeyUp={onKeyUpField}
                        onChange={onChangeFieldMain}
                        onClickOk={onClickOkBtn('name')}
                        onClickCancel={onClickCancelBtnMain('name')}
                    />
                </li>
                <li>
                    <InputWithConfirm
                        id="topicConfigPartitions"
                        label="partitions"
                        disabled={elementsWaiting.includes("partitions")}
                        className="sm"
                        autoComplete="off"
                        name="partitions"
                        value={'partitions' in topicForm && rowConfig ? '' : topicForm.partitions}
                        onKeyUp={onKeyUpField}
                        onChange={onChangeFieldMain}
                        onClickOk={onClickOkBtn('partitions')}
                        onClickCancel={onClickCancelBtnMain('partitions')}
                    />
                </li>
                <li>
                    <InputWithConfirm
                        id="topicConfigReplicationFactor"
                        label="replication-factor"
                        disabled={elementsWaiting.includes("replication-factor")}
                        className="sm"
                        autoComplete="off"
                        name="replication-factor"
                        value={'replication-factor' in topicForm && rowConfig ? '' : topicForm['replication-factor']}
                        onKeyUp={onKeyUpField}
                        onChange={onChangeFieldMain}
                        onClickOk={onClickOkBtn('replication-factor')}
                        onClickCancel={onClickCancelBtnMain('replication-factor')}
                    />
                </li>
                <li>
                    <InputWithConfirm
                        id="topicConfigReplicaAssignment"
                        label="replica-assignment"
                        disabled={elementsWaiting.includes("replica-assignment")}
                        className="sm"
                        autoComplete="off"
                        name="replica-assignment"
                        placeholder={!('replica-assignment' in topicForm && topicForm['replica-assignment']) ? '---' : ''}
                        value={'replica-assignment' in topicForm && topicForm['replica-assignment']}
                        onKeyUp={onKeyUpField}
                        onChange={onChangeFieldMain}
                        onClickOk={onClickOkBtn('replica-assignment')}
                        onClickCancel={onClickCancelBtnMain('replica-assignment')}
                    />
                </li>
            </ul> : null}
            <ul className="topicConfigList editInputList">
                {config.map((item, idx) => {
                    const [key] = Object.keys(item)
                    return (
                        <li key={idx}>
                            <InputWithConfirm
                                id={`topicConfig${key}`}
                                label={key}
                                disabled={elementsWaiting.includes(key)}
                                className="sm"
                                name={key}
                                value={item[key]}
                                placeholder={!item[key] ? '---' : ''}
                                onKeyUp={onKeyUpField}
                                onChange={onChangeField}
                                onClickOk={onClickOkBtn(key)}
                                onClickCancel={onClickCancelBtn(key)}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

TopicConfig.displayName = 'Topic Config'

const mapStateToProps = state => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(TopicConfig)