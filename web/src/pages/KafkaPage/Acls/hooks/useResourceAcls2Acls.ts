import {Acl, Resource, ResourceAcls} from "../../../../api/acls";
import {useMemo} from "react";

export interface FlatAcl extends Acl, Resource {}

export function useResourceAcls2Acls(resources?: ResourceAcls[]): FlatAcl[] | undefined {
    return useMemo(() => {
        if (!resources) return undefined
        return resources.flatMap(r => r.acls.map(a => ({...a, ...r.resource})))
    }, [resources])
}