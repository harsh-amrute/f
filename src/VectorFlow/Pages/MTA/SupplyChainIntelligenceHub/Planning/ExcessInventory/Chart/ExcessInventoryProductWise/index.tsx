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


const ExcessInventoryProductWise = ({data}:ExcessInventoryProps) => {

    const [chartThemeOverridesG1 , setChartThemeOverridesG1] = useState<any>(undefined)
    const [chartThemeOverridesG2 , setChartThemeOverridesG2] = useState<any>(undefined)

    const [rowData1,setRowData1] = useState<any>([])
    const [rowData2,setRowData2] = useState<any>([])
     
    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'SKUDescription',
                colId:'SKUDescription',
                headerName:'Product Name',
                cellDataType: 'text',
            },
            {
                field:'WHCount',
                colId:'WHCount',
                headerName:'Count of Locations'
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

    const colDefs1 = mapUIConfigToColdefs1(data['topTenProductsWithExcessInventoryNumberOfLocations']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs = [
            {
                field:'SKUDescription',
                colId:'SKUDescription',
                headerName:'Product Name',
                cellDataType: false,
            },
            {
                field:'SumAmount',
                colId:'SumAmount',
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

    const colDefs2 = mapUIConfigToColdefs2(data['topTenProductsWithExcessInventoryNumberOfLocations']['uiconfig']);

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


    useEffect(()=>{
        const formattedRowData1 = sortData(convertToInt(data['topTenProductsWithExcessInventoryNumberOfLocations']['data'],['WHCount']),'WHCount')
        setRowData1(formattedRowData1)
        setChartThemeOverridesG1(generateChartOptions(formattedRowData1,chartParams1.series,chartParams1.palette,'Product Name','Count Of Locations',chartParams1.chartKey,undefined))
        
        const formattedRowData2 = scaleDown(sortData(convertToInt(data['topTenProductsWithExcessInventoryInValue']['data'],['SumAmount']),'SumAmount'),'SumAmount',100000)
        setRowData2(formattedRowData2)
        setChartThemeOverridesG2(generateChartOptions(formattedRowData2,chartParams2.series,chartParams2.palette,'Product Name','Value In Lakhs',chartParams2.chartKey,undefined))
    },[])


    const getChartToolbarItems:any = () => [''];
    

    // const chartKeys1 = {
    //     Xaxis:['SKUDescription'],
    //     Yaxis:['WHCount']
    // }

    // const chartKeys2 = {
    //     Xaxis:['SKUDescription'],
    //     Yaxis:['SumAmount']
    // }

    // const series1 = [
    //     {
    //         type:'bar',
    //         xKey:'SKUDescription',
    //         yKey:'WHCount',
    //         yName:'Count of Locations',
    //         stacked:false,
    //         barPadding:0.2,
    //     }
    // ]

    // const series2 = [
    //     {
    //         type:'bar',
    //         xKey:'SKUDescription',
    //         yKey:'SumAmount',
    //         yName:'Value In Lakhs',
    //         stacked:false,
    //         barPadding:0.2,
    //     }
    // ]

    // const palette:any = {
    //     fills: ['#848484'],
    //     strokes: ['#ffffff', '#ffffff'],
    // }
     

    // const defaultColForCustomGraph1 = {
    //     columns:['SKUDescription','WHCount'],
    //     start:0,
    //     end:9
    // }

    // const defaultColForCustomGraph2 = {
    //     columns:['SKUDescription','SumAmount'],
    //     start:0,
    //     end:9
    // }

    // const graphInfo1 = [
    //     'This graph highlights the top 10 products with surplus inventory, in maximum number of locations',
    // ]

    // const graphInfo2 = [
    //     'This graph highlights the top 10 products with the highest excess inventory, assessed in terms of monetary value.'
    // ]

     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane  minSize={440} preferredSize={'50%'}>

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
                    <Allotment.Pane  minSize={440} preferredSize={'50%'}>
                    
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

export default ExcessInventoryProductWise;