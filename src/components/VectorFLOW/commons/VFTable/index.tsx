import { forwardRef } from "react";
import {VFtableProps} from '../../../../VectorFlow/types/MDM'
import { AgGridReact } from "ag-grid-react";
import { VFTableWrapper } from "./styles";
import { LicenseManager } from "ag-grid-enterprise";
import { AG_GRID_KEY } from "../../../../helpers/constants";

import{
    ExcelExportParams,
    SideBarDef,
    ColDef,
    GridOptions
} from 'ag-grid-community'

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './styles.css'

LicenseManager.setLicenseKey(AG_GRID_KEY)

const VFTable = forwardRef((props:VFtableProps,ref:any)=>{

    const{
        rowData,
        columnDefs,
    } = props

    const sideBar:SideBarDef = {
        toolPanels:[
            {
                id:'columns',
                labelDefault:"Columns",
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
                toolPanelParams:{
                    suppressPivots: true,
                    suppressPivotMode: true,
                }
            }
        ]
    }

    const defaultExportExcelParams:ExcelExportParams ={
        processHeaderCallback(params:any){
            return params.column.getColDef().field;
        },
    }

    const defaultColDef:ColDef = {
        floatingFilter:true,
        filter:'agMultiColumnFilter',   
        cellStyle:{
            'text-align':'center'
        },
        flex:1,             
    }

    const gridOptions:GridOptions = {
        getRowStyle:(params:any)=>{
            if(params.node.rowIndex % 2==0){
                return {background:'#EBEBEB'}
            }
            return {background:'#F7F7F7'}
        },
        
    }

    return(
        <VFTableWrapper className="ag-theme-alpine" role={'table'}>
            <AgGridReact
                ref={ref}
                columnDefs={columnDefs}
                rowData={rowData}
                pagination
                gridOptions={gridOptions}
                defaultColDef={defaultColDef}
                defaultExcelExportParams={defaultExportExcelParams}
                sideBar={sideBar}
                
            />
        </VFTableWrapper>
    )
})

export default VFTable