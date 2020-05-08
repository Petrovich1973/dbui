import React from 'react'

const RollingRestart = () => {
    return (
        <div style={{width: '36em', maxWidth: '100%'}}>
            <h4>Rolling Restart</h4>
            <div style={{opacity: .6}}>
                <p>The kafka-rolling-restart script can be used to safely restart an entire cluster, one server at a
                    time.
                    The script finds all the servers in a cluster, checks their health status and executes the
                    restart.</p>

                <h4>Cluster health</h4>
                <p>The health of the cluster is defined in terms of broker availability and under replicated partitions.
                    Kafka-rolling-restart will check that all brokers are answering to JMX requests, and that the total
                    numer of under replicated partitions is zero. If both conditions are fulfilled, the cluster is
                    considered healthy and the next broker will be restarted.</p>
            </div>
        </div>
    )
}

export default RollingRestart