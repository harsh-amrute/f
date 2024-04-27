import { useRef, useMemo, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "../../../styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {
  SCChartHeaderContainer,
  SCChartHeader,
  SCChartContainer,
  SCHorizontalDivider,
  SCDynamicContainer,
  SCHorizontalAllignmentWrapper,
} from "../../../styles";
import VFInfoTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoTip";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

import {GraphSeriesOverrides} from '../../../../../../../../../helpers/BPRConstants'

interface ExpediteParentDispatchesProps {
  data: any;
}

const ExpediteDispatches = ({ data }: ExpediteParentDispatchesProps) => {
  const refGraph1 = useRef<GridRef>();
  const refGraph2 = useRef<GridRef>();
  const refGraph3 = useRef<GridRef>();
  const [hideChart1, toggleChart1] = useState<boolean>(false);
  const [hideChart2, toggleChart2] = useState<boolean>(false);
  const [hideChart3, toggleChart3] = useState<boolean>(false);
  // const [hideChart3,toggleChart3] = useState<boolean>(false);
  const [grid1DisplayStatus, setGrid1DisplayStatus] = useState<string>("none");
  const [grid2DisplayStatus, setGrid2DisplayStatus] = useState<string>("none");

  let chartRef1: ChartRef | undefined;
  let chartRef2: ChartRef | undefined;

  

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
        headerName: "Count of SKUs",
        colId: "SKUCounts",
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

const convertToInt = (data:any)=>{
    return data.map((row:any)=>{
        const tempObj:any = {};
        Object.keys(row).forEach((key:string)=>{
            const value = parseFloat(row[key])
            if(!isNaN(value)){
                tempObj[key] = value
            }
            else{
                tempObj[key] = row[key];
            }
        })
        return {...tempObj}
    })
}

const sortData = (data:any,key:string) => {
    data.sort((row1:any,row2:any)=>{
        return (row2[key]) - (row1[key])
    })
    return [...data];
}

  const getMaxParentLocationLength = (data: any) => {
    let maxParentLocationLength = 0;
    data?.forEach(
      (row: { WHDescription: string; count: Array<{ pwc: string; count: string }> }) => {
        maxParentLocationLength = Math.max(
          maxParentLocationLength,
          row["count"].length
        );
      }
    );
    return maxParentLocationLength;
  };

  const getParentLocationColdefs = (data: any) => {
    const maxParentLocationLength = getMaxParentLocationLength(data);
    const dynamicColdefs: ColDef[] = [];
    for (let i = 0; i < maxParentLocationLength; i++) {
      dynamicColdefs.push({
        field: `p${i + 1}`,
        headerName: `Parent ${i + 1}`,
        colId: `p${i + 1}`,
      });
    }
    console.log(dynamicColdefs);
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

  

  const generateRowObj = (maxParentLocationLength: number) => {
    const rowObj: any = {
      ln: "",
    };
    for (let i = 0; i < maxParentLocationLength; i++) {
      rowObj[`p${i + 1}`] = "";
    }
    return rowObj;
  };

  const mapDataToRowData = (data: any) => {
    let rowData: any = [];
    data.forEach(
      (row:any) => {
        const rowObj = {...row,...generateRowObj(getMaxParentLocationLength(data))};  
        row["count"].forEach(
          (subRow: { pwc: string; count: string }, index: number) => {
            rowObj[`p${index + 1}`] = parseInt(subRow.count, 10);
          }
        );
        rowData.push(rowObj);
      }
    );
    rowData = rowData.map((row: any) => {
      const newRow: any = { ...row };
      Object.keys(newRow).forEach((key: string) => {
        if (newRow[key] === "") newRow[key] = 0;
      });
      return newRow;
    });

    return rowData;
  };
console.log(convertToInt(data["prePostRationing"]));
  const options: AgChartOptions = {
    // title: {
    //   text: "PRE",
    // },
    data: convertToInt(data["prePostRationing"]),
    series: [
      {
        type: "pie",
        title: {
          text: "PRE",
          fontSize: 12,
          fontWeight: "bold",
          color:'black'


        },
        fills: ["#000000","#ED1C24","#FFCB05", "#418D18", "#BCBCBC","#355FD3"],
        angleKey: "pre",
        sectorLabelKey: "pre",
        outerRadiusRatio: 0.5,
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          formatter: ({ value }) => `${value}%`,
        },
      },
      {
        type: "donut",
        title: {
          text: "POST",
          fontSize: 12,
          fontWeight: "bold",
          color:'black'

        },
        fills: ["#000000","#ED1C24","#FFCB05", "#418D18", "#BCBCBC","#355FD3"],
        angleKey: "post",
        sectorLabelKey: "post",
        innerRadiusRatio: 0.7,
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          formatter: ({ value }) => `${value}%`,
        },
      },
    ],
  };
  
  const generateChart = (graphNo: number, withOutContainer?: boolean) => {

    if (graphNo === 1) {
      if (withOutContainer) {
        chartRef1 = refGraph1.current?.api.createRangeChart({
          chartType: "column",
          cellRange: {
            columns: ["WHDescription", "SKUCounts"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
        });
      } else {
        const container1 = document.getElementById(
          "ExpediteDispatchesG1"
        ) as HTMLElement;
        chartRef1 = refGraph1.current?.api.createRangeChart({
          chartType: "column",
          cellRange: {
            columns: ["WHDescription", "SKUCounts"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
          chartContainer: container1,
        });
      }
    }
    if (graphNo === 2) {
      if (withOutContainer) {
        chartRef2 = refGraph2.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: [
              "WHDescription",
              ...Array.from(
                {
                  length: getMaxParentLocationLength(
                    data[
                      "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
                    ]['data']
                  ),
                },
                (el: undefined, index: number) => `p${index + 1}`
              ),
            ],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
        });
      } else {
        const container2 = document.getElementById(
          "ExpediteDispatchesG2"
        ) as HTMLElement;
        chartRef2 = refGraph2.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: [
              "WHDescription",
              ...Array.from(
                {
                  length: getMaxParentLocationLength(
                    data[
                      "maxPipelineInvBlackRedSKUWithRationedQuantityAvailableAtParentuiconfig"
                    ]['data']
                  ),
                },
                (el: undefined, index: number) => `p${index + 1}`
              ),
            ],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
          chartContainer: container2,
        });
      }
    }
  };

  const handleChartClose = (graphNo: number) => {
    if (graphNo === 1) {
      chartRef1?.destroyChart();
      toggleChart1(true);
      setGrid1DisplayStatus("block");
    }
    if (graphNo === 2) {
      chartRef2?.destroyChart();
      toggleChart2(true);
      setGrid2DisplayStatus("block");
    }
    if (graphNo === 3) {
      toggleChart3(true);
      // setGrid2DisplayStatus('block')
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
          position: "top",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "Parent Location Name",
              position: "bottom",
            },
          },
          number: {
            title: {
              enabled: true,
              text: "Count of SKUs",
              position: "left",
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
          position: "top",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "Receiving Location Name",
              position: "bottom",
            },
          },
          number: {
            title: {
              enabled: true,
              text: "Count of SKUs",
              position: "left",
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
      fills: ["#860202"],
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



  return (
    <>
      <SCDynamicContainer>
        <Allotment>
          <Allotment.Pane preferredSize={"60%"}>
            <Allotment vertical defaultSizes={[400,400]}>
              <Allotment.Pane maxSize={520}>
                <SCHorizontalAllignmentWrapper>
                <SCChartContainer >
                  <SCChartHeaderContainer>
                    <SCChartHeader>
                      Top 10 Parent Location: Max Pipeline Black/Red SKUs With
                      Available Rationed Qty For Receiving Locations
                    </SCChartHeader>
                    {!hideChart1 && (
                      <img
                        src="/assets/img/VectorFLOW/BPR/minimize.svg"
                        alt=""
                        onClick={() => handleChartClose(1)}
                      />
                    )}
                  </SCChartHeaderContainer>
                  <SCHorizontalDivider />
                  <div style={{ height: "260px", display: grid1DisplayStatus }}>
                    {hideChart1 && (
                      <VFTable
                        ref={refGraph1}
                        columnDefs={colDefs1}
                        rowData={sortData(convertToInt(data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocationsuiconfig']['data']),'SKUCounts')}
                        enableCharts={true}
                        enableRangeSelection={true}
                        onGridReady={() => generateChart(1, true)}
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
                      />
                    )}
                    {!hideChart1 && (
                      <div style={{ display: "none" }}>
                        <VFTable
                          ref={refGraph1}
                          columnDefs={colDefs1}
                          rowData={sortData(convertToInt(data['maxEcoBlackRedSKUWithAvailableRationedQtyAtReceivingLocationsuiconfig']['data']),'SKUCounts')}
                          enableCharts={true}
                          enableRangeSelection={true}
                          onGridReady={() => generateChart(1)}
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
                    )}
                  </div>
                  {!hideChart1 && (
                    <div
                      id="ExpediteDispatchesG1"
                      style={{ height: "260px" }}
                    ></div>
                  )}
                </SCChartContainer>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                  <VFInfoTip text={graph1} />
                </div>
                </SCHorizontalAllignmentWrapper>
              </Allotment.Pane>
              <Allotment.Pane>
                <SCHorizontalAllignmentWrapper>
                <SCChartContainer >
                  <SCChartHeaderContainer>
                    <SCChartHeader>
                      Top 10 Receiving Locations: Max Pipeline Inv. Black/Red
                      SKUs With Rationed Quantity Available At Parent
                    </SCChartHeader>
                    {!hideChart2 && (
                      <img
                        src="/assets/img/VectorFLOW/BPR/minimize.svg"
                        alt=""
                        onClick={() => handleChartClose(2)}
                      />
                    )}
                  </SCChartHeaderContainer>
                  <SCHorizontalDivider />
                  <div style={{ height: "260px", display: grid2DisplayStatus }}>
                    {hideChart2 && (
                      <VFTable
                        ref={refGraph2}
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
                        enableRangeSelection={true}
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
                      />
                    )}
                    {!hideChart2 && (
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
                          onGridReady={() => generateChart(2)}
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
                    )}
                  </div>
                  {!hideChart2 && (
                    <div
                      id="ExpediteDispatchesG2"
                      style={{ height: "260px" }}
                    ></div>
                  )}
                </SCChartContainer>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                  <VFInfoTip text={graph2} />
                </div>
                </SCHorizontalAllignmentWrapper>
              </Allotment.Pane>
            </Allotment>
          </Allotment.Pane>
          <Allotment.Pane>
            <SCHorizontalAllignmentWrapper>
            <SCChartContainer >
              <SCChartHeaderContainer>
                <SCChartHeader>
                  Comparision of Availability: Pre Rationing vs Post Rationing
                </SCChartHeader>
                {!hideChart3 && (
                  <img
                    src="/assets/img/VectorFLOW/BPR/minimize.svg"
                    alt=""
                    onClick={() => handleChartClose(3)}
                  />
                )}
              </SCChartHeaderContainer>
              <SCHorizontalDivider />
              <div>
                {hideChart3 && (
                  <VFTable
                    ref={refGraph3}
                    columnDefs={colDefs3}
                    rowData={convertToInt(data["prePostRationing"])}
                    enableCharts={true}
                    enableRangeSelection={true}
                    // onGridReady={generateChart}
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
                )}
              </div>
              {!hideChart3 && (
                <div id="ExpediteDispatchesG3" style={{height:750 * 0.75}}>
                  <AgChartsReact options={options} />
                </div>
              )}
            </SCChartContainer>
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <VFInfoTip text={graph3} />
            </div>
            </SCHorizontalAllignmentWrapper>
          </Allotment.Pane>
        </Allotment>
      </SCDynamicContainer>
    </>
  );
};

export default ExpediteDispatches;
