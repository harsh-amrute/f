import {useEffect,useState,useMemo,useRef} from 'react'
import {AgGridReactProps} from 'ag-grid-react'
import { GridRef } from '../../../../../VectorFlow/types/MDM'
import { mapResearchInsightsFieldsToColDefs } from '../../../../../helpers/utils'

import {BPRTagsCellRenderer,BPRTechColorCellRenderer,BPREcoColorCellRenderer} from '../../SupplyChainIntelligenceHub/BPR/BPRCellRenderers'
import BPRGraphCellRenderer from '../../SupplyChainIntelligenceHub/BPR/BPRGraphCellRenderer'

import { useGetBPRData, useGetBPRUIConfiguration } from "./../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"
import { isSameDay } from 'date-fns'


const useResearchInsights = ()=>{

    const {data,isLoading:isBPRUILoading} = useGetBPRUIConfiguration()
    const [ResearchInsightsData,setResearchInsightsRowData] = useState<Array<any>>([])
    const {mutateAsync:getBPRData,isLoading:isBPRDataLoading} = useGetBPRData()

    const [selectedRows,setSelectedRows] = useState<Array<any>>([])
    const [horizon,setHorizon] = useState<number>(30)
    const [techDates,setTechDates] = useState<Array<{color:string,date:any}>>([

        {
            "date": "2024-02-29T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-02-28T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-02-27T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-02-26T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-02-25T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-02-24T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-02-23T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-22T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-02-21T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-02-20T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-02-19T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-18T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-02-17T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-02-16T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-15T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-02-14T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-02-13T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-02-12T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-02-11T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-10T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-09T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-08T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-02-07T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-02-06T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-02-05T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-02-04T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-02-03T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-02T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-02-01T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-01-31T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-01-30T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-01-29T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-01-28T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-01-27T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-01-26T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-01-25T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-01-24T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-23T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-01-22T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-01-21T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-01-20T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-19T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-01-18T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-17T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-01-16T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-01-15T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-01-14T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-01-13T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2024-01-12T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-11T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-10T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-09T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-08T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2024-01-07T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-01-06T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-05T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-01-04T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2024-01-03T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2024-01-02T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2024-01-01T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2023-12-31T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-30T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2023-12-29T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-28T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-27T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2023-12-26T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2023-12-25T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2023-12-24T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2023-12-23T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-22T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2023-12-21T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2023-12-20T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2023-12-19T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-18T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2023-12-17T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-16T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2023-12-15T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-14T12:20:09.594Z",
            "color": "Yellow"
        },
        {
            "date": "2023-12-13T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2023-12-12T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2023-12-11T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-10T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2023-12-09T12:20:09.594Z",
            "color": "Black"
        },
        {
            "date": "2023-12-08T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-07T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-06T12:20:09.594Z",
            "color": "Red"
        },
        {
            "date": "2023-12-05T12:20:09.594Z",
            "color": "White"
        },
        {
            "date": "2023-12-04T12:20:09.594Z",
            "color": "Green"
        },
        {
            "date": "2023-12-03T12:20:09.594Z",
            "color": "Black"
        }
    ])

    const ref = useRef<GridRef>();

    useEffect(()=>{
        async function getBPRRowData(){
            const rowData =await  getBPRData({
                filters:[],
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:50
                }
            })
            setResearchInsightsRowData(rowData.data.data)
        }
        getBPRRowData()
    },[])

    const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
        colorTechCellRenderer:BPRTechColorCellRenderer,
        colorEcoCellRenderer:BPREcoColorCellRenderer,
        tagsCellRenderer:BPRTagsCellRenderer
      }), []);
  
    const agGridProps:AgGridReactProps = {
        
        suppressRowTransform:true,
        readOnlyEdit:true,
        rowSelection:'multiple',
        gridOptions:{
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },
        },
        pagination:true,
        paginationPageSize:25,
        suppressRowClickSelection:true,
        components:customCellRenderers,
        onRowSelected:(params)=>setSelectedRows(params.api.getSelectedRows()),
        defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType:false,
            resizable:false,
            cellStyle:{
                "flex":1,
                'text-align':'center',
                'height':'50px',
                "font-style":"normal",
                " font-variant":"normal",
                " font-weight":"300",
                " font-size":"20px",
                " font-family":"Roboto",
                "display":"block",
                'text-overflow':'ellipsis',
                'white-space':'nowrap'
            },
        }
    }

    
    
    const getColor = (date:any)=>{
        const doesExist = techDates.slice(0,horizon).find((d)=>isSameDay(d.date,date))
        return doesExist?doesExist.color:'gray'
    }

    const ResearchInsightsColumns = mapResearchInsightsFieldsToColDefs(data?.data.data)

    return {
        ref,
        agGridProps,
        ResearchInsightsData,
        ResearchInsightsColumns,
        isLoading:isBPRDataLoading || isBPRUILoading,
        techDates,
        horizon,
        selectedRows,
        setHorizon,
        getColor
    }
}

export default useResearchInsights