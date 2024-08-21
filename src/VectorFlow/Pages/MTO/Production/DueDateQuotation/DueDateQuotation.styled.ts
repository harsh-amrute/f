import styled from "styled-components";
import * as globalStyles from "../../../../../styles/global";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    margin-left: 2rem;
    flex-direction: column;
    
    & .ag-header-cell-text {
        font-size: 18px;
    }
    & .ag-header-cell-text {
        text-align: center;
    }

    & .ag-theme-alpine .ag-theme-alpine .ag-header-cell{
        text-align: left;
    }
    & > .ag-theme-alpine{
        flex: 1;
        height: 100%;
        // --ag-row-hover-color: rgb(188, 61, 129,0.3) !important;
    }
    & > .toolbar-container, & > .ag-theme-alpine{
        margin: 10px;
    }
    & > .toolbar-container{
        margin: 0;
        margin-top: 20px;
    }
    & > div[data-testid="vf_pagination"]{
        margin-top:-8px;
        margin-bottom: 20px;
        padding: 0;
        margin-left: 8px;
        margin-right: 8px;
    }
`

export const Footer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 20px;
`


export const BasketingSection = styled.div`
 height:max-content;
 position:relative;
 margin:0 8px;
 font-size:12px;
`

export const BasketingContainer = styled.div`
    width:40%;
    min-height: 100px;
    background:white;
    padding:2rem;
    borderRadius:4px;
    float:right; 
    display:flex;
    flex-direction:column;
    gap:2rem;
    justify-content:center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px 2px;
    border-radius:4px;
`

export const BasketingLabel = styled.div`
    display:flex;
    align-items:center;
    gap:1rem;
`

export const BasketingLabelText = styled.strong<{theme: string}>`
    display: flex; 
    align-items: center;
    gap: 0.5rem;
    fill: ${props => globalStyles.chooseThemeColor[props.theme].color5}};
    color:${props => globalStyles.chooseThemeColor[props.theme].color5}};
`

export const Arrow = styled.div`
    border: 6px solid grey;
    border-right-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    width: 0;
    height: 0;
    margin-left: 10px;
`

export const DateRange = styled.div`
    display: flex;
    background: white;
    align-items: center;
    box-shadow: 0px 3px 12px #AFAFAF29;
    padding: 0.5rem;
    border-radius: 4px;
    position: relative;
    font-size: 10px;
`

export const DateRangeLabel = styled.div`
    position: absolute;
    color: white;
    background: black;
    bottom: 100%;
    left: 0;
    padding: 1px 4px;
    font-size: 8px;
    border-radius: 4px 4px 0 0;
`

export const WarningContainer = styled.div`
    box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 10px 2px;
`;

export const WarningHeader = styled.div`
    background: linear-gradient(271deg, #B71C1C, #F04D4D);
    color: white;
    padding: 1rem;
    border-radius: 4px 4px 0 0;
    font-size:1rem;
    display:flex;
`

export const WarningBody = styled.div`
    background: white;
    padding:1rem;
`

export const WarningText = styled.strong`
    background:#FFF2F9;
    border: 1px dashed #B71C1C;
    padding: 1rem;
    border-radius: 4px;
    display: block;
    font-size: 12px;
`