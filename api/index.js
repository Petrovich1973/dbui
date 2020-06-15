const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = 9000

const app = express()

app.use(cors())
app.use(bodyParser.json())

// data
const clusters = require('./data/kafka/clusters')
const topics = require('./data/kafka/topics')
const brokers = require('./data/kafka/brokers')
const partitions = require('./data/kafka/partitions')

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const randomBool = () => Math.round(Math.random())

const shiftNumber = value => {
    const direct = Math.round(Math.random())

    if(value === 100 || value === 1) return 50

    let result = value
    if (direct) {
        result = value + 1
    } else {
        result = value - 1
    }

    return result
}
/////////////////////////////////////////////
let clustersList = [...clusters.clusters]

const operationClusters = () => {
    clustersList = clustersList
        .map(item => {
            return ({
                ...item,
                system: {
                    ...item.system,
                    cpu: shiftNumber(item.system.cpu)
                }
            })
        })
}
/////////////////////////////////////////////
let topicsList = [...topics.topics]

const operationTopics = () => {

    // topicsList = topicsList
    //     .map(item => {
    //         return ({
    //             ...item,
    //             messagesRead: randomBool() ? item.messagesRead + 1 : item.messagesRead,
    //             messagesWrite: randomBool() ? item.messagesWrite + 1 : item.messagesWrite
    //         })
    //     })
}
//////////////////////////////////////////////
let partitionsList = [...partitions.partitions]

const operationPartitions = () => {
    // generate
}
//////////////////////////////////////////////
let brokersList = [...brokers.brokers]

const operationBrokers = () => {
    // generate
}

app.get('/api/current', (req, res) => {
    res.send({
        version: '1.0.0',
        user: {
            name: 'administrator',
            rights: ['VIEW_ALL', 'WRITE_ALL', 'KAFKA_USE']
        }
    })
})

app.get('/api/clusters', async (req, res) => {
    await operationClusters()
    setTimeout(() => res.send(clustersList), 500)
})

app.get('/api/clusters/:id', async (req, res) => {
    await operationClusters()
    const result = clustersList.find(item => item.id === +req.params.id)
    if (!result) {
        res.sendStatus(404)
    } else {
        res.send(result)
    }
})

app.get('/api/clusters/:cluster/topics', async (req, res) => {
    const result = clustersList.find(item => item.id === +req.params.cluster)

    if (!result) {
        res.sendStatus(404)
    } else {
        await operationTopics()
        setTimeout(() => res.send(topicsList), 500)
    }
})

app.get('/api/clusters/:cluster/topics/:id', async (req, res) => {
    await operationTopics()
    const result = topicsList.find(item => item.id === +req.params.id)
    if (!result) {
        res.sendStatus(404)
    } else {
        res.send(result)
    }
})

app.get('/api/clusters/:cluster/topics/:topic/partitions', (req, res) => {
    const result1 = clustersList.find(item => item.id === +req.params.cluster)
    const result2 = topicsList.find(item => item.id === +req.params.topic)

    const result = result1 && result2

    if (!result) {
        res.sendStatus(404)
    } else {
        setTimeout(() => res.send(partitions.partitions), 300)
    }
})

app.get('/api/clusters/:cluster/topics/:topic/partitions/:id', (req, res) => {
    const result = partitions.partitions[req.params.id]
    if (!result) {
        res.sendStatus(404)
    } else {
        res.send(result)
    }
})

app.get('/api/clusters/:cluster/brokers', (req, res) => {
    setTimeout(() => res.send(brokers.brokers), 100)
})

app.get('/api/clusters/:cluster/brokers/:id', async (req, res) => {
    await operationBrokers()
    const result = brokersList.find(item => item.id === +req.params.id)
    if (!result) {
        res.sendStatus(404)
    } else {
        res.send(result)
    }

})

app.get('/api/clusters/:cluster/brokers/:broker/partitions', (req, res) => {
    setTimeout(() => res.send(partitionsList), 300)
})

app.get('/api/clusters/:cluster/brokers/:broker/partitions/:id', async (req, res) => {
    await operationPartitions()
    const result = partitionsList.find(item => item.id === +req.params.id)
    if (!result) {
        res.sendStatus(404)
    } else {
        res.send(result)
    }
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
