
import { ColDef } from 'ag-grid-enterprise';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import BPRViewTableRowCellWithReadMore from './BPRViewTableRowCellWithReadMore';
import {BPRViewTableWrapper,BPRViewTablePrefix,BPRViewTableGrid,BPRViewTableHeaderContainer,BPRViewTableHeader,BPRViewTableRowContainer,BPRViewTableRow,BPRViewTableRowCell} from './styles'


interface BPRViewTableProps{
    colDefs:ColDef[]
    rowData:any[]
}

const BPRViewTable = (props:BPRViewTableProps)=>{

    const {
        colDefs,
        rowData
    } = props


    return(
        <BPRViewTableWrapper>
            <BPRViewTablePrefix src="/assets/img/VectorFLOW/BPR/in-transit.svg"/>
            <BPRViewTableGrid>
                <BPRViewTableHeaderContainer>
                    {colDefs.map((colDef:ColDef)=>{
                        return(
                            <BPRViewTableHeader key={colDef.colId}>
                                {colDef.headerName}
                            </BPRViewTableHeader>
                        )
                    })}
                </BPRViewTableHeaderContainer>
                <BPRViewTableRowContainer>
                    {rowData && rowData.map((row:any,index:number)=>{
                        return(
                            <BPRViewTableRow key={index}>
                                {
                                    colDefs.map((colDef:ColDef,index:number)=>{
                                        if(colDef.colId){
                                           if(row[colDef.colId]){
                                               if(colDef.colId==='remarks'){
                                                    return(
                                                        <BPRViewTableRowCellWithReadMore value={row[colDef.colId]} key={index}/>
                                                    )
                                               }
                                               return(
                                                <BPRViewTableRowCell key={index}>
                                                    {row[colDef.colId]}
                                                </BPRViewTableRowCell>
                                            )
                                           }
                                           return(
                                                <BPRViewTableRowCell key={index}>
                                                    NULL
                                                </BPRViewTableRowCell>
                                           )
                                        }
                                        }
                                    )
                                }
                            </BPRViewTableRow>
                        )
                    })}
                </BPRViewTableRowContainer>
            </BPRViewTableGrid>
        </BPRViewTableWrapper>
    )
}



export default BPRViewTable;