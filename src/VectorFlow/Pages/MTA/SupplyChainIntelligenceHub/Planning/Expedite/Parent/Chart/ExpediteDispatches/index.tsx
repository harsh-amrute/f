import { useEffect, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../../styles.css";
import { ColDef } from "ag-grid-enterprise";
import {
  SCDynamicContainer,
} from "../../../styles";
import VFCharts from "../../../../../../../../../components/VectorFLOW/commons/VFCharts";
import {convertToInt, getProductAndLocationHeirarchiesFromEnv} from '../../../../../../../../../helpers/utils';
import {generateChartOptions} from '../../../../../../../../../helpers/utils'
import { chartParams1 , chartParams2 } from "./chartParams";
import {colDefForPie as colDefs2} from '../../../colDefs'

interface ExpediteParentDispatchesProps {
  data: any;
}

const ExpediteDispatches = ({ data }: ExpediteParentDispatchesProps) => {

  const [chartThemeOverridesG1 , setChartThemeOverridesG1] = useState<any>(undefined)
  const [chartThemeOverridesG2 , setChartThemeOverridesG2] = useState<any>(undefined)

  const [rowData1,setRowData1] = useState<any>([])
  const [rowData2,setRowData2] = useState<any>([])

  const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
    let colDefs = [];

    const customColdefs: ColDef[] = [
      {
        field: "WHDescription",
        headerName: "Location Name",
        colId: "WHDescription",
      },
      {
        field: "SKUCounts",
        headerName: "Count Of SKUs",
        colId: "SKUCounts",
      },
      {
        field:'BlackCount',
        colId:'BlackCount',
        headerName:'Black'
      },
      {
          field:'RedCount',
          colId:'RedCount',
          headerName:'Red'
      },
    ];
    
    colDefs = columns.map((column:{header:string,colCode:string})=>{
        const customColdef = getProductAndLocationHeirarchiesFromEnv(column,{}); 

        if(customColdef) return customColdef
        return {
            field:column['colCode'],
            colId:column['colCode'],
            headerName:column['header']
        }
    })
    return [...customColdefs,...colDefs];
}

const colDefs1 = mapUIConfigToColdefs1(data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocationsuiconfig']['uiconfig']);

const sortData = (data:any,key:string|string[],) => {
    
  data.sort((row1:any,row2:any)=>{
    if(typeof key === 'string') return (row2[key]) - (row1[key])

    if(Array.isArray(key) && key.length > 0){
      const row1Sum = key.reduce((accumulator,currentKey:string)=>accumulator + row1[currentKey],0);
      const row2Sum = key.reduce((accumulator,currentKey:string)=>accumulator + row2[currentKey],0);
      return row2Sum-row1Sum
    }
    
  })
  return [...data];
}

  useEffect(()=>{
    const formattedRowData1 = sortData(convertToInt(data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocationsuiconfig']['data'],['BlackCount','RedCount']),['BlackCount','RedCount'])
    setRowData1(formattedRowData1)
    setChartThemeOverridesG1(generateChartOptions(formattedRowData1,chartParams1,undefined))
    
    const formattedRowData2 = convertToInt(data["prePostRationing"],['pre','post'])
    setRowData2(formattedRowData2)
    setChartThemeOverridesG2(generateChartOptions(formattedRowData2,chartParams2,undefined))
  },[])


  return (
    <>
      <SCDynamicContainer style={{height:'77vh'}}>
        <Allotment>
          <Allotment.Pane preferredSize={"50%"}>

                  <VFCharts  
                    height={'95%'}
                    chartParams={chartParams1}
                    colDefs={colDefs1}
                    rowData={rowData1}
                    chartProps={chartThemeOverridesG1}
                    containerStyle={{marginLeft:'0px',marginRight:'10px'}}
                  />
                  

          </Allotment.Pane>
          <Allotment.Pane preferredSize={"50%"} minSize={490}>
            
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
  );
};

export default ExpediteDispatches;
