import { useState, useEffect } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../../styles.css";
import { ColDef } from "ag-grid-enterprise";
import { SCDynamicContainer } from "../../../styles";
import { chartParams1, chartParams2 } from "./chartParams";
import {colDefForPie as colDefs2} from '../../../colDefs'
import {convertToInt, getProductAndLocationHeirarchiesFromEnv, generateChartOptions} from '../../../../../../../../../helpers/utils';
import VFCharts from "../../../../../../../../../components/VectorFLOW/commons/VFCharts";

interface ExpediteChildDispatchesProps {
  data: any;
}

const ExpediteDispatches = ({ data }: ExpediteChildDispatchesProps) => {

  const [chartThemeOverridesG1 , setChartThemeOverridesG1] = useState<any>(undefined)
  const [chartThemeOverridesG2 , setChartThemeOverridesG2] = useState<any>(undefined)

  const [customizedChartParams1,setCustomizedChartParams1] = useState<any>(undefined)

  const [rowData1,setRowData1] = useState<any>([])
  const [rowData2,setRowData2] = useState<any>([])
  const [colDefs1 , setColDefs1] = useState<any>([])


const mapUIConfigToColdefs1 = (columns:Array<{header:string,colCode:string}>) => {
    let colDefs = [];

    const customColdefs: ColDef[] = [
      {
        field: "WHDescription",
        headerName: "Receiving Location Name",
        colId: "WHDescription",
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


  const getParentLocationColdefs = (data: any):any => {
    const dynamicColdefs: ColDef[] = [];  
    const columnHash:any = {};

    data.forEach((row:any)=>{
      row['count'].forEach((colObj:any)=>{
        if(!columnHash[colObj['pwc']]){
          columnHash[colObj['pwc']] = 1;
          dynamicColdefs.push({
            field: colObj['pwc'],
            headerName: colObj['pwc'],
            colId: colObj['pwc'],
          });
        }
      })
    })
    return dynamicColdefs;
  };


  const generateRowObj = (data:any) => {
    const parentLocationColdefs = getParentLocationColdefs(data);
    const rowObj: any = {
      ln: "",
    };
    parentLocationColdefs.forEach((colDef:any)=>{
      rowObj[colDef['field']] = 0
    })
    
    return rowObj;
  };

  const mapDataToRowData = (data: any) => {
      
    const rowData: any = [];
    data.forEach(
      (row:any) => {
        const rowObj = {...row,...generateRowObj(data)}; 
        row["count"].forEach(
          (subRow: { pwc: string; count: string }) => {
            rowObj[subRow.pwc] = parseInt(subRow.count, 10);
          }
        );
        rowData.push(rowObj);
      }
    );

    return rowData;
  };


  const sortRowData1 = (rowdata: any) => {
    const processedData = rowdata.map((row: any) => {
      // Create row object with additional attributes
      const rowObj = { ...row};
  
      // Calculate total count by summing up all counts in the 'count' array
      const totalCount = row.count.reduce((sum: number, subRow: any) => 
        sum + parseInt(subRow.count, 10), 0
      );
  
      // Attach totalCount for sorting
      return { ...rowObj, totalCount };
    });
  
    // Sort array based on totalCount in descending order
    processedData.sort((a: any, b: any) => b.totalCount - a.totalCount);
  
    // Remove totalCount before returning
    return processedData.map(({ totalCount, ...rest }: any) => rest);
  };


  useEffect(()=>{

    const cutomizedChartParams = generateCustomizedChartParams()
    setCustomizedChartParams1(cutomizedChartParams)

    const formattedRowData1 = sortRowData1(mapDataToRowData(data["maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"]['data']))
    setRowData1(formattedRowData1)

    const dynamicColumns = getParentLocationColdefs(data["maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"]['data'])
    setColDefs1([...mapUIConfigToColdefs1(data['maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig']['uiconfig']),...dynamicColumns])

    setChartThemeOverridesG1(generateChartOptions(formattedRowData1,cutomizedChartParams,undefined))


    
    const formattedRowData2 = convertToInt(data["prePostRationing"],['pre','post'])
    setRowData2(formattedRowData2)
    setChartThemeOverridesG2(generateChartOptions(formattedRowData2,chartParams2,undefined))
  },[])


  const generateCustomizedChartParams = () =>{
    const overridenChartparams = {...chartParams1}
    const dynamicFeilds = getParentLocationColdefs(data[
      "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
    ]['data']).map((coldef:ColDef)=>coldef.colId)
    const defaultColForChart = {
      columns: [ "WHDescription", ...dynamicFeilds],
      start:0,
      end:9
    }
    overridenChartparams.defaultColForChart = defaultColForChart

    overridenChartparams.chartKey.Yaxis = dynamicFeilds
    let i = -1;
    const customizedSeriesData = overridenChartparams.series.map((point:any,index:number)=>{
      i++;
      return {
        ...point , yKey:dynamicFeilds[i], yName:dynamicFeilds[i]
      }
    })
    overridenChartparams.series = customizedSeriesData
    return overridenChartparams
  }

  return (
    <>
      <SCDynamicContainer style={{height:'77vh'}}>
        <Allotment>
          <Allotment.Pane preferredSize={"50%"}>
                
              {customizedChartParams1 !==undefined && (
                  <VFCharts     
                    height={'95%'}
                    chartParams={customizedChartParams1}
                    colDefs={colDefs1}
                    rowData={rowData1}
                    chartProps={chartThemeOverridesG1}
                    containerStyle={{marginLeft:'0px',marginRight:'10px'}}
                    />
                  )}

          </Allotment.Pane>
          <Allotment.Pane preferredSize={"50%"} minSize={500}>

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
