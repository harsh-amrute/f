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

    const [horizon,setHorizon] = useState<number>(30)
    const [graphState,setGraphState] = useState<'default' | 'calender' | 'graph'>('default')
    const [currCalenderDates,setCurrCalenderDates] = useState<Array<{color:string,date:any}>>([])
    const [calenderType,setCalenderType] = useState<'Tech' | 'Eco'>('Tech')
    const [graphOneType,setGraphOneType] = useState<'Tech' | 'Eco'>('Tech')
    const [graphTwoType,setGraphTwoType] = useState<'Tech' | 'Eco'>('Tech')

    const [selectedRowsDates,setSelectedRowsDates] = useState<Array<any>>([{"Type":"Self","Pen":"Tech","SKUCode":"ARES0798C004","Whcode":"USPA CWH","D1":"Blue","D2":"Blue","D3":"White","D4":"White","D5":"White","D6":"White","D7":"White","D8":"White","D9":"White","D10":"Green","D11":"Green","D12":"Yellow","D13":"Blue","D14":"Green","D15":"Green","D16":"Green","D17":"White","D18":"Green","D19":"Green","D20":"White","D21":"White","D22":"Green","D23":"Blue","D24":"Blue","D25":"Blue","D26":"Blue","D27":"Blue","D28":"Blue","D29":"Green","D30":"Green","D31":"Green","D32":"Green","D33":"Green","D34":"Green","D35":"Green","D37":"Blue","D38":"Green","D39":"Green","D40":"Yellow","D41":"Yellow","D42":"Green","D43":"Green","D44":"Green","D45":"Green","D46":"Green","D47":"Green","D48":"Green","D49":"Blue","D50":"Yellow","D51":"White","D52":"Blue","D53":"White","D54":"Yellow","D55":"Black","D56":"White","D57":"White","D58":"White","D59":"White","D60":"White","D61":"White","D62":"White","D63":"White","D64":"White","D65":"White","D67":"White","D68":"White","D69":"White","D70":"White","D71":"White","D72":"White","D73":"White","D74":"White","D75":"White","D76":"White","D77":"White","D78":"White","D79":"White","D80":"White","D81":"White","D83":"White","D84":"White","D85":"White","D86":"White","D87":"White","D88":"White","D89":"White","D90":"White"},{"Type":"Self","Pen":"Eco","SKUCode":"ARES0798C004","Whcode":"USPA CWH","D1":"Red","D2":"Red","D3":"Red","D4":"Red","D5":"Red","D6":"Red","D7":"Red","D8":"Red","D9":"Red","D10":"Red","D11":"Red","D12":"Red","D13":"Red","D14":"Red","D15":"Red","D16":"Black","D17":"Black","D18":"Black","D19":"Black","D20":"Black","D21":"Red","D22":"Red","D23":"Red","D24":"Red","D25":"Red","D26":"Red","D27":"White","D28":"Red","D29":"Black","D30":"Black","D31":"Black","D32":"Black","D33":"Black","D34":"Black","D35":"Black","D37":"Black","D38":"Black","D39":"Black","D40":"Black","D41":"Black","D42":"Black","D43":"Black","D44":"Black","D45":"Black","D46":"Black","D47":"Black","D48":"Black","D49":"Black","D50":"Black","D51":"Black","D52":"Black","D53":"Black","D54":"Black","D55":"Black","D56":"Black","D57":"Black","D58":"Black","D59":"Black","D60":"Black","D61":"Black","D62":"Black","D63":"Blue","D64":"Blue","D65":"Blue","D67":"Blue","D68":"Blue","D69":"Blue","D70":"Black","D71":"White","D72":"Blue","D73":"Blue","D74":"Blue","D75":"White","D76":"Blue","D77":"Blue","D78":"Blue","D79":"Blue","D80":"Blue","D81":"Blue","D83":"Blue","D84":"Blue","D85":"Blue","D86":"Blue","D87":"Blue","D88":"Green","D89":"Green","D90":"Green"},{"Type":"Self","Pen":"Eco","SKUCode":"USSHTC0015001","Whcode":"USPA CWH","D1":"Yellow","D2":"Yellow","D3":"Yellow","D4":"Yellow","D5":"Yellow","D6":"Yellow","D7":"Yellow","D8":"Yellow","D9":"Yellow","D10":"Yellow","D11":"Yellow","D12":"Yellow","D13":"Green","D14":"Green","D15":"Green","D16":"Green","D17":"Green","D18":"Green","D19":"Green","D20":"Green","D21":"Green","D22":"Yellow","D23":"Yellow","D24":"Yellow","D25":"Yellow","D26":"Yellow","D27":"Yellow","D28":"Yellow","D29":"Yellow","D30":"Yellow","D31":"Yellow","D32":"Yellow","D33":"Yellow","D34":"Yellow","D35":"Yellow","D37":"Yellow","D38":"Yellow","D39":"Yellow","D40":"Yellow","D41":"Yellow","D42":"Yellow","D43":"Yellow","D44":"Red","D45":"Red","D46":"Red","D47":"White","D48":"White","D49":"Red","D50":"Red","D51":"Yellow","D52":"Red","D53":"Red","D54":"Red","D55":"Black","D56":"Yellow","D57":"Yellow","D58":"Yellow","D59":"Red","D60":"Red","D61":"Red","D62":"Red","D63":"Red","D64":"Red","D65":"Red","D67":"Red","D68":"Red","D69":"Red","D70":"Black","D71":"Black","D72":"Black","D73":"Black","D74":"Black","D75":"Blue","D76":"Blue","D77":"Black","D78":"Black","D79":"Black","D80":"Black","D81":"Black","D83":"Black","D84":"Blue","D85":"Blue","D86":"Blue","D87":"Blue","D88":"Red","D89":"Red","D90":"Red"},{"Type":"Self","Pen":"Eco","SKUCode":"USSHTC0015007","Whcode":"USPA CWH","D1":"Yellow","D2":"Yellow","D3":"Yellow","D4":"Yellow","D5":"Yellow","D6":"Yellow","D7":"Yellow","D8":"Yellow","D9":"Yellow","D10":"Yellow","D11":"Yellow","D12":"Yellow","D13":"Green","D14":"Green","D15":"Green","D16":"Green","D17":"Green","D18":"Green","D19":"Green","D20":"Green","D21":"Green","D22":"Yellow","D23":"Yellow","D24":"Yellow","D25":"Yellow","D26":"Yellow","D27":"Yellow","D28":"Yellow","D29":"Yellow","D30":"Yellow","D31":"Yellow","D32":"Yellow","D33":"Yellow","D34":"Yellow","D35":"Yellow","D37":"Yellow","D38":"Yellow","D39":"Yellow","D40":"Yellow","D41":"Yellow","D42":"Yellow","D43":"Yellow","D44":"Red","D45":"Red","D46":"Red","D47":"White","D48":"White","D49":"Red","D50":"Red","D51":"White","D52":"Red","D53":"Red","D54":"Red","D55":"Black","D56":"White","D57":"White","D58":"White","D59":"White","D60":"White","D61":"White","D62":"White","D63":"White","D64":"White","D65":"White","D67":"White","D68":"White","D69":"White","D70":"White","D71":"White","D72":"White","D73":"White","D74":"White","D75":"White","D76":"White","D77":"Blue","D78":"Blue","D79":"Blue","D80":"Blue","D81":"Blue","D83":"Blue","D84":"White","D85":"White","D86":"White","D87":"White","D88":"White","D89":"White","D90":"White"},{"Type":"Self","Pen":"Eco","SKUCode":"USSHTC0015008","Whcode":"USPA CWH","D1":"Red","D2":"Red","D3":"Red","D4":"Red","D5":"Red","D6":"Red","D7":"Red","D8":"Red","D9":"Red","D10":"Red","D11":"Red","D12":"Red","D13":"Blue","D14":"Blue","D15":"Blue","D16":"Blue","D17":"Blue","D18":"Blue","D19":"Blue","D20":"Blue","D21":"Blue","D22":"Green","D23":"Green","D24":"Green","D25":"Green","D26":"Green","D27":"Green","D28":"Green","D29":"Green","D30":"Green","D31":"Green","D32":"Green","D33":"Green","D34":"Green","D35":"Green","D37":"Green","D38":"Green","D39":"Green","D40":"Green","D41":"Green","D42":"Green","D43":"Green","D44":"Yellow","D45":"Yellow","D46":"Yellow","D47":"White","D48":"White","D49":"Green","D50":"Green","D51":"White","D52":"Yellow","D53":"Yellow","D54":"Yellow","D55":"Red","D56":"White","D57":"White","D58":"White","D59":"White","D60":"White","D61":"White","D62":"White","D63":"White","D64":"White","D65":"White","D67":"White","D68":"White","D69":"White","D70":"White","D71":"White","D72":"White","D73":"White","D74":"White","D75":"White","D76":"White","D77":"Blue","D78":"Blue","D79":"Blue","D80":"Blue","D81":"Blue","D83":"Blue","D84":"White","D85":"White","D86":"White","D87":"White","D88":"Blue","D89":"Blue","D90":"Blue"},{"Type":"Self","Pen":"Eco","SKUCode":"USSHTC0055004","Whcode":"USPA CWH","D1":"Yellow","D2":"Yellow","D3":"Yellow","D4":"Yellow","D5":"Red","D6":"Red","D7":"Yellow","D8":"Red","D9":"Green","D10":"Red","D11":"Red","D12":"Red","D13":"Green","D14":"Red","D15":"Red","D16":"Red","D17":"Yellow","D18":"Red","D19":"Yellow","D20":"White","D21":"White","D22":"White","D23":"White","D24":"White","D25":"White","D26":"White","D27":"White","D28":"Blue","D29":"White","D30":"White","D31":"White","D32":"Blue","D33":"White","D34":"Blue","D35":"White","D37":"White","D38":"White","D39":"White","D40":"Blue","D41":"White","D42":"Blue","D43":"White","D44":"White","D45":"White","D46":"White","D47":"White","D48":"Blue","D49":"White","D50":"Blue","D51":"White","D52":"Blue","D53":"White","D54":"White","D55":"White","D56":"White","D57":"White","D58":"White","D59":"White","D60":"White","D61":"White","D62":"White","D63":"White","D64":"White","D65":"White","D67":"White","D68":"White","D69":"White","D70":"White","D71":"White","D72":"White","D73":"White","D74":"White","D75":"White","D76":"White","D77":"White","D78":"White","D79":"White","D80":"White","D81":"White","D83":"White","D84":"White","D85":"White","D86":"White","D87":"White","D88":"White","D89":"White","D90":"White"},{"Type":"Child","Pen":"Tech","SKUCode":"USSHTC0077007","Whcode":"USPA CWH","ChildCode":"USPA_KA","D1":"Black","D2":"Black","D3":"Black","D4":"Black","D5":"Black","D6":"Black","D7":"Black","D8":"Black","D9":"Black","D10":"Black","D11":"Black","D12":"Black","D13":"Black","D14":"Black","D15":"Yellow","D16":"Yellow","D17":"Yellow","D18":"Yellow","D19":"Yellow","D20":"Yellow","D21":"Black","D22":"Blue","D23":"Blue","D24":"Blue","D25":"Blue","D26":"Blue","D27":"Blue","D28":"Blue","D29":"Blue","D30":"Blue","D31":"Blue","D32":"Blue","D33":"Blue","D34":"Blue","D35":"Blue","D37":"Blue","D38":"White","D39":"Blue","D40":"Blue","D41":"Black","D42":"Blue","D43":"Blue","D44":"White","D45":"White","D46":"White","D47":"Blue","D48":"White","D49":"White","D50":"White","D51":"White","D52":"White","D53":"White","D54":"White","D55":"White","D56":"White","D57":"White","D58":"White","D59":"White","D60":"White","D61":"Blue","D62":"Blue","D63":"Green","D64":"Green","D65":"Green","D67":"Green","D68":"Green","D69":"Black","D70":"Blue","D71":"Blue","D72":"Blue","D73":"Blue","D74":"Blue","D75":"Blue","D76":"Black","D77":"Black","D78":"Black","D79":"White","D80":"White","D81":"White","D83":"Blue","D84":"Black","D85":"Black","D86":"Black","D87":"Black","D88":"Black","D89":"Black","D90":"Black"},{"Type":"Child","Pen":"Tech","SKUCode":"USSHTC0077007","Whcode":"USPA CWH","ChildCode":"USPA_MBO","D65":"Black","D67":"Black","D68":"Black","D69":"Black","D70":"Blue","D71":"Blue","D72":"Blue","D73":"Blue","D74":"Blue","D75":"Blue","D76":"Blue","D77":"Blue","D78":"Blue","D79":"White","D80":"White","D81":"White","D83":"White","D84":"White","D85":"Blue","D86":"Blue","D87":"Blue","D88":"Blue","D89":"Blue","D90":"Blue"},{"Type":"Child","Pen":"Tech","SKUCode":"USSHTC0068004","Whcode":"USPA CWH","ChildCode":"USPA MBO","D62":"Black","D63":"Black","D64":"Black"},{"Type":"Child","Pen":"Tech","SKUCode":"USTSHC0066007","Whcode":"USPA CWH","ChildCode":"USPA_MBO","D65":"White","D67":"White","D68":"White","D69":"White","D70":"White","D71":"White","D72":"White","D73":"White","D74":"White","D75":"White","D76":"White","D77":"White","D78":"White","D79":"White","D80":"White","D81":"White","D83":"White","D84":"White","D85":"White","D86":"White","D87":"White","D88":"White","D89":"White","D90":"White"},{"Type":"Child","Pen":"Tech","SKUCode":"USSHTC0078006","Whcode":"USPA CWH","ChildCode":"USPA_ON","D1":"Green","D2":"Green","D3":"Green","D4":"Green","D5":"Green","D6":"Green","D7":"Green","D8":"Green","D9":"Green","D10":"Green","D11":"Green","D12":"Green","D13":"Red","D14":"Black","D15":"Yellow","D16":"Black","D17":"Red","D18":"Black","D19":"Black","D20":"Red","D21":"Blue","D22":"Blue","D23":"Black","D24":"Black","D25":"Black","D26":"Black","D27":"Blue","D28":"Green","D29":"Black","D30":"Black","D31":"Black","D32":"Black","D33":"Black","D34":"Black","D35":"Black","D37":"Black","D38":"Black","D39":"Black","D40":"Black","D41":"Black","D42":"Black","D43":"Black","D44":"Black","D45":"Black","D46":"Black","D47":"Black","D48":"Black","D49":"Black","D50":"Black","D51":"Black","D52":"Black","D53":"Black","D54":"Black","D55":"Black","D56":"Black","D57":"Black","D58":"Black","D59":"Black","D60":"Black","D61":"Black","D62":"Black","D63":"Black","D64":"Black","D65":"Black","D67":"Black","D68":"Black","D69":"Black","D70":"Black","D71":"Black","D72":"Black","D73":"Black","D74":"Black","D75":"Black","D76":"Black","D77":"Black","D78":"Black","D79":"Black","D80":"Black","D81":"Black","D83":"Black","D84":"Black","D85":"Black","D86":"Black","D87":"Black","D88":"Black","D89":"Black","D90":"Black"},{"Type":"Child","Pen":"Tech","SKUCode":"USSHTC0078006","Whcode":"USPA CWH","ChildCode":"USPA MBO","D62":"Black","D63":"Black","D64":"Black"},{"Type":"Parent","Pen":"Eco","SKUCode":"UDTSHC0027001","Whcode":"USPA CWH","ParentWhCode":"1024041","D1":"Green","D2":"White","D5":"White","D6":"White","D7":"White","D8":"White","D9":"White","D10":"White","D12":"White","D13":"White","D15":"White","D16":"White","D19":"White","D20":"White","D23":"White","D27":"White","D29":"White","D33":"White","D34":"White","D42":"White","D49":"White","D50":"Blue","D55":"Black","D57":"Black","D62":"Black","D64":"Black","D69":"Black","D71":"Black","D76":"Black","D78":"Black","D83":"White","D85":"White","D90":"White"},{"Type":"Parent","Pen":"Eco","SKUCode":"USSHTC0011005","Whcode":"USPA CWH","ParentWhCode":"1022384","D6":"Black","D7":"Black","D8":"Black","D13":"Black","D15":"Black","D20":"Black","D27":"Black","D29":"Black","D34":"Black","D41":"Yellow","D49":"White","D55":"Blue","D57":"Blue","D62":"Blue","D64":"Yellow","D69":"Red","D71":"Red","D76":"Red","D78":"Red","D85":"Red"},{"Type":"Parent","Pen":"Eco","SKUCode":"USSHTC0015001","Whcode":"USPA CWH","ParentWhCode":"1033618","D20":"Green","D50":"Green","D57":"Green","D70":"Red"},{"Type":"Parent","Pen":"Eco","SKUCode":"USSHTC0015007","Whcode":"USPA CWH","ParentWhCode":"1033618","D20":"White","D50":"Yellow","D57":"Yellow","D70":"Red"},{"Type":"Parent","Pen":"Eco","SKUCode":"USSHTC0015008","Whcode":"USPA CWH","ParentWhCode":"1033618","D20":"White","D50":"Red","D57":"Red","D70":"Black"},{"Type":"Parent","Pen":"Eco","SKUCode":"USSHTC0055004","Whcode":"USPA CWH","ParentWhCode":"1033618","D20":"Black","D50":"Black","D57":"Black","D70":"Black"}])


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
        // onRowSelected:(params)=>setSelectedRows(params.api.getSelectedRows()),
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
        const doesExist = currCalenderDates.find((d)=>isSameDay(d.date,date))
        return doesExist?doesExist.color:'gray'
    }

    function getColorValues(jsonData:any) {
        const colorValues = [];
        for (const key in jsonData) {
            if (key.startsWith('D')) {
                colorValues.push(jsonData[key]);
            }
        }
        if(colorValues.length>horizon){
            return colorValues.slice(colorValues.length-horizon);
        }
        return colorValues;
    }

    function convertToObjects(colorArray:Array<string>) {
        const today = new Date();
        const result = [];
    
        // Loop through each color in the array
        for (let i = 0; i < colorArray.length; i++) {
            const daysBeforeToday = colorArray.length - i;
            const date = new Date(today);
            date.setDate(today.getDate() - daysBeforeToday + 1); // Adding 1 to start from 1 day ago
    
            const dateString = date.toISOString().slice(0, 10); // Get date in YYYY-MM-DD format
    
            const color = colorArray[i];
    
            result.push({ date: dateString, color: color });
        }
    
        return result;
    }


    const handleOnUpdateGraph = ()=>{
        const selectedRowsCount  =  ref.current?.api.getSelectedRows()
        if(selectedRowsCount && selectedRowsCount.length===0)return setGraphState('default')
        if(selectedRowsCount &&  selectedRowsCount.length>1){

            return setGraphState('graph')
        }
       if(selectedRowsCount){
        const allDates = selectedRowsDates.find((row:any)=>row.Pen===calenderType && row.SKUCode===selectedRowsCount[0].SKUCode)
        if(allDates){
            setCurrCalenderDates(convertToObjects(getColorValues(allDates)))
            return setGraphState('calender')
        }
       
       }
    }

   
    const blackCount = useMemo(()=>{
        return Math.round(((currCalenderDates.slice(0,horizon).filter((row:any)=>row.color==='Black').length)/currCalenderDates.slice(0,horizon).length)*100)
    },[currCalenderDates])

    const redCount = useMemo(()=>{
        return Math.round(((currCalenderDates.slice(0,horizon).filter((row:any)=>row.color==='Red').length)/currCalenderDates.slice(0,horizon).length)*100)
    },[currCalenderDates])

    const whiteCount = useMemo(()=>{
        return Math.round(((currCalenderDates.slice(0,horizon).filter((row:any)=>row.color==='White').length)/currCalenderDates.slice(0,horizon).length)*100)
    },[currCalenderDates])

    const ResearchInsightsColumns = mapResearchInsightsFieldsToColDefs(data?.data.data)

    return {
        ref,
        agGridProps,
        ResearchInsightsData,
        ResearchInsightsColumns,
        isLoading:isBPRDataLoading || isBPRUILoading,
        horizon,
        graphState,
        currCalenderDates,
        blackCount,
        redCount,
        whiteCount,
        graphOneType,
        graphTwoType,
        setHorizon,
        getColor,
        setCalenderType,
        setGraphOneType,
        setGraphTwoType,
        handleOnUpdateGraph,
        setSelectedRowsDates
    }
}

export default useResearchInsights