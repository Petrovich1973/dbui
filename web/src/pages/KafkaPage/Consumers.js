import React from 'react'

const Consumers = () => {
    return (
        <div style={{width: '36em', maxWidth: '100%'}}>
            <h4>Consumers</h4>
            <div style={{opacity: .6}}>
                <p>Suppose you have an application that needs to read messages from a Kafka topic, run some validations
                    against them, and write the results to another data store. In this case your application will create
                    a
                    consumer object, subscribe to the appropriate topic, and start receiving messages, validating them
                    and
                    writing the results. This may work well for a while, but what if the rate at which producers write
                    messages to the topic exceeds the rate at which your application can validate them? If you are
                    limited
                    to a single consumer reading and processing the data, your application may fall farther and farther
                    behind, unable to keep up with the rate of incoming messages. Obviously there is a need to scale
                    consumption from topics. Just like multiple producers can write to the same topic, we need to allow
                    multiple consumers to read from the same topic, splitting the data between them.</p>
            </div>
        </div>
    )
}

export default Consumers