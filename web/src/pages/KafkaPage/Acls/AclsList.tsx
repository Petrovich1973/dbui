import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as type from "../../../constants/actionTypes"
import {useLocation, useHistory} from 'react-router-dom'
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "../../../components/Table/styled";
import {AclPage} from "./styled";
import {getAcls} from '../../../actions/actionApp'

const AclsList = (p: any) => {

    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        p.dispatch(getAcls(p.clusterId))

        p.dispatch({
            type: type.KAFKA_UPDATE,
            payload: {
                aclCreateComplete: false
            }
        })
    }, [])

    return (
        <AclPage>
            <h4>ACLs List</h4>
            <button onClick={() => history.push(`${location.pathname}/new`)}>Create Acl</button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>Название ресурса</TableHeadCell>
                        <TableHeadCell>Тип ресурса</TableHeadCell>
                        <TableHeadCell>Хост</TableHeadCell>
                        <TableHeadCell>Principal</TableHeadCell>
                        <TableHeadCell>Разрешения</TableHeadCell>
                        <TableHeadCell>Операция</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {p.store.acls.map((a: any, i: number) => (
                        <TableRow key={i}>
                            <TableCell>{a.name}</TableCell>
                            <TableCell>{a.resourceType}</TableCell>
                            <TableCell>{a.host}</TableCell>
                            <TableCell>{a.principal}</TableCell>
                            <TableCell>{a.permissionType}</TableCell>
                            <TableCell>{a.operation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AclPage>
    )
}

AclsList.displayName = 'AclsList'

const mapStateToProps = (state: any) => ({
    store: state.reducerKafka
})

export default connect(mapStateToProps)(AclsList)