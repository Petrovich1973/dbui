import axios from 'axios'

import * as types from '../constants/actionTypes'
import * as api from "../constants/api"

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

        axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}`, {
            params
        })
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
                        clusters: initializeClusters, // заглушка
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

        axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${id}`)
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

        axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/topics`, {
            params
        })
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
                const is404 = error.request.status === 404
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        topics: is404 ? [] : initializeTopics, // заглушка
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

        axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/topics/${id}`)
            .then((response) => {
                const isActualResponse = dispatch(getReducerKafka()).waitingTopic === timeRequest
                if (isActualResponse) {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            topic: response.data,
                            waitingTopic: null,
                            firstReqTopic: true
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
                            topic: {name: `id ${id} not found`},
                            waitingTopic: null,
                            firstReqTopic: true,
                        }
                    })
                } else {
                    dispatch({
                        type: types.KAFKA_UPDATE,
                        payload: {
                            topic: {...dispatch(getReducerKafka()).topics.find(item => item.id === +id)},
                            waitingTopic: null,
                            firstReqTopic: true,
                        }
                    })
                }
                handleCatch(error, timeRequest)
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

        axios.get(url, {
            params
        })
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
                const is404 = error.request.status === 404
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        partitions: is404 ? [] : initializePartitions, // заглушка
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

        axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/brokers`, {
            params
        })
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
                const is404 = error.request.status === 404
                dispatch({
                    type: types.KAFKA_UPDATE,
                    payload: {
                        brokers: is404 ? [] : initializeBrokers, // заглушка
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

        axios.get(`${dispatch(getReducerApp()).settings.hostApi}${api.kafka_clusters}/${dispatch(getReducerKafka()).cluster.id}/brokers/${id}`)
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


////////////////////////////////////////////////////////////////

const initializeClusters = [
    {
        id: 1010,
        name: 'clusterName_000',
        host: 'localhost:9100',
        topics: 23,
        partitions: {
            total: 78,
            online: 17,
            inSync: 58,
            outOfSync: 20,
            underReplicated: 0
        },
        controllerId: 32461,
        system: {
            cpu: 27,
            disk: '1000Gb/1200Gb',
            ram: '1320Mb/2400Mb'
        }
    },
    {
        id: 1,
        name: 'clusterName_001',
        host: 'localhost:4100',
        topics: 42,
        partitions: {
            total: 82,
            online: 17,
            inSync: 58,
            outOfSync: 20,
            underReplicated: 0
        },
        controllerId: 32461,
        system: {
            cpu: 82,
            disk: '2000Gb/3000Gb',
            ram: '6200Mb/240000Mb'
        }
    },
    {
        id: 2,
        name: 'clusterName_002',
        host: 'localhost:2100',
        topics: 24,
        partitions: {
            total: 81,
            online: 17,
            inSync: 58,
            outOfSync: 20,
            underReplicated: 0
        },
        controllerId: 32461,
        system: {
            cpu: 67,
            disk: '1000Gb/2000Gb',
            ram: '7200Mb/8400Mb'
        }
    },
    {
        id: 3,
        name: 'clusterName_003',
        host: 'localhost:3130',
        topics: 34,
        partitions: {
            total: 66,
            online: 47,
            inSync: 88,
            outOfSync: 21,
            underReplicated: 1
        },
        controllerId: 72461,
        system: {
            cpu: 97,
            disk: '7800Gb/9200Gb',
            ram: '350Mb/800Mb'
        }
    },
    {
        id: 4,
        name: 'clusterName_004',
        host: 'localhost:4430',
        topics: 94,
        partitions: {
            total: 16,
            online: 88,
            inSync: 22,
            outOfSync: 73,
            underReplicated: 3
        },
        controllerId: 12461,
        system: {
            cpu: 96,
            disk: '1000Gb/120000Gb',
            ram: '6200Mb/24000Mb'
        }
    },
    {
        id: 5,
        name: 'clusterName_005',
        host: 'localhost:4550',
        topics: 935,
        partitions: {
            total: 106,
            online: 288,
            inSync: 722,
            outOfSync: 173,
            underReplicated: 343
        },
        controllerId: 12461,
        system: {
            cpu: 60,
            disk: '1000Gb/120000Gb',
            ram: '16200Mb/24000Mb'
        }
    }
]

const initializeTopics = [
    {
        id: 1010,
        name: 'topicrName_000',
        underReplicated: 23,
        inSync: 89,
        outOfSync: 36,
        bytesInPerSec: 81,
        bytesOutPerSec: 17
    },
    {
        id: 1,
        name: 'topicrName_001',
        underReplicated: 13,
        inSync: 39,
        outOfSync: 32,
        bytesInPerSec: 41,
        bytesOutPerSec: 77
    },
    {
        id: 2,
        name: 'topicrName_002',
        underReplicated: 23,
        inSync: 74,
        outOfSync: 52,
        bytesInPerSec: 55,
        bytesOutPerSec: 23
    }
]

const initializePartitions = [
    {id: 1010, replicas: [1,2,3,4], isr: [2,3,1], osr: [4], leader: 1},
    {id: 1, replicas: [5,6,7,8], isr: [6,7,5], osr: [8], leader: 5},
    {id: 2, replicas: [9,10,11,12], isr: [10,11,9], osr: [12], leader: 9},
    {id: 3, replicas: [13,14,15,16], isr: [14,15,13], osr: [16], leader: 13}
]

const initializeBrokers = [
    {
        id: 1010,
        partitions: {
            total: 10,
            inSync: 5,
            outOfSync: 5,
            underReplicated: 0
        },
        production: {
            bytesInPerSec: 100,
            requestLatency: {
                "95th percentile": 100,
                "99.9th percentile": 99
            },
            faileRequests: 1
        },
        consumption: {
            bytesInPerSec: 100,
            requestLatency: {
                "95th percentile": 100,
                "99.9th percentile": 99
            },
            faileRequests: 1
        },
        system: {
            cpu: 80,
            disk: "100 GB",
            ram: "40 GB"
        }
    },
    {
        id: 1,
        partitions: {
            total: 50,
            inSync: 25,
            outOfSync: 25,
            underReplicated: 0
        },
        production: {
            bytesInPerSec: 300,
            requestLatency: {
                "95th percentile": 100,
                "99.9th percentile": 99
            },
            faileRequests: 1
        },
        consumption: {
            bytesInPerSec: 100,
            requestLatency: {
                "95th percentile": 100,
                "99.9th percentile": 99
            },
            faileRequests: 1
        },
        system: {
            cpu: 90,
            disk: "100 GB",
            ram: "40 GB"
        }
    }
]