import React, { forwardRef, useEffect, useRef, useState,useImperativeHandle } from "react";
import {VFtableProps} from '../../../../VectorFlow/types/MDM'
import 'ag-grid-enterprise'
import { AgGridReact } from "ag-grid-react";
import { VFTableWrapper } from "./styles";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './styles.css'



const VFTable = forwardRef((props:VFtableProps,ref:any)=>{

    const{
        rowData,
        columnDefs,
    } = props

    return(
        <VFTableWrapper className="ag-theme-alpine">
            <AgGridReact
                ref={ref}
                columnDefs={columnDefs}
                rowData={rowData}
                pagination
                gridOptions={{
                    getRowStyle:params=>{
                        if(params.node.rowIndex! % 2==0){
                            return {background:'#EBEBEB'}
                        }
                        return {background:'#F7F7F7'}
                    }
                }}
                defaultColDef={{
                    floatingFilter:true,
                    filter:'agMultiColumnFilter',   
                    cellStyle:{
                        'text-align':'center'
                    },
                    
                
                }}

                defaultExcelExportParams={{
                    processHeaderCallback(params:any){
                        return params.column.getColDef().field;
                    },
                }}
                onGridReady={(e)=>{
                   e.api.sizeColumnsToFit()
                }}
                onColumnVisible={(e)=>{
                    e.api.sizeColumnsToFit()
                }}
                onGridSizeChanged={(e)=>{
                    e.api.sizeColumnsToFit()
                 }}
                onToolPanelVisibleChanged={(e)=>{
                    e.api.sizeColumnsToFit()
                 }}
                sideBar={{
                    toolPanels:[
                        {
                            id:'columns',
                            labelDefault:"Columns",
                            labelKey: 'columns',
                            iconKey: 'columns',
                            toolPanel: 'agColumnsToolPanel',
                            
                        }
                    ]
                }}
            />
        </VFTableWrapper>
    )
})

export default VFTable