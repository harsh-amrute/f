import { AgChartsReact } from 'ag-charts-react';
import { GridReadyEvent } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-enterprise';
import { Allotment} from 'allotment';
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
import _ from 'lodash';
import { format, max } from 'date-fns';

const Step2 = ({gridOptions, columnData ,selectedRows, theme, chartOptions, masters, getMastersData, rowsSelectedForAssignment,setRowsSelectedForAssignment}: any) => {
    useEffect(()=>{
        getMastersData();
        setRowsSelectedForAssignment(false);
        setRows(Array.from(selectedRows.values()).map((node: any) => {
            if(node.data.rid){
                routeLookup.current.set(node.data.rn, node.data.rid);
            }
            return node.data
        }))
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
            minWidth:120,
            tooltipField: "rn",
            cellStyle:{
                // background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        ProductionBuffer:{
            pinned: "right",
            lockPosition: true,
            minWidth:120,
            cellStyle:{
                // background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        ProcurementBuffer:{
            pinned:"right",
            lockPosition: true,
            minWidth:120,
            cellStyle:{
                // background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        CRDD:{
            pinned:"right",
            lockPosition: true,
            minWidth:120,
            cellStyle:{
                // background: "#BC3D814F",
                color: "#BC3D81",
                fontWeight: "bold"
            }
        },
        EstimatedDD:{
            pinned: "right",
            lockPosition: true,
            minWidth:120,
            cellStyle:{
                // background: "#BC3D814F",
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
            // tooltipTrigger:"focus",
            // getRowStyle:(params: any) => null
        }

    // const rows = useMemo(()=> selectedRows.values().map((node: any) => node.data), [])   
    const routeLookup = useRef(new Map());
    const [rows, setRows] = useState<any>(null);
    const [newSelectedRows, setNewSelectedRows] = useState<any>({rows:null, isAssignmentPossible: false});
    const [selectedRoute, setSelectedRoute] = useState<any>([])
    
    const allotment = useRef<any>();
    const routeDiv = useRef<any>();
    const gridRef = useRef<any>();
    const [selectedBuffers, setSelectedBuffers] = useState<any[]>([]);
    const [isEditable, setIsEditable] = useState(false);

    const { mutateAsync: getRouteDetails, } = useGetRouteDetails();
    const routeCache = useRef<Record<number, any>>({});
    const [no, setNo] = useState(false);

    const getRoute = async (route: any) => {
        if(typeof route === "number"){
            if(routeCache.current[route]){
                return _.cloneDeep(routeCache.current[route])
            }
            const data = await getRouteDetails(route);
            const routeDetails = data.data.data;
            routeDetails.sort((a:any,b:any) => a.ps - b.ps)
            const newRoute: any = []
            routeDetails.forEach((routeDetail: any) => {
                const obj = []
                const ccrGroup = masters.ccrGroups.find((ccr: any) => ccr.value === routeDetail.ccrGrpId);
                obj[0] = ccrGroup;
                obj[1] = ccrGroup.ccrs.find((ccr: any) => ccr.value === routeDetail.ccrId)
                newRoute[routeDetail.ps - 1] = obj 
            })
            routeCache.current[route] = newRoute;
            return _.cloneDeep(newRoute)
        } 
        return JSON.parse(route)
    }

    const getBuffer = (prod_buffer: any, proc_buffer: any) => {
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

    // const calculateDueDate = () => {
    //         const selectedOrders = new Set(gridRef.current.api.getSelectedRows().map((row:any) => row.ok));
    //         const ccrIds:any = [];

    //         selectedRoute.forEach((route: any)=>{
    //             if(route[1]?.value){
    //                 ccrIds.push(route[1].value)
    //             }
    //         })

    //         const ccr_prev_pending:any = {};
            
    //         ccrIds.forEach((ccrId:any)=>{
    //             const ccr = masters.CCRMaster.find((ccr:any)=>{
    //                 return ccr.ccr_id === ccrId
    //             })
    //             const ccr_fol_data = masters.FOL[ccrId];
    //             let ccrWorkingHoursPerDay = ccr.working_hours_per_day || "0";
    //             const folInDays =  ccr_fol_data.fol;
    //             ccrWorkingHoursPerDay = parseInt(ccrWorkingHoursPerDay); 

    //             ccr_prev_pending[ccrId] = {
    //                 ccr_id: ccrId,
    //                 prevPend: Math.ceil((folInDays * ccrWorkingHoursPerDay * 60) + ccr_fol_data.ocm)
    //             }
    //             console.log(ccrId, (ccr_prev_pending[ccrId].prevPend));
                
    //         });

    //         console.log(masters);
    //         console.log(ccrIds)
    //         console.log(ccr_prev_pending)

    //         const newRows = rows.map((row:any) => {
    //             if(selectedOrders.has(row.ok)){
    //                 const order_ccr_data:any = {};

    //                 //calculating order load
    //                 ccrIds.forEach((ccrId:any)=>{
    //                     const ccr = masters.CCRMaster.find((ccr:any)=>{
    //                         return ccr.ccr_id === ccrId
    //                     })
    //                     // const fol = masters.FOL[ccrId];
    //                     const ccrItem = masters?.CCRItemTypeMappingMaster.find((ccr:any)=> ccr.ccrId === ccrId && ccr.it == row.itid)

    //                     let ccrWorkingHoursPerDay = ccr.working_hours_per_day || "0";
    //                     ccrWorkingHoursPerDay = parseInt(ccrWorkingHoursPerDay); 

    //                     const orderLoad = Math.ceil((ccrItem.tt * row.pcqty)) // (60 * ccrWorkingHoursPerDay))

    //                     order_ccr_data[ccrId] = {
    //                         ccr_id: ccrId,
    //                         orderLoad: orderLoad,
    //                         folSpan: ((ccr_prev_pending[ccrId].prevPend) + orderLoad)/ (ccrWorkingHoursPerDay * 60),
    //                     }
    //                     console.log("ccr_prev_pending", ccr_prev_pending[ccrId])
    //                     // console.log(ccrId, "orderLoad", order_ccr_data[ccrId].orderLoad, "folSpan" ,order_ccr_data[ccrId].folSpan, "order pending qty",row.pcqty, "ccr tt", ccrItem.tt, "ccrWorkingHoursPerDay" ,ccrWorkingHoursPerDay)
    //                     ccr_prev_pending[ccrId].prevPend = (ccr_prev_pending[ccrId].prevPend) + orderLoad;
                        
    //                 });

    //                 console.log("order_ccr_data", order_ccr_data)
                    

    //                 //DDIndex
    //                 const maxFol: any = Object.values(order_ccr_data).reduce((prev: any, current: any) => (current.folSpan > prev.folSpan) ? current : prev);

    //                 console.log(maxFol);
    //                 console.log(row.plid);
                    
    //                 // const formattedDate = format(new Date(), 'yyyy-MM-dd');
    //                 const today = new Date();
    //                 today.setHours(0, 0, 0, 0);

    //                 // console.log()

    //                 const latestWorkingDayLno = masters.WorkingCalender.find((data: any)=>{
    //                     return new Date(data.wd) >= today && data.ccrId == maxFol.ccr_id && data.PlId == row.plid
    //                 })?.lno;

    //                 console.log("latestWorkingDayLno", latestWorkingDayLno)


    //                 const residualBuffer = parseFloat(masters?.CCRMaster.find((ccr:any)=>ccr.ccr_id == maxFol.ccr_id)?.residual_buffer); 

    //                 const prodBufferSize = row.prSz || 0;
    //                 const procBufferSize = row.pcSz || 0;
                    
    //                 //optimise the logic
    //                 const folDDIndex = Math.ceil(latestWorkingDayLno + maxFol.folSpan + (residualBuffer * prodBufferSize));
    //                 const folDD =  masters.WorkingCalender.find((data: any)=>{
    //                     return data.lno == folDDIndex && data.ccrId == maxFol.ccr_id && data.PlId == row.plid
    //                 })?.wd;

    //                 const bufferDDIndex = latestWorkingDayLno + procBufferSize + prodBufferSize;
    //                 const bufferDD = masters.WorkingCalender.find((data: any)=>{
    //                     return data.lno == bufferDDIndex && data.ccrId == maxFol.ccr_id && data.PlId == row.plid
    //                 })?.wd;

    //                 console.log("prodBufferSize",  prodBufferSize)
    //                 console.log("procBufferSize",  procBufferSize)
    //                 console.log("residualBuffer",  residualBuffer)
    //                 console.log("max fol span",  maxFol.folSpan)
    //                 // console.log(folDDIndex, bufferDDIndex)

    //                 console.log(folDDIndex)
    //                 console.log(bufferDDIndex)

    //                 const crDD = row.crdd;

    //                 const crddFlag = 0
    //                 let maxDate;

    //                 if(crddFlag){
    //                     maxDate = max([folDD, bufferDD, crDD]);
    //                 }else{
    //                     maxDate = max([folDD, bufferDD]);
    //                 }

    //                 // console.log(maxDate);

    //                 row.cdd = format(maxDate, 'yyyy-MM-dd');

    //                 // console.log("maxDate", format(maxDate, 'yyyy-MM-dd'));
    //             }
    //             return row
    //         });
    //         setRows(newRows);
    // }


    const onSave = () => {
        if(isEditable){
            const selectedOrders = new Set(gridRef.current.api.getSelectedRows().map((row:any) => row.ok));
            const ccrIds:any = [];
            const formattedRoute = formatRoute(selectedRoute);
            selectedRoute.forEach((route: any)=>{
                if(route[1]?.value){
                    ccrIds.push(route[1].value)
                }
            })

            const prodBuffer = selectedBuffers[0];
            const procBuffer = selectedBuffers[1];

            const ccr_prev_pending:any = {};
            
            ccrIds.forEach((ccrId:any)=>{
                const ccr = masters.CCRMaster.find((ccr:any)=>{
                    return ccr.ccr_id === ccrId
                })
                const ccr_fol_data = masters.FOL[ccrId];
                let ccrWorkingHoursPerDay = ccr.working_hours_per_day || "0";
                const folInDays =  ccr_fol_data.fol;
                ccrWorkingHoursPerDay = parseInt(ccrWorkingHoursPerDay); 

                ccr_prev_pending[ccrId] = {
                    ccr_id: ccrId,
                    prevPend: Math.ceil((folInDays * ccrWorkingHoursPerDay * 60) + ccr_fol_data.ocm)
                }
                console.log(ccrId, (ccr_prev_pending[ccrId].prevPend));
                
            });

            console.log(masters);
            console.log(ccrIds)
            console.log(ccr_prev_pending)

            const newRows = rows.map((row:any) => {
                if(selectedOrders.has(row.ok)){
                    //update the routes in all the orders
                    row.rn = formattedRoute;
                    row.newRoute = selectedRoute;
                    //update the buffers in all the orders
                    row.nprid = prodBuffer?.value
                    row.npcid =  procBuffer?.value

                    row.prodc = prodBuffer?.label
                    row.procc = procBuffer?.label

                    row.prSz = prodBuffer?.size;
                    row.pcSz = procBuffer?.size;

                    const order_ccr_data:any = {};

                    //calculating order load
                    ccrIds.forEach((ccrId:any)=>{
                        const ccr = masters.CCRMaster.find((ccr:any)=>{
                            return ccr.ccr_id === ccrId
                        })
                        // const fol = masters.FOL[ccrId];
                        const ccrItem = masters?.CCRItemTypeMappingMaster.find((ccr:any)=> ccr.ccrId === ccrId && ccr.it == row.itid)

                        let ccrWorkingHoursPerDay = ccr.working_hours_per_day || "0";
                        ccrWorkingHoursPerDay = parseInt(ccrWorkingHoursPerDay); 

                        const orderLoad = Math.ceil((ccrItem.tt * row.pcqty)) // (60 * ccrWorkingHoursPerDay))

                        order_ccr_data[ccrId] = {
                            ccr_id: ccrId,
                            orderLoad: orderLoad,
                            folSpan: ((ccr_prev_pending[ccrId].prevPend) + orderLoad)/ (ccrWorkingHoursPerDay * 60),
                        }
                        console.log("ccr_prev_pending", ccr_prev_pending[ccrId])
                        // console.log(ccrId, "orderLoad", order_ccr_data[ccrId].orderLoad, "folSpan" ,order_ccr_data[ccrId].folSpan, "order pending qty",row.pcqty, "ccr tt", ccrItem.tt, "ccrWorkingHoursPerDay" ,ccrWorkingHoursPerDay)
                        ccr_prev_pending[ccrId].prevPend = (ccr_prev_pending[ccrId].prevPend) + orderLoad;
                        
                    });

                    console.log("order_ccr_data", order_ccr_data)
                    

                    //DDIndex
                    const maxFol: any = Object.values(order_ccr_data).reduce((prev: any, current: any) => (current.folSpan > prev.folSpan) ? current : prev);

                    console.log(maxFol);
                    console.log(row.plid);
                    
                    // const formattedDate = format(new Date(), 'yyyy-MM-dd');
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    // console.log()

                    const latestWorkingDayLno = masters.WorkingCalender.find((data: any)=>{
                        return new Date(data.wd) >= today && data.ccrId == maxFol.ccr_id && data.PlId == row.plid
                    })?.lno;

                    console.log("latestWorkingDayLno", latestWorkingDayLno)


                    const residualBuffer = parseFloat(masters?.CCRMaster.find((ccr:any)=>ccr.ccr_id == maxFol.ccr_id)?.residual_buffer); 

                    const prodBufferSize = row.prSz || 0;
                    const procBufferSize = row.pcSz || 0;
                    
                    //optimise the logic
                    const folDDIndex = Math.ceil(latestWorkingDayLno + maxFol.folSpan + (residualBuffer * prodBufferSize));
                    const folDD =  masters.WorkingCalender.find((data: any)=>{
                        return data.lno == folDDIndex && data.ccrId == maxFol.ccr_id && data.PlId == row.plid
                    })?.wd;

                    const bufferDDIndex = latestWorkingDayLno + procBufferSize + prodBufferSize;
                    const bufferDD = masters.WorkingCalender.find((data: any)=>{
                        return data.lno == bufferDDIndex && data.ccrId == maxFol.ccr_id && data.PlId == row.plid
                    })?.wd;

                    console.log("prodBufferSize",  prodBufferSize)
                    console.log("procBufferSize",  procBufferSize)
                    console.log("residualBuffer",  residualBuffer)
                    console.log("max fol span",  maxFol.folSpan)
                    // console.log(folDDIndex, bufferDDIndex)

                    console.log(folDDIndex)
                    console.log(bufferDDIndex)

                    const crDD = row.crdd;

                    const crddFlag = 0
                    let maxDate;

                    if(crddFlag){
                        maxDate = max([folDD, bufferDD, crDD]);
                    }else{
                        maxDate = max([folDD, bufferDD]);
                    }

                    // console.log(maxDate);

                    row.cdd = format(maxDate, 'yyyy-MM-dd');

                    // console.log("maxDate", format(maxDate, 'yyyy-MM-dd'));
                }
                return row
            });

            setRows(newRows);
            setSelectedBuffers([])
            setSelectedRoute([])
            setRowsSelectedForAssignment(false);
        }
        setIsEditable(!isEditable);
        
    }

    const onReset = async () => {
        const selectedOrders = new Set(gridRef.current.api.getSelectedRows().map((row:any) => row.ok));
        const newRows = [...rows];

        const promises = newRows.map(async (row) => {
            if (selectedOrders.has(row.ok)) {
                // Unset the modified values
                row.newRoute = undefined;
                row.nprid = undefined;
                row.npcid = undefined;
    
                try {
                    // Retrieve route and format it
                    const route = await getRoute(row.rid);
                    row.rn = formatRoute(route);
    
                    // Retrieve buffer data
                    const buffer:any = await getBuffer([row.prid], [row.pcid]);
                    row.prodc = buffer[0]?.label || "";
                    row.procc = buffer[1]?.label || "";
                    row.prSz = buffer[0]?.size;
                    row.pcSz = buffer[1]?.size;
                } catch (error) {
                    console.error(`Error fetching data for row ${row}:`, error);
                }
            }
        });
    
        // Wait for all promises to resolve
        await Promise.all(promises);
        setRows(newRows);
        setSelectedBuffers([])
        setSelectedRoute([])
        setRowsSelectedForAssignment(false);
    }


    const formatRoute = (route:any) => {
        let formattedRoute:any = []
        route.forEach((route: any)=>{
            if(route[1]?.label){
                formattedRoute.push(route[1]?.label);             
            }
        })
        formattedRoute = formattedRoute.join("/"); 
        return formattedRoute
    }

   
    return (
        <>
            <Allotment vertical separator ref={allotment} snap={false} proportionalLayout={false}>
                <Allotment.Pane preferredSize={rowsSelectedForAssignment ? "30%" :'50%'} key={1}>
                    <Wrapper style={{ margin: 0 }}>
                        <VFTable
                            key="selectedRows"
                            ref={gridRef}
                            tooltipShowDelay={0}
                            gridOptions={options}
                            columnDefs={options.columnDefs}
                            rowData={rows}
                            onSelectionChanged={async (params: GridReadyEvent)=>{
                                setIsEditable(false);
                                setNo(false)
                                const selected = params.api.getSelectedRows();
                                if(selected.length){
                                    setRowsSelectedForAssignment(true);
                                }else{
                                    setSelectedBuffers([])
                                    setSelectedRoute([])
                                    setRowsSelectedForAssignment(false);
                                    return
                                }
                                const selectedRoutes: any = new Set();
                                const selectedProdBuffer: any = new Set();
                                const selectedProcBuffer: any = new Set();

                                selected.forEach((row: any) => {
                                    if(row.newRoute){
                                        const formattedRoute = formatRoute(row.newRoute);
                                        if(routeLookup.current.get(formattedRoute)){
                                            selectedRoutes.add(routeLookup.current.get(formattedRoute));
                                        }else{
                                            selectedRoutes.add(JSON.stringify(row.newRoute));
                                        }
                                    }
                                    else if (row.rid){
                                        selectedRoutes.add(row.rid);
                                    }
                                    if(row.nprid){
                                        selectedProdBuffer.add(row.nprid);
                                    }
                                    else if(row.prid){
                                        selectedProdBuffer.add(row.prid);
                                    }
                                    if(row.npcid){
                                        selectedProcBuffer.add(row.npcid);
                                    }
                                    else if(row.pcid){
                                        selectedProcBuffer.add(row.pcid);
                                    }
                                }) 
                                const isAssignmentPossible = ([1].includes(selectedRoutes.size))&&([0,1].includes(selectedProdBuffer.size))&&([0,1].includes(selectedProcBuffer.size))
                                // const isAssignmentPossible = (selectedRoutes.size == 1 )&&(selectedProdBuffer.size == 1 )&&(selectedProcBuffer.size == 1)
                                if(!isAssignmentPossible){
                                    setSelectedBuffers([])
                                    setSelectedRoute([])
                                }
                                if(selectedRoutes.size == 1 ){
                                    const routeDetails = await getRoute([...selectedRoutes][0]);
                                    setSelectedRoute(routeDetails);
                                }
                                if((selectedProdBuffer.size == 1 || selectedProcBuffer.size == 1)){
                                    const buffer: any = getBuffer([...selectedProdBuffer], [...selectedProcBuffer]);
                                    setSelectedBuffers(buffer)
                                }
                                setNewSelectedRows({rows:selected, isAssignmentPossible });
                                
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
                                    <div ref={routeDiv} style={{ height:"100%",background: "white", boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px", margin: "20px 10px", padding: "1rem", position:"relative", overflow:"auto"}}>
                                        <div style={{display:"flex", position:"absolute", right:"1rem", gap:"0.5rem"}}>
                                            <VFButton 
                                                themeUi={theme} 
                                                onClick={onSave} 
                                                style={{fontSize:"10px", width:"50px", height:"20px", padding:"0 1rem"}}>
                                                    {isEditable?"Save": "Edit"}
                                                </VFButton>
                                            <VFButtonOutline themeUi={theme} onClick={onReset} style={{fontSize:"10px", width:"50px", height:"20px", padding:"0 1rem"}}>Reset</VFButtonOutline>
                                        </div>
                                        <div style={{display: "flex", gap: "2rem"}}>
                                            <div style={{ flex: "2" }}>
                                                <h3>Route Assignment</h3>
                                                <RouteAssignment 
                                                    isEditable={isEditable}
                                                    theme={theme} 
                                                    ccrGroupMaster={masters.ccrGroups} 
                                                    selectedRoutes={selectedRoute}
                                                    setSelectedRoutes={setSelectedRoute}
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
                                         {!no ? <>
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
                                                    setSelectedRoute([])
                                                }}
                                            >
                                                Yes
                                            </VFButtonOutline>
                                             <VFButtonOutline themeUi={theme} onClick={()=>{setNo(true)}}>No</VFButtonOutline>
                                         </div></>: 
                                            <div>Selected orders have different route and buffer.</div>
                                         }
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