import React from 'react';
import {ClustersTableRow} from "./ClustersTableRow";
import {Cluster} from "../../../../reducers/kafka";
import {Pagination} from "../../../../components/Pagination/Pagination";
import {usePagination} from "../../../../components/Pagination/usePagination";

export interface ClustersTableProps {
    clusters: Cluster[]
}

export const ClustersTable = (p: ClustersTableProps) => {
    const {page, start, end, first, prev, next, last} = usePagination(p.clusters.length, 5)

    return (
        <>
            <table className="table">
                <colgroup>
                    <col span={4}/>
                    <col className="col-yellow" span={4}/>
                    <col span={1}/>
                    <col className="col-blue" span={3}/>
                </colgroup>
                <thead>
                <tr>
                    <th rowSpan={2}>id</th>
                    <th rowSpan={2}>name</th>
                    <th rowSpan={2}>host</th>
                    <th rowSpan={2}>topics</th>

                    <th className="border-bottom opacity" colSpan={4}>partitions</th>

                    <th rowSpan={2}>controller id</th>

                    <th className="border-bottom opacity" colSpan={3}>system</th>
                </tr>
                <tr>
                    <th>total</th>
                    <th>in sync</th>
                    <th>out of sync</th>
                    <th>under replicated</th>

                    <th>cpu</th>
                    <th>disk</th>
                    <th>ram</th>
                </tr>
                </thead>
                <tbody>
                {p.clusters.slice(start, end).map((row, i) => <ClustersTableRow key={'cluster-' + i} cluster={row}/>)}
                </tbody>
            </table>
            <Pagination page={page} onBack={prev} onNext={next} onFirst={first} onLast={last} />
        </>
    );
};