import styled from "styled-components";
import * as gridSystem from "../../../../styles/gridSystem";


export const VFTableWrapper = styled.div<{height?:string,disableZoomScaling?:boolean}>`
    height:${(props)=>props.height ? props.height : 'auto'};
    // max-height:90%;
    margin:20px;
    zoom:${props=>props.disableZoomScaling ? 1 : 0.75};

    @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
        .size.desktop}) {
        ${props=>props.disableZoomScaling ? 1 : 0.75};
    }
  
    @media (min-width: ${gridSystem.size.desktop}) {
      zoom:1;
    }
` 