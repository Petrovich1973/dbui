import styled from "styled-components";


export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 16px;
`;

export const PaginationItem = styled.div`
 width: 32px;
 height: 32px;
 margin-right: 8px;
 background-color: ${p => p.theme.background.color};
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 16px;
 
 &:last-child {
   margin-right: 0;
 }
`;

export const PaginationBtn = styled(PaginationItem)`
 cursor: pointer;
 transition: all .2s ease-in-out;
 
 &:hover {
   background-color: transparent;
 }
 
 &:active {
   box-shadow: inset 0 0 2px rgba(0,0,0,.3);
 }
`;

export const PaginationPageNumBtn = styled(PaginationItem)`
  background-color: transparent;
`;