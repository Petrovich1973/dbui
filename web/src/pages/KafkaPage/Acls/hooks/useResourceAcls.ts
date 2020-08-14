import {useCallback} from "react";
import {useStateSelector} from "../../../../hooks/utils/useStateSelector";
import {withErrorHandle} from "../../../../utils/api";
import {dispatcher} from "../../../../store";
import {getClusterIdAcls} from "../../../../api/acls";


export function useResourceAcls(clusterId: number) {
    const resourceAcls = useStateSelector(s => s.kafka.resourceAcls)
    const host = useStateSelector(s => s.reducerApp.settings.hostApi)

    const load = useCallback(async () => {
        const res = await withErrorHandle(getClusterIdAcls(host, clusterId))
        dispatcher.kafka.setResourceAcls(res.data)
    }, [clusterId, host])

    return {
        resourceAcls,
        getResourceAcls: load
    }
}