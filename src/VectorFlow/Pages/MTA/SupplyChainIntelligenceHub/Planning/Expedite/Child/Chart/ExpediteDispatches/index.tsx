import { useRef, useMemo, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../../styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import { ColDef } from "ag-grid-enterprise";
import {
  SCChartHeaderContainer,
  SCChartHeader,
  SCChartContainer,
  SCHorizontalDivider,
  SCDynamicContainer,
  SCHorizontalAllignmentWrapper,
} from "../../../styles";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

import {GraphSeriesOverrides} from '../../../../../../../../../helpers/BPRConstants'
import VFModalCard from "../../../../../../../../../components/VectorFLOW/commons/VFModalCard";
import VFInfoToolTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import {convertToInt} from '../../../../../../../../../helpers/utils';

interface ExpediteChildDispatchesProps {
  data: any;
}

const ExpediteDispatches = ({ data }: ExpediteChildDispatchesProps) => {
  const refGraph1 = useRef<GridRef>();
  const refGraph2 = useRef<GridRef>();
  const refGraph3 = useRef<GridRef>();
  const [hideChart1, toggleChart1] = useState<boolean>(false);
  const [hideChart2, toggleChart2] = useState<boolean>(false);
  const [hideChart3, toggleChart3] = useState<boolean>(false);
  // const [hideChart3,toggleChart3] = useState<boolean>(false);
  
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
        return {
            field:column['colCode'],
            colId:column['colCode'],
            headerName:column['header']
        }
    })
    return [...customColdefs,...colDefs];
}

