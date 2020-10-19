const jsonServer = require('json-server')
const cors = require('cors')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const app = jsonServer.create()
const adapter = new FileAsync('./db.json')

app.use(function (req, res, next) {
    setTimeout(next, 700);
});

app.use(bodyParser.json())
app.use(cors())

low(adapter)
    .then(db => {

        app.get('/api/clusters', (req, res) => {
            const clusters = db.get('clusters')
            res.send(clusters)
        })

        app.get('/api/clusters/:id', (req, res) => {
            const cluster = db.get('clusters')
                .find({id: +req.params.id})
                .value()
            res.send(cluster)
        })

        app.get('/api/clusters/:id/brokers', (req, res) => {
            const brokers = db.get('brokers')
            res.send(brokers)
        })

        app.get('/api/clusters/:id/brokers/:id', (req, res) => {
            const broker = db.get('brokers')
                .find({id: +req.params.id})
                .value()
            res.send(broker)
        })

        app.get('/api/clusters/:id/brokers/:id/partitions', (req, res) => {
            const partitions = db.get('partitions')
            res.send(partitions)
        })

        app.get('/api/clusters/:id/brokers/:id/partitions/:id', (req, res) => {
            const partition = db.get('partitions')
                .find({id: +req.params.id})
                .value()
            res.send(partition)
        })

        app.get('/api/clusters/:id/topics', (req, res) => {
            const topics = db.get('topics')
            res.send(topics)
        })

        app.get('/api/clusters/:id/topics/:name', (req, res) => {
            const topic = db.get('topics')
                .find({name: req.params.name})
                .value()
            res.send(topic)
        })

        app.get('/api/clusters/:id/topics/:name/config', (req, res) => {
            const topic = db.get('topicsConfigs')
                .find({name: req.params.name})
                .value()
            res.send(topic)
        })

        app.post('/api/clusters/:id/topics', (req, res) => {
            db.get('topicsConfigs')
                .push(req.body)
                .last()
                .write()
            db.get('topics')
                .push({
                    name: req.body.name,
                    underReplicated: 0,
                    inSync: 0,
                    outOfSync: 0,
                    bytesInPerSec: 0,
                    bytesOutPerSec: 0
                })
                .last()
                .write()
                .then(topic => res.send(topic))

        })

        app.put('/api/clusters/:id/topics/:name', (req, res) => {
            db.get('topicsConfigs')
                .find({name: req.params.name})
                .assign({...req.body})
                .write()
            db.get('topics')
                .find({name: req.params.name})
                .assign({name: req.body.name})
                .write()
                .then(topicConfig => res.send(topicConfig))
        })

        app.delete('/api/clusters/:id/topics/:name', (req, res) => {
            db.get('topicsConfigs')
                .remove({name: req.params.name})
                .write()
            db.get('topics')
                .remove({name: req.params.name})
                .write()
                .then(() => {
                    res.send(req.params.name)
                })
        })

        app.get('/api/clusters/:id/topics/:name/partitions', (req, res) => {
            const partitions = db.get('partitions')
            res.send(partitions)
        })

        app.get('/api/clusters/:id/topics/:name/partitions/:id', (req, res) => {
            const partition = db.get('partitions')
                .find({id: +req.params.id})
                .value()
            res.send(partition)
        })

        app.get('/api/clusters/:id/defaults/topic', (req, res) => {
            const defaultTopic = db.get('defaultTopic')
            res.send(defaultTopic)
        })

        app.get('/api/clusters/:id/acls', (req, res) => {
            res.send(db.get('acls'))
        })

        app.post('/api/clusters/:id/acls', (req, res) => {
            db.get('acls')
                .push(req.body)
                .last()
                .write()
                .then(acl => res.send(acl))

        })

    })
    .then(() => {
        app.listen(9000, () => console.log('listening on port 9000'))
    })