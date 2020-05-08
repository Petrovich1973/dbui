import React, {useEffect} from 'react'

const NotFoundPage = () => {

    useEffect(() => {
        document.title = 'Not Found'
    })

    return(
        <div>
            <h1>Page Not Found</h1>
        </div>
    )
}

export default NotFoundPage
