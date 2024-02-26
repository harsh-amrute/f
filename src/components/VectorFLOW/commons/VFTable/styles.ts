import styled from "styled-components";
import * as gridSystem from "../../../../styles/gridSystem";


export const VFTableWrapper = styled.div`
    height:650px;
    max-height:90%;
    margin:20px;
    zoom:0.75;

    @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
        .size.desktop}) {
      zoom:0.75;
    }
  
    @media (min-width: ${gridSystem.size.desktop}) {
      zoom:1;

    }
` 