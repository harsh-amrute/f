import {useEffect, useState,useContext } from "react";

// import "./styles.css";
import VFTable from "../../../../../../../../components/VectorFLOW/commons/VFTable";
// import _ from "lodash";
import '../../styles.css';
import { useGetPlanningDataCustom } from "../../../../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
import VFLoader from "../../../../../../../../components/VectorFLOW/commons/VFLoader";
import { notifyLoader,notifyError,notifySuccess } from "../../../../../../../../helpers/notify";
import { SCDynamicContainer } from "../../styles";
import { toast } from 'react-toastify';
import { useGetState } from "../../../../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import { GridStateContext } from "../../../../../../../../context/GridStateContext";
import { GridState } from "../../../../../../../../VectorFlow/types/BPR";
import { getProductAndLocationHeirarchiesFromEnv, convertStringNumToNumber } from '../../../../../../../../helpers/utils';




const ExcessInventoryCustomCharts = ({recordCount}:{recordCount:any}) => {

    const [rowData,setRowData] = useState<any>();
    const [colDefs,setColDefs] = useState<any>();
    const {ref} = useContext(GridStateContext)

    const [gridState,setGridState] = useState<GridState>()

    const chunkSize = 10000;

    const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()
    const {mutateAsync:getPlanningDataCustom,isLoading} = useGetPlanningDataCustom();

    const mapUIConfigToColdefs = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        colDefs = columns.map((column:{header:string,colCode:string})=>{
            const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{enablePivot:true, enableValue:true,enableRowGroup:true}); 
            if(customColdef) return customColdef;

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
    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState({reportname: "ExcessInventorycustom"})
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
    },[])
    
    useEffect(()=>{
        const fetchCustomPlanningData = async ()=> {
            const rows:any = [];
            let uiconfig = [];
            try {
     
                const numberOfPages = Math.ceil(recordCount/chunkSize);
                const toastId = notifyLoader(`Downloading Data 0 / ${recordCount}`)
                
                for(let i=1; i<=numberOfPages; i++){
                    const body = {
                        category:'excessInventory',
                        type:'review',
                        filters:[],
                        paginationParameter:{
                            pageNumber:i,
                            recordsPerPage:chunkSize
                        }
                    }
                    const result = await getPlanningDataCustom(body);
                    if(result.data.data === null) throw new Error("Something Went Wrong")
                    if(uiconfig.length < 1){
                        uiconfig = result.data.data['uiConfig']
                    }
                    const rowDataAfterTypeCasting = convertStringNumToNumber(result.data.data.data)
                    rows.push(...rowDataAfterTypeCasting)
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
            console.log(rows)
            setRowData(rows);

        }
        fetchCustomPlanningData();
    },[])
   

    if(isLoading || isSavedDataLoading){
        return <VFLoader/>
    }

    const sideBarForExcessInventory = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        // toolPanelParams: {},
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ],
    defaultToolPanel:'',
    }


    
    return(
        <>
        <SCDynamicContainer className="ag-theme-planning-custom">
            <VFTable
                ref={ref}
                columnDefs={colDefs}
                rowData={rowData}
                sideBar={sideBarForExcessInventory}
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
                onGridReady={(params)=>{
                    if(gridState){
                        params.api.applyColumnState({state:gridState.columns})
                        params.api.setGridOption('pivotMode',gridState.pivot)
                        if(gridState.charts && Array.isArray(gridState.charts) && gridState.charts.length>0){
                            gridState.charts.forEach((c:any)=>{
                                params.api.restoreChart(c)
                            }) 
                        }              
                    }
                 }}
                pivotMode={true}
                suppressDragLeaveHidesColumns={true}
                disableZoomScaling={true}
                rowHeight={30}
                height={'100%'}
            />
        </SCDynamicContainer>
        </>
    )
    
}

export default ExcessInventoryCustomCharts;