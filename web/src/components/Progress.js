import React from 'react'

const Progress = ({
                      from = 0,
                      to = 200,
                      value = 140,
                      height = '.7em',
                      fontSize = `.7em`,
                      backgroundBar = `#b9b9b980`,
                      backgroundColor = `#b9b9b980`,
                      color = `inherit`
                  }) => {

    const width = `${100 / (to / value)}%`

    return (
        <span className="progress" style={{height, fontSize, backgroundColor, color}}>
            <span className="thumb" style={{width, backgroundColor: backgroundBar}}>
                <span>{value}</span>
            </span>
            <span className="from">{from}</span>
            <span className="to">{to}</span>
        </span>
    )
}

export default Progress