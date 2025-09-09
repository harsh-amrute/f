import {useState,useEffect,useCallback} from 'react'

import VFTable from "../../VectorFLOW/commons/VFTable"

import { TableWrapper } from "../UserURLsDrawer/styles"

import { useUserData } from "../../../context"
import { SecondaryButton, Skeleton } from "../../commons/styled"
import { notifyError } from '../../../helpers/notify'
import {  useGetAllUIReportConfiguration } from '../../../VectorFlow/Services/MTA/MDM'


const ViewURLs = (props:{onEdit:(data:any)=>void})=>{

    const {
        onEdit
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [rowData,setRowData] = useState<Array<any>>([])
    const {mutateAsync : getAllUIReportConfiguration} = useGetAllUIReportConfiguration();
    const getAllUIReportConfig = useCallback(async()=>{
        try{
            const response = await getAllUIReportConfiguration();
            const data = response?.data?.data;
            console.log("DATA",data);
            
            setRowData(data)
        }catch(error:any){
            console.error(error)
            notifyError("Server Went Unresponsive")
        }finally{
            setIsLoading(false)
        }
    },[])

    const [isLoading,setIsLoading] = useState<boolean>(true)
    
    useEffect(()=>{
        getAllUIReportConfig()
    },[])

    if(isLoading){
        return (
            <Skeleton
                style={{height:400,width:'100%'}}
            />
        )
    }

    return(
        <TableWrapper>
            <VFTable 
                  defaultColDef={{
                    minWidth: 200,
                    cellStyle:{
                         'text-align':'center',
                      'justify-content':'center'
                    }
                }}
                rowHeight={50}
                height="600px"
                rowData={rowData}
                columnDefs={[
                    {
                        colId:"ReportName",
                        field:"ReportName"
                    },
                    {
                        colId:"Col_Code",
                        field:"Col_Code"
                    },
                    {
                        colId:"Col_Position",
                        field:"Col_Position"
                    },
                    {
                        colId:"Header",
                        field:"Header"
                    },
                    {
                        colId:"Visible",
                        field:"Visible", cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' }
                    },
                    {
                        colId:"CellAlignment",
                        field:"CellAlignment"
                    },
                 
                    {
                        colId:'edit',
                        field:'edit',
                        headerName:'',
                        maxWidth:80,
                        cellStyle:{
                            display:'flex',
                            'align-items':'center',
                        },
                        cellRenderer:(params:any)=>(
                            <SecondaryButton
                                style={{backgroundColor:'transparent'}}
                                themeUi={themeUi}
                                onClick={()=>onEdit(params.data)}
                            >
                               
                                <img src="/assets/img/VectorFLOW/NMS/edit-draft.svg" height={20} width={20}/>
                            </SecondaryButton>
                        )
                    },                  
                ]}
            />
            </TableWrapper>
    )
}

export default ViewURLs