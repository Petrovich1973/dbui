import {AxiosResponse, AxiosError} from 'axios'
import {dispatcher} from "../store";

type Response<T> = Promise<AxiosResponse<T>>

/**
 * Функция обертка, для автомотической обработки HTTP ошибок и создания уведомлений об о них
 * @param res промис запроса
 */
export async function withErrorHandle<T>(res: Response<T>): Promise<AxiosResponse<T>> {
    res.catch( (err: AxiosError) => {
        if (err.response && err.response.status >= 400) {
            const res = err.response,
                url = new URL(err.request.responseURL)
            dispatcher.notifies.add({
                variant: "error",
                title: `(${res.status}) ${res.statusText}`,
                message: url.pathname,
                time: 3000
            })
        }
    })

    return res;
}

/**
 * Временная заглушка на случай отстутсвия эндпоинта /api/clusters/:id/defaults/topic и ошибки 404
 */

export const defaultTopic = {
    "name": "topicName",
    "partitions": 3,
    "replication-factor": 2,
    "replica-assignment": "",
    "config": [
        {
            "cleanup.policy": "delete"
        },
        {
            "compression.type": "producer"
        },
        {
            "delete.retention.ms": 86400000
        },
        {
            "file.delete.delay.ms": 60000
        },
        {
            "flush.messages": 9223372036854776000
        },
        {
            "flush.ms": 9223372036854776000
        },
        {
            "follower.replication.throttled.replicas": ""
        },
        {
            "index.interval.bytes": 4096
        },
        {
            "leader.replication.throttled.replicas": ""
        },
        {
            "max.compaction.lag.ms": 9223372036854776000
        },
        {
            "max.message.bytes": 1048588
        },
        {
            "message.downconversion.enable": true
        },
        {
            "message.format.version": "2.5-IV0"
        },
        {
            "message.timestamp.difference.max.ms": 9223372036854776000
        },
        {
            "message.timestamp.type": "CreateTime"
        },
        {
            "min.cleanable.dirty.ratio": 0.5
        },
        {
            "min.compaction.lag.ms": 0
        },
        {
            "min.insync.replicas": 2
        },
        {
            "preallocate": false
        },
        {
            "retention.bytes": -1
        },
        {
            "retention.ms": 604800000
        },
        {
            "segment.bytes": 1073741824
        },
        {
            "segment.index.bytes": 10485760
        },
        {
            "segment.jitter.ms": 0
        },
        {
            "segment.ms": 604800000
        },
        {
            "unclean.leader.election.enable": false
        }
    ],
    "underReplicated": 0,
    "inSync": 0,
    "outOfSync": 0,
    "bytesInPerSec": 0,
    "bytesOutPerSec": 0
}