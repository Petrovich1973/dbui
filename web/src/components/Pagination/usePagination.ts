import {useCallback, useMemo, useState} from "react";

const FIRST_PAGE = 1

export function usePagination(length: number, perOnPage: number = 10) {
    const [page, setPage] = useState(FIRST_PAGE),
        maxPage = useMemo(() => {
            return Math.floor(length / perOnPage) + ( length % perOnPage > 0 ? 1 : 0 )
        }, [length, perOnPage]),
        start = useMemo(() => (page-1) * perOnPage, [page, perOnPage]),
        end = useMemo(() => start + perOnPage, [perOnPage, start])

    const prev = useCallback(() => {
        if (page > FIRST_PAGE) {
            setPage(page-1)
        }
    }, [page])

    const next = useCallback(() => {
        if (page < maxPage) {
            setPage(page+1)
        }
    }, [maxPage, page])

    const last = useCallback(() => {
        setPage(maxPage)
    }, [maxPage])

    const first = useCallback(() => {
        setPage(FIRST_PAGE)
    }, [])

    return {page, start, end, first, prev, next, last}
}