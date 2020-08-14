import React, {useCallback} from 'react';
import classnames from "classnames";
import { useHistory, useRouteMatch } from 'react-router-dom';
import {cpuColor} from "../../utils/cluterSystem";
import {Cluster} from "../../../../reducers/kafka";

export interface ClustersTableRowProps {
    cluster: Cluster
}

export const ClustersTableRow = (p: ClustersTableRowProps) => {
    const history = useHistory(),
        match = useRouteMatch()

    const onClick = useCallback(() => {
        history.push(`${match.url}/${p.cluster.id}`)
    }, [history, match.url, p.cluster.id])

    return (
        <tr onClick={onClick}>
            <td className="align-center">{p.cluster.id}</td>
            <td className="align-center"><small>{p.cluster.name}</small></td>
            <td className="align-center"><small>{p.cluster.hosts}</small></td>
            <td className="align-center">{p.cluster.topics?.total}</td>

            <td className="align-center">{p.cluster.partitions.total}</td>
            <td className="align-center">{p.cluster.partitions.inSync}</td>
            <td className="align-center">{p.cluster.partitions.outOfSync}</td>
            <td className="align-center">{p.cluster.partitions.underReplicated}</td>

            <td className="align-center">{p.cluster.controllerId}</td>

            <td className={classnames("align-center", cpuColor(p.cluster.system.cpu))}>{p.cluster.system.cpu}</td>
            <td className="align-center"><small>{p.cluster.system.disk}</small></td>
            <td className="align-center"><small>{p.cluster.system.ram}</small></td>
        </tr>
    );
};