import React, {useEffect} from 'react'
import TitlePage from "../../components/TitlePage";

const GridGainPage = (props) => {
    const {title = 'Наименование страницы'} = props

    useEffect(() => {
        document.title = title
    })

    return (
        <div>
            <TitlePage label={title}/>
            <p>GridGain Page</p>
        </div>
    )
}

export default GridGainPage
