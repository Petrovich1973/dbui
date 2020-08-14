import styled from "styled-components";

export const TableRow = styled.tr``;
export const TableHeadCell = styled.th`
    vertical-align: bottom;
    font-size: 50%;
    text-transform: uppercase;
    user-select: none;
    padding: ${p => p.theme.sizing.size/2}px ${p => p.theme.sizing.size}px;
    line-height: 1;
    color: ${p => p.theme.palette.textDarken};
`;
export const TableCell = styled.td`
  vertical-align: top;
  padding: ${p => p.theme.sizing.size/2}px ${p => p.theme.sizing.size}px;
  line-height: 1;
  &:first-child td {
    padding-top: ${p => p.theme.sizing.size * 1.4}px 
  }
  & small {
    font-size: 60%;
  }
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody`
 ${TableRow}:hover {
    background-color: ${p => p.theme.background.colorHoverInvert};
  }
`;

export interface TableProps {
    clickableRow?: boolean
}

export const Table = styled.table<TableProps>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  ${TableRow}: {
    cursor: ${p => p.clickableRow ? "pointer" : "default"};
  }
`;