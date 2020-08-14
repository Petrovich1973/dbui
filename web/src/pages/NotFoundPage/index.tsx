import React from 'react'
import {useDocumentTitle} from "../../hooks/utils/useDocumentTitle";

const NotFoundPage = () => {
    useDocumentTitle('Not Found')

    return(
        <div>
            <h1>Page Not Found</h1>
        </div>
    )
}

export default NotFoundPage
