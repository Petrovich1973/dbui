import React from 'react'

const Acls = () => {
    return (
        <div style={{width: '36em', maxWidth: '100%'}}>
            <h4>ACLs</h4>
            <div style={{opacity: .6}}>
                <p>Kafka ships with a pluggable Authorizer and an out-of-box authorizer implementation that uses
                    ZooKeeper to store all the ACLs. It is important to set ACLs because otherwise access to resources
                    is limited
                    to super users when an authorizer is configured. The default behavior is that if a resource has no
                    associated ACLs, then no one is allowed to access the resource, except super users.</p>
            </div>
        </div>
    )
}

export default Acls