import styled from 'styled-components';


export const ApplyZoomOut = styled.div`
    zoom: 0.7;
`

export const VFTableWrapper = styled.div<{ height?: string, disableZoomScaling?: boolean }>`
    height:${(props) => props.height ? props.height : 'auto'};
    // max-height:90%;
    margin:20px;
    zoom:${props => props.disableZoomScaling ? 1 : 0.75};
    width:100%,

 
    & .ag-theme-alpine {
        margin: 0 !important;
      }
    & .ag-theme-noir-fusion {
        margin: 0 !important;
      }

      & .ag-header-container {
        font-size: 16px;
      }
    
`
export const PaginationWrapper = styled.div`

`


export const ETACellRendererWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    width:100%;
`

export const ETACellValue = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 12px #77777729;
    border: 0.4000000059604645px solid #707070;
    border-radius: 2px;
    height:30px;
    width:100%;
    padding:4px;
`