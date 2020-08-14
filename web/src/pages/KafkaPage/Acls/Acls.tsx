import React, {useEffect} from 'react'
import {useResourceAcls} from "./hooks/useResourceAcls";
import {LoaderHolder} from "../../../components/LoaderHolder/LoaderHolder";
import {useResourceAcls2Acls} from "./hooks/useResourceAcls2Acls";
import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "../../../components/Table/styled";
import {AclPage} from "./styled";

export interface AclsProps {
    clusterId: number
}

export const Acls = (p: AclsProps) => {
    const {resourceAcls, getResourceAcls} = useResourceAcls(p.clusterId)

    const acls = useResourceAcls2Acls(resourceAcls)

    useEffect(() => {
        if (resourceAcls) { //TODO реализовать отображение в рамках DBUI-29
            console.log(resourceAcls)
        }
    }, [resourceAcls])

    return (
        <AclPage>
            <h4>ACLs</h4>
            <LoaderHolder loader={getResourceAcls}>
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
                    {acls?.map(a => (
                        <TableRow>
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
                {/*<div style={{opacity: .6}}>*/}
                {/*    <p>Kafka ships with a pluggable Authorizer and an out-of-box authorizer implementation that uses*/}
                {/*        ZooKeeper to store all the ACLs. It is important to set ACLs because otherwise access to resources*/}
                {/*        is limited*/}
                {/*        to super users when an authorizer is configured. The default behavior is that if a resource has no*/}
                {/*        associated ACLs, then no one is allowed to access the resource, except super users.</p>*/}
                {/*</div>*/}
            </LoaderHolder>
        </AclPage>
    )
}