import React from 'react'
import classnames from 'classnames'
import './TitlePage.less'

const TitlePage = ({
                       icon = null,
                       label = '',
                       tag = 'h1',
                       className = ''
                   }) => {
    const element = React.createElement
    return element(tag, {className: classnames('titlePage', className)}, <>{icon}<span>{label}</span></>)
}

export default TitlePage