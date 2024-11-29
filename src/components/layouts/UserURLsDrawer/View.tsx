import {useState,useEffect,useCallback} from 'react'
import VFTable from "../../../components/VectorFLOW/commons/VFTable"
import { TableWrapper } from "./styles"

import { useUserData } from "../../../context"
import {  SecondaryButton, Skeleton } from "../../../components/commons/styled"

import { notifyError } from '../../../helpers/notify'
import axios from 'axios'


const ViewURLs = (props:{onDelete:(params:any)=>void})=>{

    const {
        onDelete
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [rowData,setRowData] = useState<Array<any>>([])

    const getAllUrls = useCallback(async()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API_HOST}api/user/get-all-functions/`)
            setRowData(data)
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
        getAllUrls()
    },[])

    if(isLoading){
        return (
            <Skeleton
                style={{height:200,width:'100%'}}
            />
        )
    }

    return(
        <TableWrapper>
            <VFTable 
                defaultColDef={{
                    flex:1,
                }}
                rowHeight={50}
                height="600px"
                rowData={rowData}
                columnDefs={[
                    {
                        colId:"name",
                        field:"name"
                    },
                    {
                        colId:"code",
                        field:"code"
                    },
                    {
                        colId:"description",
                        field:"description"
                    },
                    {
                        colId:"url",
                        field:"url"
                    },
                    {
                        colId:'delete',
                        field:'delete',
                        headerName:'',
                        maxWidth:80,
                        cellStyle:{
                            display:'flex',
                            'align-items':'center'
                        },
                        cellRenderer:(params:any)=>(
                            <SecondaryButton
                            style={{backgroundColor:'transparent'}}
                                themeUi={themeUi}
                                onClick={()=>onDelete(params.data)}
                            >
                               
                                <img src="/assets/img/VectorFLOW/NMS/delete-black.svg" height={20} width={20}/>
                            </SecondaryButton>
                        )
                    }
                ]}
            />
            
            </TableWrapper>
    )
}

export default ViewURLs