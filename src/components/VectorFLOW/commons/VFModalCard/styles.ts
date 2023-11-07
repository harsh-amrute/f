import styled from "styled-components";

export const VFHeaderWrapper = styled.div`
display:flex;
flex-direction:row;
align-items:center;
width:100%;
`;

export const SCModalContent = styled.div`
  overflow-y: hidden;
  z-index: 10;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const SCTextTitle = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction:row;
  margin-left:14px;
  font-style:normal;
  font-variant:normal;
  font-weight:450;
  font-size:18px;
  line-height:21px;
  font-familt:Roboto;
  letter-spacing: 0px;
  color: #000000;
  `;

export const SCCloseModal = styled.span`
  font-weight: 300;
  font-size: 2.6rem;
`;

export const SCWrapperContent = styled.div`
  padding: 0 74px;
  text-align: left;
  height:auto;
`;



