import {useState, useEffect} from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../styles.css";
import { ColDef } from "ag-grid-enterprise";
import {SCDynamicContainer} from '../../styles';
import VFCharts from "../../../../../../../../components/VectorFLOW/commons/VFCharts";
import {convertToInt, getProductAndLocationHeirarchiesFromEnv,generateChartOptions} from '../../../../../../../../helpers/utils';
import { chartParams1 , chartParams2 } from './chartParams' 

interface OrderFulfillmentProps{
    data:any
}


const OrderFulfillmentProductWise = ({data}:OrderFulfillmentProps) => {

    const [chartThemeOverridesG1 , setChartThemeOverridesG1] = useState<any>(undefined)
    const [chartThemeOverridesG2 , setChartThemeOverridesG2] = useState<any>(undefined)

    const [rowData1,setRowData1] = useState<any>([])
    const [rowData2,setRowData2] = useState<any>([])
 
    const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
            {
                field:'product',
                headerName:'Product Name',
                colId:'product',
            },
            {
                field:'overdue',
                headerName:'Overdue',
                colId:'overdue',
                filter:"agNumberColumnFilter"
            },
            {
                field:'due',
                headerName:'Due',
                colId:'due',
                filter:"agNumberColumnFilter"
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

    const colDefs1 = mapUIConfigToColdefs1(data['categorizationOfPendingQuantity']['uiconfig']);

    const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
        let colDefs = [];

        const customColdefs:ColDef[] = [
            {
                field:'product',
                headerName:'Product Name',
                colId:'product',
            },
            {
                field:'greater',
                headerName:'Gap > 67%',
                colId:'greater',
                filter:"agNumberColumnFilter"

            },
            {
                field:'between',
                headerName:'33% <= Gap <= 67%',
                colId:'between',
                filter:"agNumberColumnFilter"

            },
            {
                field:'smaller',
                headerName:'Gap < 33%',
                colId:'smaller',
                filter:"agNumberColumnFilter"

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
        const formattedRowData1 = sortData(convertToInt(data['categorizationOfPendingQuantity']['data'],['overdue','due','others']),'overdue','due','others')
        setRowData1(formattedRowData1)
        setChartThemeOverridesG1(generateChartOptions(formattedRowData1,chartParams1,undefined))
        
        const formattedRowData2 = sortData(convertToInt(data['maxNumberOfLocationsWithGap']['data'],['greater','between','smaller']),'greater','between','smaller')
        setRowData2(formattedRowData2)
        setChartThemeOverridesG2(generateChartOptions(formattedRowData2,chartParams2,undefined))
    },[])
     
    return(
        <>
            <SCDynamicContainer>
                <Allotment>
                    <Allotment.Pane preferredSize={'50%'}>
                        
                        <VFCharts     
                                height={'95%'}
                                chartParams={chartParams1}
                                colDefs={colDefs1}
                                rowData={rowData1}
                                chartProps={chartThemeOverridesG1}
                                containerStyle={{marginLeft:'0px',marginRight:'10px'}}
                            />

                    </Allotment.Pane>
                    <Allotment.Pane preferredSize={'50%'}>
                        
                        <VFCharts     
                                height={'95%'}
                                chartParams={chartParams2}
                                colDefs={colDefs2}
                                rowData={rowData2}
                                chartProps={chartThemeOverridesG2}
                                containerStyle={{marginLeft:'17px',marginRight:'0px'}}
                            />

                    </Allotment.Pane>
                  
                </Allotment>
            </SCDynamicContainer>
        </>
    )
    
}

export default OrderFulfillmentProductWise;