const colDefs1 = mapUIConfigToColdefs1(data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocationsuiconfig']['uiconfig']);

const mapUIConfigToColdefs2 = (columns:Array<{header:string,colCode:string}>) => {
    let colDefs = [];

    const customColdefs: ColDef[] = [
      {
        field: "WHDescription",
        headerName: "Receiving Location Name",
        colId: "WHDescription",
      },
    ];
    
    colDefs = columns.map((column:{header:string,colCode:string})=>{
        return {
            field:column['colCode'],
            colId:column['colCode'],
            headerName:column['header']
        }
    })
    return [...customColdefs,...colDefs];
}

const colDefs2 = mapUIConfigToColdefs2(data['maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig']['uiconfig']);


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

  // const getMaxParentLocationLength = (data: any) => {
  //   let maxParentLocationLength = 0;
  //   data?.forEach(
  //     (row: { WHDescription: string; count: Array<{ pwc: string; count: string }> }) => {
  //       maxParentLocationLength = Math.max(
  //         maxParentLocationLength,
  //         row["count"].length
  //       );
  //     }
  //   );
  //   return maxParentLocationLength;
  // };

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

  

 

  // const detailCellRendererParams = useMemo<any>(() => {
  //     return {
  //       detailGridOptions: {
  //         columnDefs: [
  //           { field: "ln",headerName:'Parent Location Code'},
  //           { field: "count",headerName:'Count of SKUs'},
  //         ],
  //         defaultColDef: {
  //           flex: 1,
  //         },
  //       },
  //       getDetailRowData: function (params:any) {
  //         params.successCallback(params.data.callRecords);
  //       },
  //     };
  //   }, []);


const colDefs3: ColDef[] = [
  {
    field: "color",
    headerName: "Color",
    colId: "color",
  },
  {
    field: "pre",
    headerName: "Availability Pre Rationing",
    colId: "pre",
  },
  {
    field: "post",
    headerName: "Availability Post Rationing",
    colId: "post",
  },
];

  

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

  const options: AgChartOptions = {
    // title: {
    //   text: "PRE",
    // },
    data: convertToInt(data["prePostRationing"],['pre','post']),
    series: [
      {
        type: "pie",
        title: {
          text: "PRE",
        },
        fills: ["#000000","#ED1C24","#FFCB05", "#418D18", "#BCBCBC","#355FD3"],
        angleKey: "pre",
        sectorLabelKey: "pre",
        outerRadiusRatio: 0.5,
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          fontSize:10,
          fontFamily:'Roboto',
          formatter: ({ value }) => `${value}%`,
        },
      },
      {
        type: "donut",
        title: {
          text: "POST",
        },
        fills: ["#000000","#ED1C24","#FFCB05", "#418D18", "#BCBCBC","#355FD3"],
        angleKey: "post",
        sectorLabelKey: "post",
        innerRadiusRatio: 0.7,
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          fontSize:10,
          fontFamily:'Roboto',
          formatter: ({ value }) => `${value}%`,
        },
      },
    ],
  };
  
  const generateChart = (graphNo: number, withOutContainer?: boolean) => {

    if (graphNo === 1) {
      if (withOutContainer) {
        refGraph1.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["WHDescription", 'BlackCount','RedCount'],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
        });
    }else {
      const container1 = document.getElementById(
        "ExpediteDispatchesG1"
      ) as HTMLElement;
      refGraph1.current?.api.createRangeChart({
        chartType: "stackedColumn",
        cellRange: {
          columns: ["WHDescription", 'BlackCount','RedCount'],
          rowStartIndex: 0,
          rowEndIndex: 9,
        },
        chartContainer: container1,
      });
    }
  }
  if (graphNo === 2) {
    if (withOutContainer) {
      refGraph2.current?.api.createRangeChart({
        chartType: "stackedColumn",
        cellRange: {
            columns: [
              "WHDescription",
              ...getParentLocationColdefs(data[
                "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
              ]['data']).map((coldef:ColDef)=>coldef.colId)
            ],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
      });
    } else {
      const container2 = document.getElementById(
        "ExpediteDispatchesG2"
      ) as HTMLElement;
      refGraph2.current?.api.createRangeChart({
        chartType: "stackedColumn",
        cellRange: {
          columns: [
            "WHDescription",
            ...getParentLocationColdefs(data[
              "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
            ]['data']).map((coldef:ColDef)=>coldef.colId)
          ],
          rowStartIndex: 0,
          rowEndIndex: 9,
        },
        chartContainer: container2,
      });
    }
  }
};



    // const detailCellRendererParams = useMemo<any>(() => {
    //     return {
    //       detailGridOptions: {
    //         columnDefs: [
    //           { field: "ln",headerName:'Parent Location Code'},
    //           { field: "count",headerName:'Count of SKUs'},
    //         ],
    //         defaultColDef: {
    //           flex: 1,
    //         },
    //       },
    //       getDetailRowData: function (params:any) {
    //         params.successCallback(params.data.callRecords);
    //       },
    //     };
    //   }, []);

 
   
    

    

   

  const handleChartClose = (graphNo: number) => {
    if (graphNo === 1) {
      // chartRef1?.destroyChart();
      toggleChart1(true);
      // setGrid1DisplayStatus("block");
    }
    if (graphNo === 2) {
      // chartRef2?.destroyChart();
      toggleChart2(true);
      // setGrid2DisplayStatus("block");
    }
    if (graphNo === 3) {
      toggleChart3(true);
      // setGrid3DisplayStatus('block')
    }
  };

  const getChartToolbarItems: any = () => ["chartDownload"];

  const chartThemeOverridesG1 = useMemo<any>(() => {
    return {
        column:{
            series:{
                highlightStyle:{
                    item:{
                        fill: "rgb(255,255,255,0.3)",
                    }
                }
            }
        },
      common: {
        legend: {
          position: "bottom",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "Parent Location Name",
              position: "bottom",
              fontSize:10,
              fontFamily:'Roboto'
            },
            label:{
                formatter:(params:any)=>{
                    if(params.value.length > 6) return params.value.toString().slice(0,6) + '...';
                    return params.value;
                },
              fontSize:8,
              fontFamily:'Roboto'
            }
          },
          number: {
            title: {
              enabled: true,
              text: "Count Of SKUs",
              position: "left",
              fontSize:10,
              fontFamily:'Roboto'
            },
          },
        },
      },
    };
  }, []);

  const chartThemeOverridesG2 = useMemo<any>(() => {
    return {
        ...GraphSeriesOverrides,
      common: {
        legend: {
          position: "bottom",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "Receiving Location Name",
              position: "bottom",
              fontSize:10,
              fontFamily:'Roboto'
            },
            label:{
                formatter:(params:any)=>{
                    if(params.value.length > 6) return params.value.toString().slice(0,6) + '...';
                    return params.value;
                },
              fontSize:8,
              fontFamily:'Roboto',
            }
          },
          number: {
            title: {
              enabled: true,
              text: "Count Of SKUs",
              position: "left",
              fontSize:10,
              fontFamily:'Roboto'
            },
          },
        },
        tooltip: {
          renderer: (params: any) => console.log("params", params),
        },
      },
    };
  }, []);

  const myCustomThemeG1: any = {
    palette: {
      fills: ['#000000','#DA3535'],
      strokes: ["#ffffff", "#ffffff"],
    },
  };

  const myCustomThemeG2: any = {
    palette: {
      fills: ["#D0A928"],
      strokes: ["#ffffff", "#ffffff"],
    },
  };

  const graph1 = [
    "This graph highlights the top 10 parent locations with max SKUs in Pipeline Black/Red which have rationed qty available for receiving locations",
    "To improve availability, expedite dispatches from these parent locations.",
  ];

  const graph2 = [
    "This graph highlights the top 10 receiving locations with maximum SKUs in Pipeline black/red which have rationed quantity available at parent location.",
    "To improve availability, expedite dispatches to these locations.",
  ];

  const graph3 = [
    "This graph shows the potential improvement in Pipeline availability assuming the entire rationed qty would become goods in transit.",
  ];

  // const splitDataIntoRandomPercentage = (data:any,key:string) => {
  //   return data.map((row:any)=>{
  //       const redPercentage = Math.random() * 100;
  //       const blackPercentage = 100 - redPercentage;

  //       const red = (parseFloat(row[key]) * redPercentage) / 100;
  //       const black = (parseFloat(row[key]) * blackPercentage) / 100;
  //       return {...row,red:Math.round(red),black:Math.round(black)};
        
  //   })
  // }

  return (
    <>
      <SCDynamicContainer>
        <Allotment>
          <Allotment.Pane preferredSize={"60%"}>
            <Allotment vertical>
              <Allotment.Pane preferredSize={"50%"}>
                <SCHorizontalAllignmentWrapper>
                  <SCChartContainer height={"100%"}>
                    <SCChartHeaderContainer>
                      <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
                        <SCChartHeader style={{marginRight:10}}>
                          Top 10 Parent Location: Max Pipeline Black/Red SKUs With
                          Available Rationed Qty For Receiving Locations
                        </SCChartHeader>
                      </div>
                        <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                          <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph1}/></div>
                          {!hideChart1 && (
                            <img
                              src="/assets/img/VectorFLOW/BPR/expand-graph.svg"
                              alt=""
                              onClick={() => handleChartClose(1)}
                              width={15}
                              height={15}
                            />
                          )}
                        </div>
                    </SCChartHeaderContainer>
                    <SCHorizontalDivider />
                    <VFModalCard openModal={hideChart1} closeModal={()=>toggleChart1(false)} headerIcon='' headerText="Top 10 Parent Location: Max Pipeline Black/Red SKUs With
                          Available Rationed Qty For Receiving Locations" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                        <div className="ag-theme-planning" style={{width:'1000px'}}>
                          <VFTable
                            ref={refGraph1}
                            columnDefs={colDefs1}
                            rowData={sortData(convertToInt(data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocationsuiconfig']['data'],['BlackCount','RedCount']),['BlackCount','RedCount'])}
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
                              }}                          onGridReady={() => generateChart(1, true)}
                            getChartToolbarItems={getChartToolbarItems}
                            chartToolPanelsDef={{
                              panels: [],
                            }}
                            chartThemeOverrides={chartThemeOverridesG1}
                            chartThemes={["myCustomTheme"]}
                            customChartThemes={{
                              myCustomTheme: myCustomThemeG1,
                            }}
                            disableZoomScaling={true}
                            defaultColDef={{
                                floatingFilter:true,
                                filter: "agMultiColumnFilter",
                              }}
                            height={'480px'}
                          />
                        </div>
                    </VFModalCard>
                    <div style={{ display: "none" }}>
                      <VFTable
                        ref={refGraph1}
                        columnDefs={colDefs1}
                        rowData={sortData(convertToInt(data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocationsuiconfig']['data'],['BlackCount','RedCount']),['BlackCount','RedCount'])}
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
                          }}                      onGridReady={() => generateChart(1)}
                        getChartToolbarItems={getChartToolbarItems}
                        chartToolPanelsDef={{
                          panels: [],
                        }}
                        chartThemeOverrides={chartThemeOverridesG1}
                        chartThemes={["myCustomTheme"]}
                        customChartThemes={{
                          myCustomTheme: myCustomThemeG1,
                        }}
                        disableZoomScaling={true}
                      />
                    </div>
                    <div id="ExpediteDispatchesG1" style={{ height: "80%" }}></div>
                  </SCChartContainer>
                  {/* <div style={{ marginLeft: "10px", marginRight: "10px",zoom:"0.7" }}>
                    <VFInfoTip text={graph1} />
                  </div> */}
                </SCHorizontalAllignmentWrapper>
              </Allotment.Pane>
              <Allotment.Pane preferredSize={"50%"}>
                <SCHorizontalAllignmentWrapper>
                  <SCChartContainer style={{marginTop:'10px'}} height={"100%"}>
                    <SCChartHeaderContainer>
                      <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
                        <SCChartHeader style={{marginRight:10}}>
                          Top 10 Receiving Locations: Max Pipeline Inv. Black/Red
                          SKUs With Rationed Quantity Available At Parent
                        </SCChartHeader>
                      </div>
                        <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                          <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph2}/></div>
                          {!hideChart2 && (
                            <img
                              src="/assets/img/VectorFLOW/BPR/expand-graph.svg"
                              alt=""
                              onClick={() => handleChartClose(2)}
                              width={15}
                              height={15}
                            />
                          )}
                        </div>
                    </SCChartHeaderContainer>
                    <SCHorizontalDivider />
                    <VFModalCard openModal={hideChart2} closeModal={()=>toggleChart2(false)} headerIcon='' headerText="Top 10 Receiving Locations: Max Pipeline Inv. Black/Red
                          SKUs With Rationed Quantity Available At Parent" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                        <div className="ag-theme-planning" style={{width:'1000px'}}>
                          <VFTable
                            ref={refGraph2}
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
                              }}
                            columnDefs={[
                              ...colDefs2,...getParentLocationColdefs(
                                data[
                                  "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
                                ]['data']
                              ),
                            ]}
                            rowData={mapDataToRowData(
                              data[
                                "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
                              ]['data']
                            )}
                            enableCharts={true}
                            onGridReady={() => generateChart(2, true)}
                            getChartToolbarItems={getChartToolbarItems}
                            chartToolPanelsDef={{
                              panels: [],
                            }}
                            chartThemeOverrides={chartThemeOverridesG2}
                            chartThemes={["myCustomTheme"]}
                            customChartThemes={{
                              myCustomTheme: myCustomThemeG2,
                            }}
                            disableZoomScaling={true}
                            defaultColDef={{
                                floatingFilter:true,
                                filter: "agMultiColumnFilter",
                              }}
                            height={'480px'}
                          />
                        </div>
                    </VFModalCard>
                    <div style={{ display: "none" }}>
                      <VFTable
                        ref={refGraph2}
                        columnDefs={[
                          ...colDefs2,
                          ...getParentLocationColdefs(
                            data[
                              "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
                            ]['data']
                          ),
                        ]}
                        rowData={mapDataToRowData(
                          data[
                            "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
                          ]['data']
                        )}
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
                          }}                      onGridReady={() => generateChart(2)}
                        getChartToolbarItems={getChartToolbarItems}
                        chartToolPanelsDef={{
                          panels: [],
                        }}
                        chartThemeOverrides={chartThemeOverridesG2}
                        chartThemes={["myCustomTheme"]}
                        customChartThemes={{
                          myCustomTheme: myCustomThemeG2,
                        }}
                        disableZoomScaling={true}
                      />
                    </div>
                    <div id="ExpediteDispatchesG2" style={{ height: "80%" }}></div>
                  </SCChartContainer>
                  {/* <div style={{ marginLeft: "10px", marginRight: "10px",zoom:"0.7" }}>
                    <VFInfoTip text={graph2} />
                  </div> */}
                </SCHorizontalAllignmentWrapper>
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
          <Allotment.Pane>
            <SCHorizontalAllignmentWrapper style={{paddingBottom:'5px'}}>
            <SCChartContainer height={"100%"}>
              <SCChartHeaderContainer>
                <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
                  <SCChartHeader style={{marginRight:10}}>
                    Comparision of Availability: Pre Rationing vs Post Rationing
                  </SCChartHeader>
                </div>
                <div style={{display:'flex',alignItems:'center',marginRight:'18px'}}>
                  <div style={{marginBottom:'-5px',marginRight:'10px'}}><VFInfoToolTip infoList={graph3}/></div>
                  {!hideChart3 && (
                    <img
                      src="/assets/img/VectorFLOW/BPR/expand-graph.svg"
                      alt=""
                      onClick={() => handleChartClose(3)}
                      width={15}
                      height={15}
                    />
                  )}
                </div>
              </SCChartHeaderContainer>
              <SCHorizontalDivider />
              <VFModalCard openModal={hideChart3} closeModal={()=>toggleChart3(false)} headerIcon='' headerText="Comparision of Availability: Pre Rationing vs Post Rationing" headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
                <div className="ag-theme-planning" style={{width:'1000px'}}>
                  <VFTable
                    ref={refGraph3}
                    columnDefs={colDefs3}
                    rowData={convertToInt(data["prePostRationing"],['pre','post'])}
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
                      }}                    // onGridReady={generateChart}
                    getChartToolbarItems={getChartToolbarItems}
                    chartToolPanelsDef={{
                      panels: [],
                    }}
                    chartThemeOverrides={chartThemeOverridesG1}
                    // chartThemes={['myCustomTheme']}
                    // customChartThemes={{
                    //     'myCustomTheme':myCustomTheme
                    // }}
                    defaultColDef={{
                        floatingFilter:true,
                        filter: "agMultiColumnFilter",
                      }}
                  />
                </div>
              </VFModalCard>
              {!hideChart3 && (
                <div id="ExpediteDispatchesG3" style={{height:"80%"}}>
                  <AgChartsReact options={options} />
                </div>
              )}
            </SCChartContainer>
            {/* <div style={{ marginLeft: "10px", marginRight: "10px",zoom:"0.7" }}>
              <VFInfoTip text={graph3} />
            </div> */}
            </SCHorizontalAllignmentWrapper>
          </Allotment.Pane>
        </Allotment>
      </SCDynamicContainer>
    </>
  );
};

export default ExpediteDispatches;
