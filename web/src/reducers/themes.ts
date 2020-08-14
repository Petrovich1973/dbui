import {Theme} from "../themes";
import {lightTheme} from "../themes/impl/light-theme";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ThemesState {
    current: Theme
}

const initialState: ThemesState = {
    current: lightTheme
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state: ThemesState, action: PayloadAction<Theme>) => {
            state.current = action.payload
        }
    }
})