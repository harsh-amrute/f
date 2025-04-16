import styled from 'styled-components'

export const VFHeaderWrapper = styled.div<{headerBgColor:string | undefined}>`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
width:100%;
height:40px;
border-radius:0px 0px 12px 12px;
background-color:${props => props.headerBgColor ? props.headerBgColor : '#FFFFFF'}
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

export const SCTextTitle = styled.span<{headerTextColor:string | undefined}>`
  display: flex;
  padding-top:3px;
  justify-content: center;
  width: 100%;
  flex-direction:row;
  margin-left:14px;
  font-style:normal;
  font-variant:normal;
  font-weight:500;
  font-size:18px;
  line-height:21px;
  font-family:Roboto;
  letter-spacing: 0px;
  color: ${props => props.headerTextColor ? props.headerTextColor : '#000000'}
  `;

export const SCCloseModal = styled.span`
  display:flex;
  align-items:center;
  font-weight: 300;
  font-size: 2.6rem;
  cursor: pointer;
`;

export const SCWrapperContent = styled.div<{paddingLeftAndRight:number | undefined, backgroundColor:string | undefined}> `
  padding: 0 ${props => props.paddingLeftAndRight ? props.paddingLeftAndRight : props.paddingLeftAndRight===0 ? 0 : 74}px;
  text-align: left;
  height:auto;
  background-color:${props => props.backgroundColor ? props.backgroundColor :'white'};
  // border-radius:inherit;
  border-radius: 0px 0px 12px 12px;
`;

export const SCHeader = styled.div`
  display:flex;
  flex-direction:row;
`

