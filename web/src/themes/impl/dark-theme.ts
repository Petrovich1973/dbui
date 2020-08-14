import {Theme} from "../index";
import {defaultTheme} from "../default-theme";

export const darkTheme: Theme = {
    ...defaultTheme,
    _meta: {
        name: "Темная тема"
    },
    background: {
        ...defaultTheme.background,
        color: "#161616"
    },
    palette: {
        ...defaultTheme.palette,
        error: "#f44336",
        info: "#2196f3",
        warn: "#ff9800",
        success: "#4caf50",
    }
}