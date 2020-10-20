import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {postAcl} from '../../../actions/actionApp'

const AclCreate = (p: any) => {

    const history = useHistory()

    useEffect(() => {
        console.log(p.store.aclCreateComplete)
        if(p.store.aclCreateComplete) {
            history.push(p.parent)
        }
    }, [p.store.aclCreateComplete])

    const send = () => {
        p.dispatch(postAcl(p.clusterId, {
                principal: "555",
                host: "555",
                operation: "555",
                permissionType: "55"
            }))
    }

    return (
        <div>
            <h4>create ACLs</h4>
            <div>
                <button onClick={send}>
                    Send
                </button>
            </div>
        </div>
    )
}

AclCreate.displayName = 'AclCreate'

const mapStateToProps = (state: any) => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(AclCreate)