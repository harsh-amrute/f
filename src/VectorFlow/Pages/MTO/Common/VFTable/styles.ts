import styled from "styled-components";
import * as gridSystem from "../../../../../styles/gridSystem";


export const VFTableWrapper = styled.div<{ height?: string, disableZoomScaling?: boolean }>`
    height:${(props) => props.height ? props.height : 'auto'};
    // max-height:90%;
    margin:20px 0;
    zoom: 1 !important;
    width:1200px,

    & > .ag-theme-alpine{
      margin: 0 !important;
    }
    & > .ag-theme-noir-fusion{
      margin: 0 !important;
    }
` 