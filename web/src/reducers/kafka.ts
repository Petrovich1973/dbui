import {ResourceAcls} from "../api/acls";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Partition {
    total: number,
    inSync: number,
    outOfSync: number,
    underReplicated: number
}

export interface System {
    cpu: number,
    disk: string,
    ram: string
}

export interface Cluster {
    id: number,
    name: string,
    hosts: string,
    topics?: {[key: string]: number},
    partitions: Partition,
    controllerId: number,
    system: System
}

export interface KafkaState {
    resourceAcls?: ResourceAcls[]
}

const initialState: KafkaState = {}

export const kafkaSlice = createSlice({
    name: 'kafka',
    initialState,
    reducers: {
        setResourceAcls: (state: KafkaState, actions: PayloadAction<ResourceAcls[]>) => {
            return {...state, resourceAcls: actions.payload}
        }
    }
})