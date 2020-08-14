import styled from "styled-components";

export const NotifyContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 24px 16px;
`;

export const NotifyTitle = styled.div`
  padding: 8px 0 0;
  margin-bottom: .35em;
  font-size: 18px;
`;

export const NotifyContent = styled.div`
  font-size: 14px;
`;