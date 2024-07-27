import { AgChartsReact } from 'ag-charts-react';
import { GridReadyEvent } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-enterprise';
import { Allotment, LayoutPriority } from 'allotment';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getColumnDefinations } from '../../../../../helpers/utils';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import BufferAssignment from '../../Common/RouteAssignment/BufferAssignment';
import RouteAssignment from '../../Common/RouteAssignment/RouteAssignment';
import { Wrapper } from './DueDateQuotation.styled';
import { BlurCover, CardCover, DashedCard, MessageText } from '../EnquiryResponse/styles';
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline';
import { useGetRouteDetails } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';

const Step2 = ({gridOptions, columnData ,selectedRows, theme, chartOptions, masters, getMastersData, rowsSelectedForAssignment,setRowsSelectedForAssignment}: any) => {
    useEffect(()=>{
        getMastersData();
        setRowsSelectedForAssignment(false)
    },[]);

    useEffect(() => {
      setTimeout(()=>{
            allotment.current.reset();
      }, 0)
    }, [rowsSelectedForAssignment])
    

    const customization = {
        Route:{
            pinned: "right",
            lockPosition: true,
            maxWidth:150,
            cellStyle:{
                background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        ProductionBuffer:{
            pinned: "right",
            lockPosition: true,
            maxWidth:150,
            cellStyle:{
                background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        ProcurementBuffer:{
            pinned:"right",
            lockPosition: true,
            maxWidth:150,
            cellStyle:{
                background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        CRDD:{
            pinned:"right",
            lockPosition: true,
            maxWidth:150,
            cellStyle:{
                background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        EstimatedDD:{
            pinned: "right",
            lockPosition: true,
            maxWidth:150,
            cellStyle:{
                background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
    }

    const extras: any = [
        {
            field: "",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            suppressMenu: true,
            maxWidth: 50,
            position: 0,
            filter: false
        },
    ]
    

    const columnDefs = useMemo(() => {
        return getColumnDefinations(columnData || [], customization, extras);
    }, []);

    const options: GridOptions = {
            ...gridOptions,
            columnDefs: columnDefs,
            getRowStyle:(params: any) => null
        }

    // const rows = useMemo(()=> selectedRows.values().map((node: any) => node.data), [])   
    const [rows, setRows] = useState(selectedRows.values().map((node: any) => node.data));
    const [newSelectedRows, setNewSelectedRows] = useState<any>({rows:null, isAssignmentPossible: false});
    const [selectedRoutes, setSelectedRoutes] = useState([])
    
    const allotment = useRef<any>();
    const routeDiv = useRef<any>();
    const [selectedBuffers, setSelectedBuffers] = useState([]);
    const [isEditable, setIsEditable] = useState(false);

    const { mutateAsync: getRouteDetails, } = useGetRouteDetails();
    const getRoute = async (route_id: number) => {
        const data = await getRouteDetails(route_id);
        const routeDetails = data.data.data;
        routeDetails.sort((a:any,b:any) => a.ps - b.ps)
        const selectedRoute: any = []
        routeDetails.forEach((routeDetail: any) => {
            const obj = []
            const ccrGroup = masters.ccrGroups.find((ccr: any) => ccr.value === routeDetail.ccrGrpId);
            obj[0] = ccrGroup;
            obj[1] = ccrGroup.ccrs.find((ccr: any) => ccr.value === routeDetail.ccrId)
            selectedRoute[routeDetail.ps - 1] = obj 
        })

        return selectedRoute
    }

    const getSelectedBuffer = (prod_buffer: any, proc_buffer: any) => {
        const buffer = [null, null];
        if(prod_buffer.length == 1){
            const prodBuff = masters.prodMaster.find((prod: any)=> prod.value === prod_buffer[0]);
            buffer[0] = prodBuff
        }
        if(proc_buffer.length == 1){
            const procBuff = masters.procMaster.find((proc: any)=> proc.value === proc_buffer[0]);
            buffer[1] = procBuff
        }
        return buffer
    }   

    console.log(routeDiv.current?.offsetHeight);
    
    return (
        <>
            <Allotment vertical separator ref={allotment} snap={false} proportionalLayout={false}>
                <Allotment.Pane preferredSize={rowsSelectedForAssignment ? "30%" :'50%'} key={1}>
                    <Wrapper style={{ margin: 0 }}>
                        <VFTable
                            key="selectedRows"
                            gridOptions={options}
                            columnDefs={options.columnDefs}
                            rowData={rows}
                            onSelectionChanged={async (params: GridReadyEvent)=>{
                                const selected = params.api.getSelectedRows();
                                if(selected.length){
                                    setRowsSelectedForAssignment(true);
                                }else{
                                    setRowsSelectedForAssignment(false);
                                    return
                                }
                                const selectedRoutes: any = new Set();
                                const selectedProdBuffer: any = new Set();
                                const selectedProcBuffer: any = new Set();
                                selected.forEach((row: any) => {
                                    if(row.rid){
                                        selectedRoutes.add(row.rid);
                                    }
                                    if(row.prid){
                                        selectedProdBuffer.add(row.prid);
                                    }
                                    if(row.pcid){
                                        selectedProcBuffer.add(row.pcid);
                                    }
                                }) 
                                const isAssignmentPossible = ([0,1].includes(selectedRoutes.size))&&([0,1].includes(selectedProdBuffer.size))&&([0,1].includes(selectedProcBuffer.size))
                                if(selectedRoutes.size == 1 && isAssignmentPossible){
                                    const routeDetails = await getRoute([...selectedRoutes][0]);
                                    setSelectedRoutes(routeDetails);
                                }
                                if((selectedProdBuffer.size == 1 || selectedProcBuffer.size == 1) && isAssignmentPossible){
                                    const buffer: any = getSelectedBuffer([...selectedProdBuffer], [...selectedProcBuffer]);
                                    setSelectedBuffers(buffer)
                                }
                                setNewSelectedRows({rows:selected, isAssignmentPossible });
                                if(!isAssignmentPossible){
                                    setSelectedBuffers([])
                                    setSelectedRoutes([])
                                }
                            }}
                            onColumnPinned={(params: GridReadyEvent)=>{
                                params.columnApi.autoSizeAllColumns();
                            }}
                            onGridReady={(params: GridReadyEvent) => {
                                params.columnApi.autoSizeAllColumns();
                            }}
                            
                        />
                    </Wrapper>
                </Allotment.Pane>
                { rowsSelectedForAssignment &&
                        <Allotment.Pane preferredSize={176 + 50} key={2}>
                                {/* <Wrapper style={{ margin: 0, filter:"blur(3px)" }} > */}
                                <Wrapper style={{ margin: 0, filter: newSelectedRows.isAssignmentPossible ? "unset" :"blur(3px)"}} >
                                    <div ref={routeDiv} style={{ height:"100%",background: "white", boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px", margin: "20px 10px", padding: "1rem", position:"relative" }}>
                                        <div style={{display:"flex", position:"absolute", right:"1rem", gap:"0.5rem"}}>
                                            <VFButton 
                                                themeUi={theme} 
                                                onClick={()=>{
                                                    setIsEditable(!isEditable);
                                                }} 
                                                style={{fontSize:"10px", width:"50px", height:"20px", padding:"0 1rem"}}>
                                                    {isEditable?"Save": "Edit"}
                                                </VFButton>
                                            <VFButtonOutline themeUi={theme} onClick={()=>console.log()} style={{fontSize:"10px", width:"50px", height:"20px", padding:"0 1rem"}}>Reset</VFButtonOutline>
                                        </div>
                                        <div style={{display: "flex", gap: "2rem"}}>
                                            <div style={{ flex: "1" }}>
                                                <h3>Route Assignment</h3>
                                                <RouteAssignment 
                                                    isEditable={isEditable}
                                                    theme={theme} 
                                                    ccrGroupMaster={masters.ccrGroups} 
                                                    selectedRoutes={selectedRoutes}
                                                    setSelectedRoutes={setSelectedRoutes}
                                                />
                                            </div>
                                            <div style={{ flex: "1" }}>
                                                <h3>Buffer Assignment</h3>
                                                <BufferAssignment 
                                                    isEditable={isEditable}
                                                    theme={theme} 
                                                    bufferMaster={masters} 
                                                    selectedBuffers={selectedBuffers}
                                                    setSelectedBuffers={setSelectedBuffers}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Wrapper>
                                {!newSelectedRows.isAssignmentPossible &&
                                 <BlurCover style={{borderRadius:"0"}}>
                                 <CardCover>
                                     <DashedCard style={{width:"500px"}}>
                                     <MessageText style={{textAlign: "center", display:"flex", flexDirection:"column", width:"100%", gap:"2rem"}}>
                                         <div>
                                             Selected orders have different routes and buffer.<br/>
                                             Do you want to edit these orders together?
                                         </div>
                                         <div style={{display:"flex", gap:"1rem",justifyContent:"center"}}>
                                            <VFButtonOutline 
                                                themeUi={theme} 
                                                onClick={()=>{
                                                    setNewSelectedRows({...newSelectedRows, isAssignmentPossible: true})
                                                    setSelectedBuffers([])
                                                    setSelectedRoutes([])
                                                }}
                                            >
                                                Yes
                                            </VFButtonOutline>
                                             <VFButtonOutline themeUi={theme} onClick={()=>{console.log()}}>No</VFButtonOutline>
                                         </div>
                                     </MessageText>
                                     </DashedCard>
                                 </CardCover>
                             </BlurCover>
                                }
                               
                        </Allotment.Pane>
                }
                {rowsSelectedForAssignment &&  
                        <Allotment.Pane preferredSize={'25%'} key={3}>
                            <Wrapper style={{ padding: "20px 0", margin: 0 }}>
                                <AgChartsReact options={chartOptions} />
                            </Wrapper>
                        </Allotment.Pane>
                }
                { !rowsSelectedForAssignment && 
                    <Allotment.Pane preferredSize={"50%"} key={4}>
                        <Wrapper style={{  justifyContent: "center", alignItems:"center", background: "white", margin: "20px 0",height: "calc(100% - 30px)", color:"grey"}}>
                            <div style={{fontSize:"16px"}}>No Data to Display</div>
                            <div style={{fontSize:"12px"}}>Please Select Orders to Process</div>
                        </Wrapper>
                    </Allotment.Pane>
                }
            </Allotment>
        </>
    )
}

export default Step2