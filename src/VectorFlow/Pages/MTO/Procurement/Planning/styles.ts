import styled from "styled-components"


export const ProcurementLayout = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    & .ag-theme-alpine{
        flex: 1;
        margin-left: 2rem;
    }
    & div[data-testid="vf_pagination"]{
        margin-left: 2rem !important;
        padding: 0 !important;
        margin-top: -20px;
    }
`

export const ChildTableWrapper = styled.div`
    padding: 2rem;
    & .ag-header-cell-text {
        font-size: 12px !important;
    }
`

export const TableWrapper = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    & > .ag-theme-alpine{
        height: 100%;
        margin-left: 3rem;
        margin-bottom: 0;
    }
    & > div[data-testid="vf_pagination"]{
        margin: 0px 15px !important;
        width: 100%;
    }
    
`
