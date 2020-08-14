import axios from 'axios'

import * as types from '../constants/actionTypes'
import * as api from "../constants/api"
import {withErrorHandle, defaultTopic} from "../utils/api";

const handleCatch = (error, timeRequest) => {
    try {
        console.log('handleCatch', error.response.status, error.response.data)
    } catch (e) {
        console.dir(error.message)
    }
    // if (!error.response) {
    //     // network error
    // } else {
    //     // http status code
    //     const code = error.response.status
    //     // response data
    //     const response = error.response.data
    // }
}

const getReducerApp = () => (dispatch, getState) => getState().reducerApp
const getReducerKafka = () => (dispatch, getState) => getState().reducerKafka


// APACHE KAFKA

// Clusters
export const loadClusters = ({params = {}}) => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waiting: timeRequest
            }
        })

        withErrorHandle(axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}`, {
            params
        }))
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waiting === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            clusters: response.data,
                            waiting: null,
                            firstReq: true
                        }
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        clusters: [],
                        waiting: null,
                        firstReq: true
                    }
                })
                handleCatch(error, timeRequest)
            })
    }
}

export const loadCluster = id => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingCluster: timeRequest
            }
        })

        withErrorHandle(axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${id}`))
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingCluster === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            cluster: response.data,
                            waitingCluster: null,
                            firstReqCluster: true
                        }
                    })
                }
            })
            .catch(error => {
                const is404 = error.request.status === 404
                if (is404) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            cluster: {name: `id ${id} not found`},
                            waitingCluster: null,
                            firstReqCluster: true,
                        }
                    })
                } else {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            cluster: {...dispatch(getReducerKafka()).clusters.find(item => item.id === +id)},
                            waitingCluster: null,
                            firstReqCluster: true,
                        }
                    })
                }
                handleCatch(error, timeRequest)
            })
    }
}

// Topics
export const loadTopics = ({params = {}}) => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingTopics: timeRequest
            }
        })

        withErrorHandle(axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/topics`, {
            params
        }))
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingTopics === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            topics: response.data,
                            waitingTopics: null,
                            firstReqTopics: true
                        }
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        topics: [],
                        waitingTopics: null,
                        firstReqTopics: true
                    }
                })
                handleCatch(error, timeRequest)
            })
    }
}

export const loadTopic = id => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingTopic: timeRequest
            }
        })

        const url = `${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}`
        const topic = withErrorHandle(axios.get(`${url}/topics/${id}`))
        const config = withErrorHandle(axios.get(`${url}/topics/${id}/config`))

        axios.all([topic, config])
            .then(axios.spread((...responses) => {

                const isActualResponse = dispatch(getReducerKafka()).waitingTopic === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            topic: responses[0].data,
                            topicConfig: responses[1].data,
                            waitingTopic: null,
                            firstReqTopic: true
                        }
                    })
                }
            })).catch(error => {
            const is404 = error.request.status === 404
            if (is404) {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        topic: {name: `id ${id} not found`},
                        waitingTopic: null,
                        firstReqTopic: true,
                    }
                })
            } else {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        topic: {...dispatch(getReducerKafka()).topics.find(item => item.name === id)},
                        waitingTopic: null,
                        firstReqTopic: true,
                    }
                })
            }
            handleCatch(error, timeRequest)
        })
    }
}

export const loadDefaultTopic = () => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingDefaultTopic: timeRequest
            }
        })

        withErrorHandle(axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/defaults/topic`), {
            timeout: 500
        })
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingDefaultTopic === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            defaultTopic: response.data,
                            waitingDefaultTopic: null
                        }
                    })
                }
            }).catch(error => {
            const is404 = error.request.status === 404
            if (is404) {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        defaultTopic,
                        waitingDefaultTopic: null
                    }
                })
            } else {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        waitingDefaultTopic: null
                    }
                })
            }
            handleCatch(error, timeRequest)
        })
    }
}

