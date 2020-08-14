import {useEffect} from "react";

/**
 * Устанавливает заголовок страницы при первом рендере компанента
 * @param title
 */
export function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = title
    }, [title])
}