import {useState, useEffect} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
// import "../../styles.css";
import { ColDef } from "ag-grid-enterprise";
import {SCDynamicContainer} from '../../styles';
import VFCharts from "../../../../../../../../components/VectorFLOW/commons/VFCharts";
import {convertToInt, getProductAndLocationHeirarchiesFromEnv,generateChartOptions, downloadBase64Image} from '../../../../../../../../helpers/utils';
import { chartParams1 , chartParams2 } from './chartParams' 
interface OrderFulfillmentProps{
    data:any
}


const OrderFulfillmentLocationWise = ({data}:OrderFulfillmentProps) => {

    const [chartThemeOverridesG1 , setChartThemeOverridesG1] = useState<any>(undefined)
    const [chartThemeOverridesG2 , setChartThemeOverridesG2] = useState<any>(undefined)

    const [rowData1,setRowData1] = useState<any>([])
    const [rowData2,setRowData2] = useState<any>([])

    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
            {
                field:'location',
                headerName:'Location Name',
                colId:'location',
            },
            {
                field:'overdue',
                headerName:'Overdue',
                colId:'overdue',
            },
            {
                field:'due',
                headerName:'Due',
                colId:'due',
            },
            {
                field:'others',
                headerName:'Others',
                colId:'others',
            },
          
        ]
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{}); 
            if(customColdef) return customColdef;
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        return [...customColdefs,...colDefs];
    }

    const colDefs1 = mapUIConfigToColdefs1(data['maximumOverdueOrders']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
            {
                field:'location',
                headerName:'Location Name',
                colId:'location',
            },
            {
                field:'greater',
                headerName:'Gap > 67%',
                colId:'greater',
            },
            {
                field:'between',
                headerName:'33% <= Gap <= 67%',
                colId:'between',
            },
            {
                field:'smaller',
                headerName:'Gap < 33%',
                colId:'smaller',
            },
        ];
        
        colDefs = columns.map((column:{header:string,colCode:string})=>{
            const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{}); 
            if(customColdef) return customColdef;
            return {
                field:column['colCode'],
                colId:column['colCode'],
                headerName:column['header']
            }
        })
        return [...customColdefs,...colDefs];
    }

    const colDefs2 = mapUIConfigToColdefs2(data['maxNumberOfLocationsWithGap']['uiconfig']);

    const sortData = (data:any,key1:string,key2:string,key3:string) => {
        data.sort((row1:any,row2:any)=>{
            return (row2[key1]+row2[key2]+row2[key3]) - (row1[key1]+row1[key2]+row1[key3])
        })
        return [...data];
    }


    useEffect(()=>{
        const formattedRowData1 = sortData(convertToInt(data['maximumOverdueOrders']['data'],['overdue','due','others']),'overdue','due','others')
        setRowData1(formattedRowData1)
        setChartThemeOverridesG1(generateChartOptions(formattedRowData1,chartParams1.series,chartParams1.palette,'Location Name','No Of Orders',chartParams1.chartKey,undefined))
        
        const formattedRowData2 = sortData(convertToInt(data['maxSkuWithGap']['data'],['greater','between','smaller']),'greater','between','smaller')
        setRowData2(formattedRowData2)
        setChartThemeOverridesG2(generateChartOptions(formattedRowData2,chartParams2.series,chartParams2.palette,'Location Name','NO Of SKUs',chartParams2.chartKey,undefined))
    },[])

    // const chartKeys1 = {
    //     Xaxis:['location'],
    //     Yaxis:['overdue','due','others']
    // }

    // const chartKeys2 = {
    //     Xaxis:['location'],
    //     Yaxis:['greater','between','smaller']
    // }

    // const series1 = [
    //     {
    //         type:'bar',
    //         xKey:'location',
    //         yKey:'overdue',
    //         yName:'Overdue',
    //         stacked:true,
    //         barPadding:0.2,
    //     },
    //     {
    //         type:'bar',
    //         xKey:'location',
    //         yKey:'due',
    //         yName:'Due',
    //         stacked:true,
    //         barPadding:0.2,
    //     },
    //     {
    //         type:'bar',
    //         xKey:'location',
    //         yKey:'others',
    //         yName:'Others',
    //         stacked:true,
    //         barPadding:0.2,
    //     }
    // ]

    // const series2 = [
    //     {
    //         type:'bar',
    //         xKey:'location',
    //         yKey:'greater',
    //         yName:'Gap > 67%',
    //         stacked:true,
    //         barPadding:0.2,
    //     },
    //     {
    //         type:'bar',
    //         xKey:'location',
    //         yKey:'between',
    //         yName:'33% <= Gap <= 67%',
    //         stacked:true,
    //         barPadding:0.2,
    //     },
    //     {
    //         type:'bar',
    //         xKey:'location',
    //         yKey:'smaller',
    //         yName:'Gap < 33%',
    //         stacked:true,
    //         barPadding:0.2,
    //     }
    // ]

    // const palette1 = {
    //     fills: ['#ED1C24','#E3812D','#355FD3'],
    //     strokes: ['#ffffff', '#ffffff']
    // }

    // const palette2 = {
    //     fills: ['#F02424','#E3812D','#418D18'],
    //     strokes: ['#ffffff', '#ffffff'],
    // }

    // const defaultColForCustomGraph1 = {
    //     columns:['location','overdue','due','others'],
    //     start:0,
    //     end:9
    // }

    // const defaultColForCustomGraph2 = {
    //     columns:['location','greater','between','smaller'],
    //     start:0,
    //     end:9
    // }

    // const graphInfo1 = [
    //     'This graph highlights the top 10 locations with max number of over due orders. It also captures the status of due & other orders from pending orders file.',
    //     'Overdue orders - Due date crossed | Due Orders - Due dates of today or in the future | Other Orders - PSO Quantity'
    // ]

    // const graphInfo2 = [
    //     'This Graph highlights the top 10 locations with max no of SKUs with Gap > 67% of requirement.',
    //     'Gap = Requirement - Rationed Qty',
    //     'Requirement = Norm Requirement + Spike Requirement + Relevant PSO & CNR Requirement'
    // ]

     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane minSize={440} preferredSize={'50%'}>
                    
                    <VFCharts     
                            height={'95%'}
                            title={chartParams1.title}
                            graphInfo={chartParams1.graphInfo}
                            defaultColForCustomGraph={chartParams1.defaultColForChart}
                            colDefs={colDefs1}
                            rowData={rowData1}
                            chartProps={chartThemeOverridesG1}
                            palette={chartParams1.palette}
                            chartType={chartParams1.chartType}
                            containerStyle={{marginLeft:'0px',marginRight:'10px'}}
                        />

                    </Allotment.Pane>
                    <Allotment.Pane minSize={440} preferredSize={'50%'}>
                        
                    <VFCharts     
                            height={'95%'}
                            title={chartParams2.title}
                            graphInfo={chartParams2.graphInfo}
                            defaultColForCustomGraph={chartParams2.defaultColForChart}
                            colDefs={colDefs2}
                            rowData={rowData2}
                            chartProps={chartThemeOverridesG2}
                            palette={chartParams2.palette}
                            chartType={chartParams2.chartType}
                            containerStyle={{marginLeft:'17px',marginRight:'0px'}}
                        />

                    </Allotment.Pane>
                  
                </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default OrderFulfillmentLocationWise;