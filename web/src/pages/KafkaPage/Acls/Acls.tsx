import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import AclCreate from "./AclCreate"
import AclsList from "./AclsList"

const Acls = (p: any) => {

    const match = useRouteMatch()

    return (<>
        <Switch>
            <Route exact path={`${match.path}`}>
                <AclsList clusterId={p.cluster.id}/>
            </Route>
            <Route path={`${match.path}/new`}>
                <AclCreate parent={match.url} clusterId={p.cluster.id}/>
            </Route>
        </Switch>
    </>)
}

Acls.displayName = 'Acls'

export default Acls