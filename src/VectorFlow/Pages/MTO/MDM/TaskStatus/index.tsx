import React, { useRef, useState } from "react"

import VFTable from "../../Common/VFTable"

import {  getActionName, mapTaskStatusToColDefs,getExistingColumns,getExistingColumnFields, mapMasterToTaskStatusColumnGroupDefs, mapTaskStatusDataToRowData } from "../../../../../helpers/utils"
import TaskStatusMasterDetail from "./TaskStatusMasterDetail"
import { useGetTaskDetailDownloadData,useGetMasterUIConfiguration, useGetMTOTaskStatusData, useGetAllUsers } from "../../../../../VectorFlow/Services/MTA/MDM"
import VFLoader from "../../../../../components/VectorFLOW/commons/VFLoader"
import { GridRef, Master } from "../../../../../VectorFlow/types/MDM"
import { AgGridReactProps } from "ag-grid-react"
import { notifyError } from "../../../../../helpers/notify"
import { ColDef } from "ag-grid-enterprise"
import { useUserData } from "../../../../../context"

import * as globalStyles from '../../../../../styles/global'


const MTOTaskStatus = ()=>{


    // const {data,isLoading} = useGetTaskStatusData()
    const {mutateAsync: getMTOTaskStatusData, isLoading} = useGetMTOTaskStatusData();
    const gridRef = useRef<GridRef>()

    const {mutateAsync:getTaskDetailDownloadData} = useGetTaskDetailDownloadData()
    const {mutateAsync:getMasterUIConfiguration} = useGetMasterUIConfiguration()

    const {mutateAsync: getAllUsers} = useGetAllUsers();

    const {user} = useUserData()

    const themeUi = user.user.theme_ui
    
    const [tempAgGridRowData,setTempAgridRowData] = useState<any>([])
    const [currentMasterName,setCurrentMasterName] = useState<string>('')
    const [tempAgGridColDefs,setTempAgGridColDefs] = useState<ColDef[]>([])
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    
    const tempAgGridProps:AgGridReactProps = {
        columnDefs:tempAgGridColDefs,
        onRowDataUpdated:(event)=>{
          if(tempDownloadData)event.api.exportDataAsExcel({fileName:currentMasterName });
        }
      };

    const onDownloadTaskDetails = async(payload:any)=>{
        
       try{
        const actionName = getActionName(payload.Actiontype).value
        const response = await getTaskDetailDownloadData({taskId:payload.TaskID,approverId:payload.ApproverId})
        const currentTaskMaster = response.data.data[0]
        const currentTaskMasterId:number = currentTaskMaster.MasterId
        
        const uiConfigurationResponse = await getMasterUIConfiguration(actionName)
        
        const masters:Master[] = uiConfigurationResponse.data.data
        const currentMasterFields = masters.find((master:Master)=>master.id==currentTaskMasterId)

        if(!currentTaskMaster.data){
            notifyError('Task Details Can be only downloaded by the Approver');
            return
        }
       
        if(currentMasterFields){
          setCurrentMasterName(currentMasterFields.name)
          const existingColumns = getExistingColumns(payload.Actiontype==2?JSON.parse(currentTaskMaster.data[0].new):currentTaskMaster.data[0])
          const existingColumnFields = getExistingColumnFields(existingColumns,currentMasterFields.fields)
          setTempAgGridColDefs(mapMasterToTaskStatusColumnGroupDefs(existingColumnFields,currentTaskMasterId,actionName))
          setTempAgridRowData(mapTaskStatusDataToRowData(currentTaskMaster.data,existingColumnFields,actionName))
          setTempDownloadData(true)
        }
       }catch(error:any){
        notifyError(error.message)
       }
    }

    const [finalData, setFinalData] = useState<any>(undefined);
    // rowData = rowData.map((row:any)=>{
    //     return {
    //         ...row,
    //         PendingSince:formatMDMDate(row.PendingSince),
           
    //     }
    // })
    const mapIdsToNames = (idString: string, data: any): any => {
        // Parse the comma-separated string into an array of numbers
        const ids = idString.split(",").map(id => parseInt(id.trim(), 10));
    
        // Filter and map the objects to their names based on matching IDs
        const names = ids
            .map(id => data.find((person:any) => person.id === id)?.name)
            .filter(name => name); // Remove undefined names (if any ID doesn't match)
    
        // Join the names into a single string
        const result  = names.join(", ");
        // console.log("names list....", result)
        // const approverList = [];
        return result.split(",");
    };


    const MTOToMTAFormat=(inData: any)=>{

        const newData:any = [];
        inData.forEach((val:any)=>{
            const newVal:any = {}
            newVal.TaskID = val.tid;
            newVal.PendingSince = val.co;
            newVal.TaskName = val.tnm;
            newVal.TaskStatus = val.std;
            newVal.Requester = val.r_nm;
            newVal.Approver = mapIdsToNames(val.a_ids, allUsers);
            newVal.Approvers = mapIdsToNames(val.a_ids, allUsers);
            newVal.Aids = val.a_ids;

            newData.push(newVal);
        })

        console.log("enw data", newData);

        return newData;
    }

    const getMTOTaskData = async()=>{
        try{
            const response = await getMTOTaskStatusData();
            const transformedData = MTOToMTAFormat(response.data.data);
            setFinalData(transformedData)
           
        }
        catch(error){
            console.log(error)
        }
    }

    React.useEffect(() => {
        console.log("Final data/////",finalData);
    }, [finalData])

    const [allUsers, setAllUsers] = useState<any>([])

    const GetAllUsersData = async()=>{
        try{

            const response = await getAllUsers();
            console.log("response.....", response.data);
            setAllUsers(response.data);
        }
        catch(e){
            console.log(e)
        }
    }
    

    React.useEffect(()=>{


            // const newRowData = [...rowData];

            // newRowData.sort((a:any,b:any)=>{
            //     return differenceInSeconds(formatDate(b.PendingSince),formatDate(a.PendingSince)) 
            // })
            // setRowData(newRowData)
            GetAllUsersData();
            
        
    },[])

    React.useEffect(()=>{
        if(allUsers.length>0){
            getMTOTaskData();
        }
    },[allUsers])
        
                
                if(isLoading){
                    return <VFLoader/>
                }
                
                return(
                    <div style={{paddingTop:'20px', paddingLeft: "25px",height:'95%'}}>
            <VFTable
                masterDetail
                detailCellRenderer={TaskStatusMasterDetail}
                detailCellRendererParams={{
                    onDownload:onDownloadTaskDetails
                }}
                rowHeight={60}
                detailRowAutoHeight
                gridOptions={{
                    getRowStyle: (params: any) => {
                        if (params.node.rowIndex % 2 === 0) {
                            return { background: "#EBEBEB" };
                        }
                        return { background: "#F7F7F7" };
                    },
                    enableRangeSelection:true,
                    rowSelection:'multiple',
                  
                }}
                statusBar={{
                    statusPanels:[
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                      { statusPanel: 'agAggregationComponent', align: 'left' },
                    ]
                  }}
                rowData={finalData}
                columnDefs={mapTaskStatusToColDefs([
                    {
                        field:"TaskID",
                        colId:"TaskID",
                        headerName:"Task Id",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        },
                        cellRenderer: 'agGroupCellRenderer' 
                    },
                    {
                        field:"PendingSince",
                        colId:"PendingSince",
                        headerName:"Date",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"TaskName",
                        colId:"TaskName",
                        headerName:"Activity",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"Approver",
                        colId:"Approver",
                        headerName:"Approver Name",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"Requester",
                        colId:"Requester",
                        headerName:"Requester Name",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    },
                    {
                        field:"TaskStatus",
                        colId:"TaskStatus",
                        headerName:"Status",
                        flex:1,
                        cellStyle: {
                            "textAlign": "center",
                        }
                    }
                ],globalStyles.chooseThemeColor[themeUi].color4)}
                pagination
                // paginationPageSize={10}            
                paginationPageSize={parseInt(process.env.REACT_APP_TASKSTATUS_PAGE || '200')}  
                height={"100%"}          

            />
            <div style={{display:'none'}}>                
                  <VFTable
                    ref={gridRef}
                    rowData={tempAgGridRowData}
                    {...tempAgGridProps}
                  />
                </div>
        </div>
    )
}

export default MTOTaskStatus