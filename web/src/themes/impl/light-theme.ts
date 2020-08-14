import {Theme} from "../index";
import {defaultTheme} from "../default-theme";

export const lightTheme: Theme = {
    ...defaultTheme,
    _meta: {
        name: 'Светлая тема'
    },
    background: {
        ...defaultTheme.background,
        color: "#e9e9e9"
    },
    palette: {
        ...defaultTheme.palette,
        error: "#f44336",
        info: "#2196f3",
        warn: "#ff9800",
        success: "#4caf50",
    }
}