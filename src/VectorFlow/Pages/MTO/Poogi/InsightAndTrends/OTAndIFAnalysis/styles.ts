import styled from 'styled-components';
import * as gridSystem from '../../../../../../styles/gridSystem'


export const SCDynamicContainer = styled.div`
    display:block;
    height:150vh;
    padding:20px;
    
    @media (min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem
    .size.desktop}) {
        height:70vh
    }
  
    @media (min-width: ${gridSystem.size.desktop}) {
      height:110vh
    }

    & .ag-header-cell-text {
      font-size: 12px;
  }
  & > .ag-theme-alpine{
    --ag-grid-size: 3px !important;
    --ag-list-item-height: 20px !important;
    --ag-font-size: 10px !important;
      flex: 1;
      height: 100%;
      --ag-row-hover-color: rgb(188, 61, 129,0.3) !important;

      & .ag-cell {
        height: 100% !important;
      }

      & .ag-paging-panel {
        height: 24px !important;
      }

      & .ag-side-buttons {
        font-size: 10px;
      }

      & .ag-header {
        border-radius: 0;
      }

      & .ag-pivot-off{
        height: 47px !important;
        min-height: 47px !important;

      }
     
      & .ag-header-cell {
        min-height: 24px !important;
        height: 24px !important;
      }
      & .ag-header-row {
        min-height: 20px !important;
        height: 20px !important;
      }
      & .ag-header-container {
        min-height: 20px !important;
        height: 20px !important;
      }
      
      
       & .ag-header-row-column-filter{
        top: 23px !important;
        height: 24px !important;
       }

      
       & .ag-input-field-input {
        height: 14px !important;
        min-height: 10px !important;
        font-size: 12px;
       }
      & .ag-column-drop{
        background: #D2CECE;
      }

      & .ag-status-bar{
        height: 24px !important;
        font-size: 10px;
      }
  }

  & div[data-testid="vf_pagination"]{
    margin-top: 0px;
    // padding: 0 20px;
  }
    
`
