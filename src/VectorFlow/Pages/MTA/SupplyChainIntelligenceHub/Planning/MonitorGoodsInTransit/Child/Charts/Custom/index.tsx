import {useEffect, useContext, useState } from "react";

// import "./styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
// import _ from "lodash";
import '../../../styles.css';
import { useGetPlanningDataCustom } from "../../../../../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
import VFLoader from "../../../../../../../../../components/VectorFLOW/commons/VFLoader";
import { SCDynamicContainer } from "../../../styles";
import { notifyLoader,notifyError,notifySuccess } from "../../../../../../../../../helpers/notify";
import { toast } from 'react-toastify';

import { GridStateContext } from "../../../../../../../../../context/GridStateContext";




const MonitorGITChildCustomCharts = ({recordCount}:{recordCount:number}) => {

    const {ref} = useContext(GridStateContext)
    const [rowData,setRowData] = useState<any>();
    const [colDefs,setColDefs] = useState<any>();


    const chunkSize = 10000;

    const {mutateAsync:getPlanningDataCustom,isLoading} = useGetPlanningDataCustom();

    const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        colDefs = columns.map((column:{header:string,colCode:string})=>{
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header'],
                enablePivot:true,
                enableValue:true,
                enableRowGroup:true,
            }
        })
        return [...colDefs];
    }

    // useEffect(()=>{
    //     const getTableState = async()=>{
    //       try{
    //         const data =  await getState("GITToChildcustom")
    //         setColumnState(JSON.parse(data.data.data))
    //       }catch(err:any){
    //         setColumnState(colDefs)
    //       }
    //     }
    //     getTableState()
    // },[currentGridState])

    useEffect(()=>{
        const fetchCustomPlanningData = async ()=> {
            const rows:any = [];
            let uiconfig = [];
            try {
     
                const numberOfPages = Math.ceil(recordCount/chunkSize);
                const toastId = notifyLoader(`Downloading Data 0 / ${recordCount}`)
                
                for(let i=1; i<=numberOfPages; i++){
                    const body = {
                        category:'git',
                        type:'child',
                        filters:[],
                        paginationParameter:{
                            pageNumber:i,
                            recordsPerPage:chunkSize
                        }
                    }
                    const result = await getPlanningDataCustom(body);
                    if(result.data.data === null) throw new Error("Something Went Wrong")
                    console.log(result.data.data.data);
                    if(uiconfig.length < 1){
                        uiconfig = result.data.data['uiConfig']
                    }
                    rows.push(...result.data.data.data)
                    if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${recordCount} / ${recordCount}`})
                    else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${recordCount}`})
                }
                setColDefs(mapUIConfigToColdefs(uiconfig));
                toast.dismiss(toastId);
           
                notifySuccess(`Data Fetched Successfully`);
              } catch (error) {
                toast.dismiss();
                notifyError('Something Went Wrong');
              }
           
            setRowData(rows);

        }
        fetchCustomPlanningData();
    },[])
   

    if(isLoading){
        return <VFLoader/>
    }

    
    return(
        <>
        <SCDynamicContainer className="ag-theme-planning-custom">
            <VFTable
                ref={ref}
                columnDefs={colDefs}
                rowData={rowData}
                sideBar={true}
                enableCharts={true}
                enableRangeSelection={true} 
                rowSelection="multiple"
                statusBar = {{
                    statusPanels: [
                      { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
                      { statusPanel: 'agTotalRowCountComponent', align:'left' },
                      { statusPanel: 'agFilteredRowCountComponent', align:'left' },
                      { statusPanel: 'agSelectedRowCountComponent', align:'left' },
                      { statusPanel: 'agAggregationComponent', align:'left' },
                    ],
                  }}                defaultColDef={{
                floatingFilter:true,
                filter: "agMultiColumnFilter",
                }}
                disableZoomScaling={true}
                // onGridReady={(params)=>{
                //     if(columnState){
                //      params.columnApi.applyColumnState({state:columnState})
                //     }
                //  }}
                rowHeight={30}
            />
        </SCDynamicContainer>
        </>
    )
    
}

export default MonitorGITChildCustomCharts;