export const createTopic = async (data) => {
    return dispatch => {
        withErrorHandle(axios.post(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/topics`,
            data))
            .then((response) => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        topics: [...dispatch(getReducerKafka()).topics, response]
                    }
                })
            })
            .catch(error => {
                handleCatch(error)
            })
    }
}

export const updateTopic = (id, data, elementName) => {
    return dispatch => {
        let set = new Set(dispatch(getReducerKafka()).elementsWaiting)
        set.add(elementName)
        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                elementsWaiting: [...set]
            }
        })

        withErrorHandle(axios.put(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/topics/${id}`,
            data))
            .then((response) => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        topicConfig: response.data,
                        topicRedirect: response.data.name,
                        elementsWaiting: dispatch(getReducerKafka()).elementsWaiting.filter(item => item !== elementName)
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        elementsWaiting: dispatch(getReducerKafka()).elementsWaiting.filter(item => item !== elementName)
                    }
                })
                handleCatch(error)
            })
    }
}

export const deleteTopic = (name) => {
    return dispatch => {
        axios.delete(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/topics/${name}`)
            .then((response) => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        topics: [...dispatch(getReducerKafka()).topics.filter((item) => item.name !== response.data)],
                    }
                })
            })
            .catch(error => {
                handleCatch(error)
            })
    }
}

// Partitions
export const loadPartitions = ({params = {}, url = ''}) => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingPartitions: timeRequest
            }
        })

        withErrorHandle(axios.get(url, {
            params
        }))
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingPartitions === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            partitions: response.data,
                            waitingPartitions: null,
                            firstReqPartitions: true
                        }
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        partitions: [], // заглушка
                        waitingPartitions: null,
                        firstReqPartitions: true
                    }
                })
                handleCatch(error, timeRequest)
            })
    }
}

export const loadPartition = ({id = 0, url = ''}) => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingPartition: timeRequest
            }
        })

        axios.get(url)
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingPartition === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            partition: response.data,
                            waitingPartition: null,
                            firstReqPartition: true
                        }
                    })
                }
            })
            .catch(error => {
                const is404 = error.request.status === 404
                if (is404) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            partition: {name: `id ${id} not found`},
                            waitingPartition: null,
                            firstReqPartition: true,
                        }
                    })
                } else {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            partition: {...dispatch(getReducerKafka()).partitions.find(item => item.id === +id)},
                            waitingPartition: null,
                            firstReqPartition: true,
                        }
                    })
                }
                handleCatch(error, timeRequest)
            })
    }
}

// Brokers
export const loadBrokers = ({params = {}}) => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingBrokers: timeRequest
            }
        })

        withErrorHandle(axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/brokers`, {
            params
        }))
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingBrokers === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            brokers: response.data,
                            waitingBrokers: null,
                            firstReqBrokers: true
                        }
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        brokers: [], // заглушка
                        waitingBrokers: null,
                        firstReqBrokers: true
                    }
                })
                handleCatch(error, timeRequest)
            })
    }
}

export const loadBroker = id => {
    return dispatch => {

        const timeRequest = Date.now()

        dispatch({
            type: types.KAFKA_UPDATE,
            payload: {
                waitingBroker: timeRequest
            }
        })

        withErrorHandle(axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/brokers/${id}`))
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingBroker === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            broker: response.data,
                            waitingBroker: null,
                            firstReqBroker: true
                        }
                    })
                }
            })
            .catch(error => {
                const is404 = error.request.status === 404
                if (is404) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            broker: {name: `id ${id} not found`},
                            waitingBroker: null,
                            firstReqBroker: true,
                        }
                    })
                } else {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            broker: {...dispatch(getReducerKafka()).brokers.find(item => item.id === +id)},
                            waitingBroker: null,
                            firstReqBroker: true,
                        }
                    })
                }
                handleCatch(error, timeRequest)
            })
    }
}