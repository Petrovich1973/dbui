import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch, useRouteMatch, Link} from 'react-router-dom'
import TitlePage from "../../components/TitlePage"
import Clusters from "./Clusters"
import {IconKafka} from "../../svg"

const KafkaPage = (props) => {
    const {title = 'Наименование страницы', breadcrumbsKafka} = props
    const match = useRouteMatch()

    useEffect(() => {
        document.title = title
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.url])

    return (
        <main>

            <TitlePage
                icon={<IconKafka size={'1em'}/>}
                label={title}/>

            <div className="breadcrumbs scrollhide">
                {Object.keys(breadcrumbsKafka)
                    .filter(key => breadcrumbsKafka[key].path)
                    .map((key, i) => (
                        <React.Fragment key={i}>
                            <Link to={breadcrumbsKafka[key].path}>{breadcrumbsKafka[key].label}</Link>
                            <em>/</em>
                        </React.Fragment>
                    ))}
            </div>

            <Switch>
                <Redirect exact from={`${match.path}`} to={`${match.path}/clusters`}/>
                <Route path={`${match.path}/clusters`}>
                    <Clusters {...props}/>
                </Route>
            </Switch>

        </main>
    )
}

KafkaPage.displayName = 'KafkaPage'

const mapStateToProps = state => ({
    breadcrumbsKafka: state.reducerKafka.breadcrumbsKafka
})

export default connect(mapStateToProps)(KafkaPage)