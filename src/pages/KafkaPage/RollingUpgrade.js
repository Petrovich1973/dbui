import React from 'react'

const RollingUpgrade = () => {
    return (
        <div style={{maxWidth: '100%', paddingRight: '1em'}}>
            <h4>Rolling Upgrade</h4>
            <div style={{opacity: .6}}>
                <h6>Upgrade procedures</h6>
                <ol>
                    <li>Consider using Confluent Control Center to
                        monitor broker status during the rolling restart.
                    </li>
                    <li>Determine and install the appropriate Java version. See Supported Java
                        Versions to determine which versions are supported for the
                        Confluent Platform version to which you are upgrading.
                    </li>
                    <li>Determine if clients are co-located with brokers. If they are, then ensure
                        all client processes are not upgraded until <em>all</em> Kafka brokers have been upgraded.
                    </li>
                    <li>Decide on performing a rolling upgrade or a downtime upgrade. Confluent Platform supports
                        both rolling upgrades (upgrade one broker at a time to avoid cluster downtime)
                        and downtime upgrades (take down the entire cluster, upgrade it, and bring
                        everything back up).
                    </li>
                    <li>Upgrade <em>all</em> Kafka brokers (see Upgrade all Kafka brokers).
                    </li>
                    <li>Upgrade Schema Registry, REST Proxy, and Camus (see Upgrade Camus).
                    </li>
                    <li>If it makes sense, build applications that use Kafka producers and consumers
                        against the new 5.4.x libraries and deploy the new versions. See
                        Application Development for more details about using the
                        5.4.x libraries.
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default RollingUpgrade