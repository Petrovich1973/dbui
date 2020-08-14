import {useStateSelector} from "../../hooks/utils/useStateSelector";
import {useEffect, useMemo} from "react";
import _ from "lodash";
import {dispatcher} from "../../store";


export function useNotifyBehavior() {
    const notifies = useStateSelector( s => s.notifies.queue)

    const notify = useMemo(() => {
        return _.head(notifies)
    }, [notifies])

    useEffect(() => {
        if (notify) {
            setTimeout(() => {
                dispatcher.notifies.remove()
            }, notify.time)
        }
    }, [notify])

    return {notify}
}