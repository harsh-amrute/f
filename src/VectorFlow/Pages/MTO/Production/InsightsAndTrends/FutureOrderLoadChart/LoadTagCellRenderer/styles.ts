import styled from "styled-components";

export const TagWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 16px 0 20px;
  height: 28px;
  font-size: 14px;
  font-weight: 500;
  color: #222;
  border-radius: 4px;
  position: relative;
  // border: 1.5px solid #c1c1c1;
  background: transparent;
  margin: 8px 0;
  border:1px solid red;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 0;
    height: 0;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    border-right: 18px solid #c1c1c1;
    border-radius: 4px 0 0 4px;
  }
    
`;
