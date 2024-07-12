import styled from "styled-components";
import * as gridSystem from "../../../../../styles/gridSystem";

export const BMDepWrapper = styled.div`
@media only screen and (min-width: ${gridSystem.size
        .mobileS}) and (max-width: ${gridSystem.size.mobileL}) {
  margin-left: -40px;
  margin-top: -40px;
  padding: 20px;
  background-color:red;
}`

export const BMDepHeaderWraper=styled.div`
 
`
export const BMDepSubHeaderWraper=styled.div`
    justify-content:space-between
`