import React, {useEffect} from 'react'
import TitlePage from "../../components/TitlePage";

const PostgreSQLPage = (props) => {
    const {title = 'Наименование страницы'} = props

    useEffect(() => {
        document.title = title
    })

    return (
        <div>
            <TitlePage label={title}/>
            <p>PostgreSQL Page</p>
        </div>
    )
}

export default PostgreSQLPage
