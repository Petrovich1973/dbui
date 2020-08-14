import React, {ReactNode} from 'react';
import {ThemeProvider} from "styled-components";
import {useStateSelector} from "../hooks/utils/useStateSelector";

export interface DbuiThemeProviderProps {
    children?: ReactNode
}

const DbuiThemeProvider = (props: DbuiThemeProviderProps) => {
    const theme = useStateSelector(state => state.theme.current)

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default DbuiThemeProvider;