import React, {useEffect, useState} from 'react'
import TitlePage from "../../components/TitlePage"
import {IconKafka, IconFolder, IconTopic, IconDelete, IconDashboard} from "../../svg"
import Button from "../../components/Button"
import Progress from "../../components/Progress"
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


const DashboardPage = (props) => {
    const {title = 'Наименование страницы'} = props

    const [percentage, setPercentage] = useState(67)

    useEffect(() => {
        document.title = title
    })

    const cpuColor = value => {
        if (value < 50) return '#46a546'
        if (value < 80) return '#ffc40d'
        return '#c3325f'
    }

    return (
        <>
            &nbsp;
            <TitlePage icon={<IconDashboard size={'1em'}/>} label={title} className="flex-center"/>
            <div className="scrollhide align-center" style={{height: '100%', overflow: 'auto'}}>
                <h2>h2 Dashboard Page</h2>
                <h3>h3 Dashboard Page</h3>
                <h4>h4 Dashboard Page</h4>
                <h5>h5 Dashboard Page</h5>
                <h6>h6 Dashboard Page</h6>
                <p>Some text <a href="/">Link some text</a> text text text</p>
                <p>
                <span style={{width: 200, display: 'inline-block'}}>
                <Progress {...{
                    to: 100,
                    value: percentage,
                    backgroundBar: `${cpuColor(100 / (100 / percentage))}`
                }}/>
                </span>
                </p>
                <p>
                    <input
                        style={{background: 'transparent', padding: '10px'}}
                        type="number"
                        value={percentage}
                        onChange={e => setPercentage(+e.target.value)}/>
                </p>
                <p>
            <span style={{height: 200, width: 200, display: 'inline-block'}}>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Text size
                        textSize: '36px',
                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,
                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',
                        // Colors
                        pathColor: `${cpuColor(percentage)}`,
                        textColor: `${cpuColor(percentage)}`,
                        trailColor: 'rgba(255,255,255, .2)',
                        backgroundColor: 'red',
                    })}
                />
            </span>
                </p>
                <p>
                    <Button icon={<IconTopic/>} text={'Button lg'} className="lg"/>
                    <Button icon={<IconKafka/>} text={'Button lg'} className="lg border"/>
                    <Button text={'Button lg'} className="lg red"/>
                </p>
                <p>
                    <Button text={'Button'}/>
                    <Button icon={<IconDelete/>} text={'Button border and radius'} className="white border radius"/>
                    <Button icon={<IconKafka/>} text={'Button border and radius'} className="violet border radius"/>
                    <Button text={'Button border'} className="border"/>
                </p>
                <p>
                    <Button icon={<IconDelete/>} text={'Button sm'} className="sm red"/>
                    <Button text={'Button sm'} className="sm orange"/>
                    <Button text={'Button sm'} className="sm yellow"/>
                    <Button icon={<IconFolder/>} text={'Button sm'} className="sm blue border radius"/>
                    <Button text={'Button sm'} className="sm"/>
                    <Button text={'Button sm'} className="sm border"/>
                    <Button text={'Button sm'} className="sm black"/>
                </p>
                <p>
                    <Button text={'Button sl'} className="sl"/>
                    <Button text={'Button sl long context'} className="black sl"/>
                    <Button text={'Name button'} className="border radius sl"/>
                </p>
                <p>
                    <Button icon={<IconFolder/>}/>
                    <Button icon={<IconTopic/>}/>
                    <Button icon={<IconKafka/>}/>
                </p>
            </div>
        </>
    )
}

export default DashboardPage
