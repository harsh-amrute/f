import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    margin-left: 2rem;
    flex-direction: column;
    
    & .ag-header-cell-text {
        font-size: 16px;
    }
    & .ag-header-cell-text {
        text-align: center;
    }
    & > .ag-theme-alpine{
        flex: 1;
        height: 100%;
        --ag-row-hover-color: rgb(188, 61, 129,0.3) !important;
    }
    & > .toolbar-container, & > .ag-theme-alpine{
        margin: 20px 10px;
    }
    & > .toolbar-container{
        margin: 0;
        margin-top: 20px;
    }
    & > div[data-testid="vf_pagination"]{
        margin-top:-15px;
        margin-bottom: 20px;
        padding: 0;
    }
`

export const Footer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 20px;
`