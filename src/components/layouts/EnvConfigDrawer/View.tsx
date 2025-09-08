import {useState,useEffect,useCallback} from 'react'

import VFTable from "../../VectorFLOW/commons/VFTable"

import { TableWrapper } from "../UserURLsDrawer/styles"

import { useUserData } from "../../../context"
import { SecondaryButton, Skeleton } from "../../commons/styled"
import { notifyError } from '../../../helpers/notify'
import { useGetAllEnvironmentConfiguration } from '../../../VectorFlow/Services/MTA/MDM'


const ViewURLs = (props:{onEdit:(data:any)=>void})=>{

    const {
        onEdit
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [rowData,setRowData] = useState<Array<any>>([])
    const {mutateAsync : getAllEnvConfiguration} = useGetAllEnvironmentConfiguration();
    const getAllEnvConfig = useCallback(async()=>{
        try{
            const response = await getAllEnvConfiguration();
            const data = response?.data?.data;
            console.log("DATA",data);
            
            setRowData(data.sort((row1:any,row2:any)=>row1.id - row2.id))
        }catch(error:any){
            console.error(error)
            notifyError("Server Went Unresponsive")
        }finally{
            setIsLoading(false)
        }
    },[])

    // const allUrls = [
    //     {
    //         "id": 1,
    //         "name": "VectorFlow. Master Data Management. Control Panel",
    //         "code": "MDM-CP",
    //         "description": "VectorFlow. Master Data Management. Control Panel",
    //         "url": "/master-data-management/control-panel"
    //     }
    // ]

    const [isLoading,setIsLoading] = useState<boolean>(true)
    
    useEffect(()=>{
        getAllEnvConfig()
    },[])

    if(isLoading){
        return (
            <Skeleton
                style={{height:400,width:'100%'}}
            />
        )
    }
console.log(
    "ROW DATA",rowData
);

    return(
        <TableWrapper>
            <VFTable 
                defaultColDef={{
                    flex:1,
                    cellStyle:{
                        'text-align':'center'
                    }
                }}
                rowHeight={50}
                height="600px"
                rowData={rowData}
                columnDefs={[
                    {
                        colId:"ConfigKey",
                        field:"ConfigKey"
                    },
                    {
                        colId:"ConfigValue",
                        field:"ConfigValue"
                    },
                    {
                        colId:"Description",
                        field:"Description"
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