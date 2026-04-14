import {useEffect, useContext, useState } from "react";

// import "./styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
// import _ from "lodash";
import '../../../style.css';
import { useGetPlanningDataCustom } from "../../../../../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
import VFLoader from "../../../../../../../../../components/VectorFLOW/commons/VFLoader";
import { SCDynamicContainer } from "../../../style.css";
import { notifyLoader,notifyError,notifySuccess } from "../../../../../../../../../helpers/notify";
import { toast } from "react-toastify/unstyled";

import { useGetState } from "../../../../../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";

import { GridStateContext } from "../../../../../../../../../context/GridStateContext";
import { GridState } from "../../../../../../../../../VectorFlow/types/BPR";
import {  getColumnDefinationsMTA } from "../../../../../../../../../helpers/utils";
import { UserUIColumnConfigName } from "../../.../../../../../../../../../helpers/Enum";



const MonitorGITChildCustomCharts = ({recordCount}:{recordCount:number}) => {

    const {ref,gridColDefs, setGlobalColDef} = useContext(GridStateContext);
    const [rowData,setRowData] = useState<any>();
    const [colDefs,setColDefs] = useState<any>();

    const [gridState,setGridState] = useState<GridState>()


    const chunkSize = 10000;

    const {mutateAsync:getPlanningDataCustom,isLoading} = useGetPlanningDataCustom();
    const {mutateAsync:getState} = useGetState()

    // remove after merge
    // const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string}>) => {
    //     let colDefs = [];

    //     colDefs = columns.map((column:{header:string,colCode:string})=>{
    //         const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{enablePivot:true, enableValue:true,enableRowGroup:true}); 
    //         if(customColdef) return customColdef;
    //         return {
    //             field:column['colCode'],
    //             colId:column['colCode'],
    //             headerName:column['header'],
    //             enablePivot:true,
    //             enableValue:true,
    //             enableRowGroup:true,
    //         }
    //     })
    //     return [...colDefs];
    // }

    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState({reportname: UserUIColumnConfigName.GIT_To_Child_CS})
            setGridState(JSON.parse(data.data.data))
          }catch(err:any){
            setGridState({
                charts:[],
                columns:colDefs,
                pivot:false
            })
          }
        }
        getTableState()
    },[colDefs])

    useEffect(()=>{
        if(ref?.current?.api && gridState && gridState?.columns?.length>0){
            ref?.current?.api.applyColumnState({state:gridState.columns, applyOrder:true})
            // ref?.current?.api.sizeColumnsToFit();
            ref?.current?.api.setGridOption('pivotMode',gridState.pivot)
        }
    },[gridState,ref])


    useEffect(()=>{
        const fetchCustomPlanningData = async ()=> {
            const rows:any = [];
            try {
     
                const numberOfPages = Math.ceil(recordCount/chunkSize);
                const toastId = notifyLoader(`Downloading Data 0 / ${recordCount}`)
                
                for(let i=0; i<=numberOfPages; i++){
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
                    rows.push(...result.data.data.data)
                    if(i===numberOfPages) toast.update(toastId,{render:`Downloading Data ${recordCount} / ${recordCount}`})
                    else toast.update(toastId,{render:`Downloading Data ${i*chunkSize} / ${recordCount}`})
                }
                // remove after merge
                // setColDefs(mapUIConfigToColdefs(uiconfig));

                setColDefs(getColumnDefinationsMTA(gridColDefs))
                setGlobalColDef(getColumnDefinationsMTA(gridColDefs));
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
        <div className={SCDynamicContainer}>
            <VFTable
                height={'100%'}
                ref={ref}
                columnDefs={colDefs}
                rowData={rowData}
                sideBar={{
                    toolPanels: [
                      {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                          suppressPivots: false,
                          suppressPivotMode: false,
                          suppressRowGroups: false,
                          suppressValues: false,
                        },
                      },
                    ],
                }}
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
                  }}                
                defaultColDef={{
                floatingFilter:true,
                filter: "agMultiColumnFilter",
                cellStyle: {
                  textAlign: "center",
                  fontStyle: "normal",
                  fontVariant: "normal",
                  height: "50px", 
                }
                }}
                disableZoomScaling={true}
                rowHeight={30}
                className="custom-screen-table"
            />
        </div>
        </>
    )
    
}

export default MonitorGITChildCustomCharts;