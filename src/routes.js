import React from 'react'
import * as right from './constants/rights'
import {
    DashboardPage,
    ConsolePage,
    KafkaPage,
    GridGainPage,
    PostgreSQLPage
} from './pages'
import {IconDashboard, IconKafka} from './svg'

const routes = [
    {
        component: DashboardPage,
        path: '/index',
        title: 'Dashboard',
        icon: <IconDashboard size={'1em'}/>
    },
    {
        component: ConsolePage,
        path: '/console',
        title: 'Console Page',
        headerNav: true,
        routes: [
            {
                component: KafkaPage,
                path: '/kafka',
                title: 'Apache Kafka',
                icon: <IconKafka size={'1.2em'}/>,
                rights: [right.WRITE_ALL, right.VIEW_ALL, right.KAFKA_USE]
            },
            {
                component: GridGainPage,
                path: '/gridgain',
                title: 'GridGain',
                rights: [right.WRITE_ALL, right.VIEW_ALL, right.GRIDGAIN_USE]
            },
            {
                component: PostgreSQLPage,
                path: '/postgre',
                title: 'PostgreSQL',
                rights: [right.WRITE_ALL, right.VIEW_ALL, right.POSTGRESQL_USE]
            }
        ]

    }
]

export default routes