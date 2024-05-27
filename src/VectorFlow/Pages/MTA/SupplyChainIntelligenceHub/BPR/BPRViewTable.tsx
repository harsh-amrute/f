
import { ColDef } from 'ag-grid-enterprise';
import { useUserData } from '../../../../../context';
import { SCTabButton } from '../../../../../components/VectorFLOW/commons/VFTab/styles';
import BPRViewTableRequestCellRenderer from './BPRViewTableRequestCellRenderer';
import BPRViewTableRowCellWithReadMore from './BPRViewTableRowCellWithReadMore';
import {BPRViewTableWrapper,BPRViewTablePrefix,BPRViewTableGrid,BPRViewTableHeaderContainer,BPRViewTableHeader,BPRViewTableRowContainer,BPRViewTableRow,BPRViewTableRowCell, TableHeader,BPRViewTablePrefixWrapper, BPRViewTablePrefixText, BPRViewTablePrefixIcon, BPRViewTableNoDataContainer, BPRViewTableNoDataHeader, BPRViewTableNoDataText} from './styles'
import AgeingCellRenderer from './AgeingCellRenderer';
import WhereAboutsCellRenderer from './WhereAboutsCellRenderer';


interface BPRViewTableProps{
    colDefs:ColDef[]
    rowData:any[]
    tablePrefixSrc:string
    tableHeader:string
    onRequestExpediting?:()=>void
}

const BPRViewTable = (props:BPRViewTableProps)=>{

    const {
        colDefs,
        rowData,
        tablePrefixSrc,
        tableHeader,
        onRequestExpediting
    } = props

    const onReq = ()=>{
        if(onRequestExpediting){
            onRequestExpediting()
        }
    }

    const {user} = useUserData()
    const {theme_ui} = user.user

    const renderRows = ()=>{
        if(!rowData || rowData.length===0){
            return(
                <BPRViewTableRow style={{height:100}}>
                    <BPRViewTableNoDataContainer>
                        <BPRViewTableNoDataHeader>
                            No Data To Show 
                        </BPRViewTableNoDataHeader>
                        <BPRViewTableNoDataText>
                            Please select a row from above table to view data
                        </BPRViewTableNoDataText>
                    </BPRViewTableNoDataContainer>
                </BPRViewTableRow>
            )
        }
        return(
            rowData && rowData.map((row:any,index:number)=>{
                return(
                    <BPRViewTableRow key={index}>
                        {
                            colDefs.map((colDef:ColDef,index:number)=>{
                                if(colDef.colId){
                                   if(row[colDef.colId] || colDef.colId==='whereabouts' || colDef.colId==="request"){

                                        if(colDef.colId==='whereabouts'){
                                            return <WhereAboutsCellRenderer value={row}/>
                                        }

                                        if(colDef.colId==='ag'){
                                            return (
                                                <AgeingCellRenderer value={row}/>
                                            )
                                        }

                                       if(colDef.colId==='remarks'){
                                            return(
                                                <BPRViewTableRowCellWithReadMore value={row[colDef.colId]} key={index}/>
                                            )
                                       }
                                       if(colDef.colId==='request'){
                                            return(
                                                <BPRViewTableRequestCellRenderer onClick={onReq} key={index}/>
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
            })
        )
    }

    return(
        <BPRViewTableWrapper>
            <BPRViewTablePrefixWrapper>
                <BPRViewTablePrefix>
                <SCTabButton
                    themeUi={theme_ui}
                    zIndex={1}
                    marLeft={false}
                    status='active'
                >
                    <BPRViewTablePrefixText>
                    {tableHeader}
                    </BPRViewTablePrefixText>
                    <BPRViewTablePrefixIcon src={tablePrefixSrc}/>
                </SCTabButton>
                </BPRViewTablePrefix>
            </BPRViewTablePrefixWrapper>
            
            <BPRViewTableGrid>
                {/* {tableHeader && (
                    <TableHeader>
                        {tableHeader}
                    </TableHeader>
                )} */}
                <BPRViewTableHeaderContainer>
                    {colDefs.map((colDef:ColDef)=>{
                        return(
                            <BPRViewTableHeader style={{minWidth:colDef.colId==='whereabouts'?200:120}} key={colDef.colId}>
                                {colDef.headerName}
                            </BPRViewTableHeader>
                        )
                    })}
                </BPRViewTableHeaderContainer>
                <BPRViewTableRowContainer>
                    {renderRows()}
                </BPRViewTableRowContainer>
            </BPRViewTableGrid>
        </BPRViewTableWrapper>
    )
}



export default BPRViewTable;