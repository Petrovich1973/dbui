import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {postAcl} from '../../../actions/actionApp'

const AclCreate = (p: any) => {

    const history = useHistory()

    const [valid, setValid] = useState(false)

    const [fields, setFields] = useState({
        principal: "98",
        host: "",
        operation: "operation full",
        permissionType: "admin"
    })

    useEffect(() => {
        if (p.store.aclCreateComplete) {
            history.push(p.parent)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [p.store.aclCreateComplete])

    const send = () => {
        p.dispatch(postAcl(p.clusterId, fields))
    }

    const onChangeField = (field: Object) => {
        setFields((old) => ({...old, ...field}))

        const isValid = Object.values(field)[0].length

        setValid(isValid)
    }

    return (
        <div>
            <h4>create ACLs</h4>
            <table>
                <tbody>
                <tr>
                    <td>host</td>
                    <td>
                        <input
                            type="text"
                            value={fields.host}
                            onChange={e => onChangeField({host: e.target.value})}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <button style={valid ? {cursor: 'pointer', background: 'blue', color: 'white'} : {opacity: 0.4}} onClick={send} disabled={!valid}>
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