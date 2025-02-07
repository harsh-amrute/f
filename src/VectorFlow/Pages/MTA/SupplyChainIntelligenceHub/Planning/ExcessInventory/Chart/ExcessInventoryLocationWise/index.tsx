import {useState, useEffect} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import {SCDynamicContainer} from '../../styles';
import {convertToInt, getProductAndLocationHeirarchiesFromEnv, generateChartOptions} from '../../../../../../../../helpers/utils';
import VFCharts from "../../../../../../../../components/VectorFLOW/commons/VFCharts";
import {chartParams1 , chartParams2} from './chartParams'
interface ExcessInventoryProps{
    data:any
}

const ExcessInventoryLocationWise = ({data}:ExcessInventoryProps) => {
    
    const [chartThemeOverridesG1 , setChartThemeOverridesG1] = useState<any>(undefined)
    const [chartThemeOverridesG2 , setChartThemeOverridesG2] = useState<any>(undefined)

    const [rowData1,setRowData1] = useState<any>([])
    const [rowData2,setRowData2] = useState<any>([])

    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'WHDescription',
                colId:'WHDescription',
                headerName:'Location Name'
            },
            {
                field:'SKUCounts',
                colId:'SKUCounts',
                headerName:'Count Of SKUs'
            }
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

    const colDefs1 = mapUIConfigToColdefs1(data['topTenLocationsWithExcessInventorySkuCount']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'WHDescription',
                colId:'WHDescription',
                headerName:'Location Name'
            },
            {
                field:'SumOfAmount',
                colId:'SumOfAmount',
                headerName:'Value in (Lakhs)'
            }
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

    const colDefs2 = mapUIConfigToColdefs2(data['topTenLocationsWithExcessInventoryValue']['uiconfig']);

    const sortData = (data:any,key:string) => {
        data.sort((row1:any,row2:any)=>{
            return (row2[key]) - (row1[key])
        })
        return [...data];
    }

    const scaleDown = (data:any,key:string,divisor:number)=>{
        return data.map((row:any)=>{
            const temp = {...row};
            const valueToScaleDown = (row[key] === "" || row[key] == null) ? 0 : row[key];
            temp[key] = parseInt(valueToScaleDown,10)/divisor;
            return temp;
        })
    }
    

    // const palette={
    //     fills: ['#848484'],
    //     strokes: ['#ffffff', '#ffffff'],
    // }

    useEffect(()=>{
        const formattedRowData1 = sortData(convertToInt(data['topTenLocationsWithExcessInventorySkuCount']['data'],['SKUCounts']),'SKUCounts')
        setRowData1(formattedRowData1)
        setChartThemeOverridesG1(generateChartOptions(formattedRowData1,chartParams1.series,chartParams1.palette,'Location Name','Count Of SKUs',chartParams1.chartKey,undefined))
        
        const formattedRowData2 = scaleDown(sortData(convertToInt(data['topTenLocationsWithExcessInventoryValue']['data'],['SumOfAmount']),'SumOfAmount'),'SumOfAmount',100000)
        setRowData2(formattedRowData2)
        setChartThemeOverridesG2(generateChartOptions(formattedRowData2,chartParams2.series,chartParams2.palette,'Location Name','Value In Lakhs',chartParams2.chartKey,undefined))
    },[])

    // const myCustomTheme:any = {
    //     palette: {
    //         fills: ['#848484'],
    //         strokes: ['#ffffff', '#ffffff'],
    //     },
    // }

    // const chartKeys1 = {
    //     Xaxis:['WHDescription'],
    //     Yaxis:['SKUCounts']
    // }

    // const chartKeys2 = {
    //     Xaxis:['WHDescription'],
    //     Yaxis:['SumOfAmount']
    // }
    
    // const series1 = [
    //     {
    //         type:'bar',
    //         xKey:'WHDescription',
    //         yKey:'SKUCounts',
    //         yName:'Count of SKUs',
    //         stacked:false,
    //         barPadding:0.2,
            
    //     }
    // ]

    // const series2 = [
    //     {
    //         type:'bar',
    //         xKey:'WHDescription',
    //         yKey:'SumOfAmount',
    //         yName:'Value In Lakhs',
    //         stacked:false,
    //         barPadding:0.2,
            
    //     }
    // ]


    // const defaultColForCustomGraph1 = {
    //     columns:['WHDescription','SKUCounts'],
    //     start:0,
    //     end:9
    // }

    // const defaultColForCustomGraph2 = {
    //     columns:['WHDescription','SumOfAmount'],
    //     start:0,
    //     end:9
    // }

     
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

export default ExcessInventoryLocationWise;