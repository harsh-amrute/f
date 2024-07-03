import styled from "styled-components";
 
export const TooltipTarget = styled.div`
  // position: relative;
  cursor: pointer;
  // &:hover&:after {
  //   content: "";
  //   width: 0;
  //   height: 0;
  //   display: block;
  //   position: absolute;
  //   bottom: 95%;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   border-left: 10px solid transparent;
  //   border-right: 10px solid transparent;
  //   border-top: 10px solid #313131;
  //   border-bottom: 10px solid transparent;
  // }
`;
 
export const TooltipContainer = styled.div`
  color: white;
  background: #313131;
  border-radius: 4px;
  z-index: 10000;
  position: fixed;
  max-width: 300px;
  font-size: 16px;
  // &:after {
  //   content: "";
  //   width: 0;
  //   height: 0;
  //   display: block;
  //   position: absolute;
  //   top: 98%;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   border-left: 10px solid transparent;
  //   border-right: 10px solid transparent;
  //   border-top: 10px solid #313131;
  //   border-bottom: 10px solid transparent;
  // }
`;