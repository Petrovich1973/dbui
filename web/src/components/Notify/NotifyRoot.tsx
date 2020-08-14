import styled from "styled-components";
import {PaletteTheme} from "../../themes";

export interface NotifyTitleProps {
    variant?: keyof PaletteTheme
}

export const NotifyRoot = styled.div<NotifyTitleProps>`
  min-height: 50px;
  padding: 8px 16px;
  background-color: ${p => p.variant ? p.theme.palette[p.variant] : p.theme.background.color};
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
`