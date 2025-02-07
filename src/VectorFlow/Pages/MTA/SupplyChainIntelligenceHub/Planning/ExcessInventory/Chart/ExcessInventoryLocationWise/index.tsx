import {useState, useEffect} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import {SCDynamicContainer} from '../../styles';
import {convertToInt, getProductAndLocationHeirarchiesFromEnv, generateChartOptions} from '../../../../../../../../helpers/utils';
import VFCharts from "../../../../../../../../components/VectorFLOW/commons/VFCharts";
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
    

    const palette={
        fills: ['#848484'],
        strokes: ['#ffffff', '#ffffff'],
    }

    useEffect(()=>{
        const formattedRowData1 = sortData(convertToInt(data['topTenLocationsWithExcessInventorySkuCount']['data'],['SKUCounts']),'SKUCounts')
        setRowData1(formattedRowData1)
        setChartThemeOverridesG1(generateChartOptions(formattedRowData1,series1,palette,'Location Name','Count Of SKUs',chartKeys1,undefined))
        
        const formattedRowData2 = scaleDown(sortData(convertToInt(data['topTenLocationsWithExcessInventoryValue']['data'],['SumOfAmount']),'SumOfAmount'),'SumOfAmount',100000)
        setRowData2(formattedRowData2)
        setChartThemeOverridesG2(generateChartOptions(formattedRowData2,series2,palette,'Location Name','Value In Lakhs',chartKeys2,undefined))
    },[])

    const myCustomTheme:any = {
        palette: {
            fills: ['#848484'],
            strokes: ['#ffffff', '#ffffff'],
        },
    }

    const chartKeys1 = {
        Xaxis:['WHDescription'],
        Yaxis:['SKUCounts']
    }

    const chartKeys2 = {
        Xaxis:['WHDescription'],
        Yaxis:['SumOfAmount']
    }
    
    const series1 = [
        {
            type:'bar',
            xKey:'WHDescription',
            yKey:'SKUCounts',
            yName:'Count of SKUs',
            stacked:false,
            barPadding:0.2,
            
        }
    ]

    const series2 = [
        {
            type:'bar',
            xKey:'WHDescription',
            yKey:'SumOfAmount',
            yName:'Value In Lakhs',
            stacked:false,
            barPadding:0.2,
            
        }
    ]

    const scaleDown = (data:any,key:string,divisor:number)=>{
        return data.map((row:any)=>{
            const temp = {...row};
            const valueToScaleDown = (row[key] === "" || row[key] == null) ? 0 : row[key];
            temp[key] = parseInt(valueToScaleDown,10)/divisor;
            return temp;
        })
    }

    const defaultColForCustomGraph1 = {
        columns:['WHDescription','SKUCounts'],
        start:0,
        end:9
    }

    const defaultColForCustomGraph2 = {
        columns:['WHDescription','SumOfAmount'],
        start:0,
        end:9
    }

    const graphInfo1 = [
        'This graph highlights the top 10 locations with the highest excess inventory, measured in terms of the count of SKUs'
    ]

    const graphInfo2 = [
        'This graph highlights the top 10 locations with the highest excess inventory, assessed in terms of monetary value.'
    ]
     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>

                    <Allotment.Pane minSize={440} preferredSize={'50%'}>

                        <VFCharts     
                            height={'95%'}
                            title={'Top 10 Locations With Excess Inventory: Count Of SKUs'}
                            graphInfo={graphInfo1}
                            defaultColForCustomGraph={defaultColForCustomGraph1}
                            colDefs={colDefs1}
                            rowData={rowData1}
                            chartProps={chartThemeOverridesG1}
                            palette={palette}
                            chartType={'column'}
                            containerStyle={{marginLeft:'0px',marginRight:'10px'}}
                        />

                    </Allotment.Pane>

                    <Allotment.Pane minSize={440} preferredSize={'50%'}>

                        <VFCharts     
                            height={'95%'}
                            title={'Top 10 Locations with Excess Inventory: In Value (Rupee Lakhs)'}
                            graphInfo={graphInfo2}
                            defaultColForCustomGraph={defaultColForCustomGraph2}
                            colDefs={colDefs2}
                            rowData={rowData2}
                            chartProps={chartThemeOverridesG2}
                            palette={palette}
                            chartType={'column'}
                            containerStyle={{marginLeft:'17px',marginRight:'0px'}}
                        />

                    </Allotment.Pane>
                  
                </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default ExcessInventoryLocationWise;