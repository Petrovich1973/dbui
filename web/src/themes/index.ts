import {DefaultTheme} from 'styled-components'
import {darkTheme} from "./impl/dark-theme";
import {lightTheme} from "./impl/light-theme";

export interface BackgroundTheme {
    color: string
    colorInvert: string
    highlight: string
    active: string
    hover: string
    colorHoverInvert: string
}

export interface PaletteTheme {
    error: string,
    info: string,
    warn: string,
    success: string,
    text: string
    textHighlight: string
    textActive: string
    textHover: string
    textInvert: string
    textDarken: string
    textFade50: string
    textFade80: string
}

export interface MetaTheme {
    name: string
}

export interface SizingTheme {
    size: number
}

export interface Theme extends DefaultTheme {
    _meta: MetaTheme
    background: BackgroundTheme,
    palette: PaletteTheme,
    sizing: SizingTheme
}

export interface WithTheme {
    theme: Theme
}

export const themes = {
    dark: darkTheme,
    light: lightTheme
}