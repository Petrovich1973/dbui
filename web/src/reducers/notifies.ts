import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaletteTheme} from "../themes";

export interface Notify {
    variant: keyof PaletteTheme,
    title: string,
    message?: string
    time: number
}

export interface NotifiesState {
    queue: Notify[]
}

const initialState: NotifiesState = {
    queue: []
}

export const notifiesSlice = createSlice({
    name: 'notifies',
    initialState,
    reducers: {
        add: (state: NotifiesState, action: PayloadAction<Notify>) => {
            state.queue = [...state.queue, action.payload]
        },
        remove: (state: NotifiesState) => {
            if (state.queue.length > 0) {
                state.queue = state.queue.slice(1)
            } else if (process.env.NODE_ENV === "development") {
                console.warn('Don\'t try to remove from an empty queue')
            }
        }
    }
})