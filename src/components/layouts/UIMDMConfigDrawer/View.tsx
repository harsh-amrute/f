import {useState,useEffect,useCallback} from 'react'

import VFTable from "../../VectorFLOW/commons/VFTable"

import { TableWrapper } from "../UserURLsDrawer/styles"

import { useUserData } from "../../../context"
import { SecondaryButton, Skeleton } from "../../commons/styled"
import { notifyError } from '../../../helpers/notify'
import {  useGetAllUIMDMConfiguration } from '../../../VectorFlow/Services/MTA/MDM'


const ViewURLs = (props:{onEdit:(data:any)=>void})=>{

    const {
        onEdit
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [rowData,setRowData] = useState<Array<any>>([])
    const {mutateAsync : getAllUIMDMConfiguration} = useGetAllUIMDMConfiguration();
    const getAllUIMDMConfig = useCallback(async()=>{
        try{
            const response = await getAllUIMDMConfiguration();
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
        getAllUIMDMConfig()
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
                    { colId:"MasterId", field:"MasterId" },
                    { colId:"MasterName", field:"MasterName" },
                    { colId:"Col_Code", field:"Col_Code" },
                    { colId:"TableField", field:"TableField" },
                    { colId:"Col_Position", field:"Col_Position" },
                    { colId:"Header", field:"Header" },
                    { 
                        colId:"Visible", 
                        field:"Visible",
                        cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' }
                    },
                    { 
                        colId:"CellAlignment", 
                        field:"CellAlignment",
                        cellStyle: { 'text-align':'center' }
                    },
                
                    { colId:"IsAdd", field:"IsAdd", cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' } },
                    { colId:"IsEdit", field:"IsEdit", cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' } },
                    { colId:"IsFilter", field:"IsFilter", cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' } },
                    { colId:"IsDownload", field:"IsDownload", cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' } },
                    { colId:"IsApplicable", field:"IsApplicable", cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' } },
                    { colId:"DataType", field:"DataType" },
                    { colId:"IsDelete", field:"IsDelete", cellStyle:{ display:'flex', justifyContent:'center', alignItems:'center' } },
              
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