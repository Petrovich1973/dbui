import React, {ReactNode, useEffect, useState} from 'react';
import {Waiting} from "../styled";

const DEFAULT_TITLE = "Загружаеться...",
    DEFAULT_ERROR_MESSAGE = "Ошибка во время загрузки"

export interface LoaderHolderProps {
    title?: string
    errorMessage?: string
    loader: () => Promise<void>
    children?: ReactNode
}

export const LoaderHolder = (p: LoaderHolderProps) => {
    const {title, errorMessage, loader, children} = p,
        [hide, setHide] = useState(true),
        [error, setError] = useState(false)

    useEffect(() => {
        loader()
            .then(() => setHide(false))
            .catch(() => setError(true))
    }, [loader])

    if (error) {
        return <Waiting>{errorMessage || DEFAULT_ERROR_MESSAGE}</Waiting>
    } else if (hide) {
        return <Waiting>{title || DEFAULT_TITLE}</Waiting>
    } else {
        return <>{children}</>
    }
};