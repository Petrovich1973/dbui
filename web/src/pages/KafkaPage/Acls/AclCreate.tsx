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
                principal: "777",
                host: "777",
                operation: "777",
                permissionType: "777"
            }))
    }

    return (
        <div>
            <h4>create ACLs</h4>
            <div>
                <button onClick={send}>
                    Create new ACL
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