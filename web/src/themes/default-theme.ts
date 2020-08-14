import {Theme} from "./index";
import {rgba, darken} from 'polished'

export const defaultTheme: Theme = {
    _meta: {
        name: 'Тема по умолчнию'
    },
    background: {
        color: "#e9e9e9",
        colorInvert: '#000',
        highlight: "#e9e9e9",
        active: "#e9e9e9",
        hover: "#e9e9e9",
        colorHoverInvert: rgba('#000', 0.06)
    },
    palette: {
        error: "#f44336",
        info: "#2196f3",
        warn: "#ff9800",
        success: "#4caf50",
        text: '#20242e',
        textHighlight: '#394363',
        textActive: '#000000',
        textHover: '#000000',
        textInvert: '#a0b7ee',
        textDarken: darken(0.2, '#20242e'),
        textFade50: rgba('#20242e', 0.5),
        textFade80: rgba('#20242e', 0.8)
    },
    sizing: {
        size: 22
    }
}