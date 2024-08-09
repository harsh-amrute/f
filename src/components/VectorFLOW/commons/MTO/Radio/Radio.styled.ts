import styled from "styled-components";
import * as globalStyles from "../../../../../styles/global";


export const MTORadio = styled.input<{theme: string}>`
    accent-color: ${props => globalStyles.chooseThemeColor[props.theme]?.color4};
    padding: 0;
    margin: 0 0.5rem;
    width: 15px;
    height: 15px;
`

MTORadio.defaultProps = {
    type:"radio"
}