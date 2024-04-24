import { useRef, useMemo, useState } from "react";
import { Allotment } from "allotment";
import {
  useGetDBMNormSuggestionLoc,
  useGetDBMNormSuggestionPie,
  useGetDBMNormSuggestionSKUs,
  useGetDBMNormSuggestionAgeing,
} from "../../../../../Services/MTA/InsightsAndTrends";
import "allotment/dist/style.css";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../types/MDM";
import { ColDef, ChartRef } from "ag-grid-enterprise";
import {
  SCChartHeaderContainer,
  SCChartHeader,
  SCChartContainer,
  SCHorizontalDivider,
  SCDynamicContainer,
  SCHorizontalAllignmentWrapper,
} from "../style";
import VFInfoTip from "../../../../../../components/VectorFLOW/commons/VFInfoTip";
import VFLoader from "../../../../../../components/VectorFLOW/commons/VFLoader";

import {GraphSeriesOverrides} from '../../../../../../helpers/BPRConstants'

//import 'ag-grid-enterprise';

const DBMNormSuggestions = () => {
  const { data: DBMNormSuggestionLoc, isLoading: isLoadingGraph1 } =
    useGetDBMNormSuggestionLoc();
  const { data: DBMNormSuggestionPie, isLoading: isLoadingGraph2 } =
    useGetDBMNormSuggestionPie();
  const { data: DBMNormSuggestionSKUs, isLoading: isLoadingGraph3 } =
    useGetDBMNormSuggestionSKUs();
  const { data: DBMNormSuggestionAgeing, isLoading: isLoadingGraph4 } =
    useGetDBMNormSuggestionAgeing();

  const DBMSuggestionLocData = DBMNormSuggestionLoc?.data?.data;
  const ActiveDBMSuggestionData = DBMNormSuggestionPie?.data?.data;
  const DBMSuggestionSkuData = DBMNormSuggestionSKUs?.data?.data;
  const DBMSuggestionAgeingData = DBMNormSuggestionAgeing?.data?.data;
  const totalCount = ActiveDBMSuggestionData?.reduce(
    (acc: any, curr: any) => acc + curr.count,
    0
  );
  const pieData = ActiveDBMSuggestionData?.map((row: any) => ({
    suggestion: row.suggestion,
    count: Math.floor((row.count / totalCount) * 100),
  }));

  const refGraph1 = useRef<GridRef>();
  const refGraph2 = useRef<GridRef>();
  const refGraph3 = useRef<GridRef>();
  const refGraph4 = useRef<GridRef>();

  const [hideChart1, toggleChart1] = useState<boolean>(false);
  const [hideChart2, toggleChart2] = useState<boolean>(false);
  const [hideChart3, toggleChart3] = useState<boolean>(false);
  const [hideChart4, toggleChart4] = useState<boolean>(false);

  const [grid1DisplayStatus, setGrid1DisplayStatus] = useState<string>("none");
  const [grid2DisplayStatus, setGrid2DisplayStatus] = useState<string>("none");
  const [grid3DisplayStatus, setGrid3DisplayStatus] = useState<string>("none");
  const [grid4DisplayStatus, setGrid4DisplayStatus] = useState<string>("none");

  let chartRef1: ChartRef | undefined;
  let chartRef2: ChartRef | undefined;
  let chartRef3: ChartRef | undefined;
  let chartRef4: ChartRef | undefined;

  const coldefs1: ColDef[] = [
    {
      field: "location",
      headerName: "Location Name",
      colId: "location",
    },
    {
      field: "NormInc",
      headerName: "NormInc",
      colId: "NormInc",
    },
    {
      field: "NormDec",
      headerName: "NormDec",
      colId: "NormDec",
    },
    {
      field: "whcode",
      headerName: "Location Code",
      colId: "whcode",
    },
    {
      field: "LogisticsLocation",
      headerName: "LogisticsLocation",
      colId: "LogisticsLocation",
    },
    {
      field: "LL1",
      headerName: "LL1",
      colId: "LL1",
    },
    {
      field: "LL2",
      headerName: "LL2",
      colId: "LL2",
    },
    {
      field: "LL3",
      headerName: "LL3",
      colId: "LL3",
    },
    {
      field: "LL4",
      headerName: "LL4",
      colId: "LL4",
    },
    {
      field: "LL5",
      headerName: "LL5",
      colId: "LL5",
    },
    {
      field: "c1",
      headerName: "c1",
      colId: "c1",
    },
    {
      field: "C2",
      headerName: "C2",
      colId: "C2",
    },
    {
      field: "C3",
      headerName: "C3",
      colId: "C3",
    },
    {
      field: "C4",
      headerName: "C4",
      colId: "C4",
    },
    {
      field: "C5",
      headerName: "C5",
      colId: "C5",
    },
    {
      field: "C6",
      headerName: "C6",
      colId: "C6",
    },
    {
      field: "C7",
      headerName: "C7",
      colId: "C7",
    },
    {
      field: "C8",
      headerName: "C8",
      colId: "C8",
    },
    {
      field: "C9",
      headerName: "C9",
      colId: "C9",
    },
    {
      field: "C10",
      headerName: "C10",
      colId: "C10",
    },
    {
      field: "C11",
      headerName: "C11",
      colId: "C11",
    },
    {
      field: "C12",
      headerName: "C12",
      colId: "C12",
    },
    {
      field: "C13",
      headerName: "C13",
      colId: "C13",
    },
    {
      field: "C14",
      headerName: "C14",
      colId: "C14",
    },
    {
      field: "C15",
      headerName: "C15",
      colId: "C15",
    },
  ];
  const coldefs2: ColDef[] = [
    {
      field: "suggestion",
      headerName: "suggestion",
      colId: "suggestion",
    },
    {
      field: "count",
      headerName: "count",
      colId: "count",
    },
  ];

  const coldefs3: ColDef[] = [
    {
      field: "sku",
      headerName: "SKU Code",
      colId: "sku",
    },
    {
      field: "NormInc",
      headerName: "NormInc",
      colId: "NormInc",
    },
    {
      field: "NormDec",
      headerName: "NormDec",
      colId: "NormDec",
    },
    {
      field: "SKUDescription",
      headerName: "SKUDescription",
      colId: "SKUDescription",
    },
    {
      field: "elephantOrderCapping",
      headerName: "elephantOrderCapping",
      colId: "elephantOrderCapping",
    },
    {
      field: "weight",
      headerName: "weight",
      colId: "weight",
    },
    {
      field: "volume",
      headerName: "volume",
      colId: "volume",
    },
    {
      field: "SL1",
      headerName: "SL1",
      colId: "SL1",
    },
    {
      field: "SL2",
      headerName: "SL2",
      colId: "SL2",
    },
    {
      field: "SL3",
      headerName: "SL3",
      colId: "SL3",
    },
    {
      field: "SL4",
      headerName: "SL4",
      colId: "SL4",
    },
    {
      field: "SL5",
      headerName: "SL5",
      colId: "SL5",
    },
    {
      field: "c1",
      headerName: "c1",
      colId: "c1",
    },
    {
      field: "C2",
      headerName: "C2",
      colId: "C2",
    },
    {
      field: "C3",
      headerName: "C3",
      colId: "C3",
    },
    {
      field: "C4",
      headerName: "C4",
      colId: "C4",
    },
    {
      field: "C5",
      headerName: "C5",
      colId: "C5",
    },
    {
      field: "C6",
      headerName: "C6",
      colId: "C6",
    },
    {
      field: "C7",
      headerName: "C7",
      colId: "C7",
    },
    {
      field: "C8",
      headerName: "C8",
      colId: "C8",
    },
    {
      field: "C9",
      headerName: "C9",
      colId: "C9",
    },
    {
      field: "C10",
      headerName: "C10",
      colId: "C10",
    },
    {
      field: "C11",
      headerName: "C11",
      colId: "C11",
    },
    {
      field: "C12",
      headerName: "C12",
      colId: "C12",
    },
    {
      field: "C13",
      headerName: "C13",
      colId: "C13",
    },
    {
      field: "C14",
      headerName: "C14",
      colId: "C14",
    },
    {
      field: "C15",
      headerName: "C15",
      colId: "C15",
    },
  ];
  const coldefs4: ColDef[] = [
    {
      field: "age",
      headerName: "Ageing",
      colId: "age",
    },
    {
      field: "NormInc",
      headerName: "NormInc",
      colId: "NormInc",
    },
    {
      field: "NormDec",
      headerName: "NormDec",
      colId: "NormDec",
    },
  ];

  const generateChart = (graphNo: number, withOutContainer?: boolean) => {
    if (graphNo === 1) {
      if (withOutContainer) {
        chartRef1 = refGraph1.current?.api.createRangeChart({
          //chartType:'column',
          chartType: "stackedColumn",
          cellRange: {
            columns: ["location", "NormInc", "NormDec"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
        });
      } else {
        const container1 = document.getElementById("g1") as HTMLElement;
        chartRef1 = refGraph1.current?.api.createRangeChart({
          //chartType:'column',
          chartType: "stackedColumn",
          cellRange: {
            columns: ["location", "NormInc", "NormDec"],
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
          chartType: "pie",
          cellRange: {
            columns: ["suggestion", "count"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
        });
      } else {
        const container2 = document.getElementById("g2") as HTMLElement;
        chartRef2 = refGraph2.current?.api.createRangeChart({
          chartType: "pie",
          cellRange: {
            columns: ["suggestion", "count"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
          chartContainer: container2,
        });
      }
    }
    if (graphNo === 3) {
      if (withOutContainer) {
        chartRef3 = refGraph3.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["sku", "NormInc", "NormDec"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
        });
      } else {
        const container3 = document.getElementById("g3") as HTMLElement;
        chartRef3 = refGraph3.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["sku", "NormInc", "NormDec"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
          chartContainer: container3,
        });
      }
    }
    if (graphNo === 4) {
      if (withOutContainer) {
        chartRef4 = refGraph4.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["age", "NormInc", "NormDec"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
        });
      } else {
        const container4 = document.getElementById("g4") as HTMLElement;
        chartRef4 = refGraph4.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["age", "NormInc", "NormDec"],
            rowStartIndex: 0,
            rowEndIndex: 9,
          },
          chartContainer: container4,
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
      chartRef3?.destroyChart();
      toggleChart3(true);
      setGrid3DisplayStatus("block");
    }
    if (graphNo === 4) {
      chartRef4?.destroyChart();
      toggleChart4(true);
      setGrid4DisplayStatus("block");
    }
  };

  const getChartToolbarItems: any = () => ["chartDownload"];

  const chartThemeOverrides1 = useMemo<any>(() => {
    return {
      ...GraphSeriesOverrides,
      palette: {
        fills: ["#355FD3", "#D0A928"],
      },
      common: {
        legend: {
          position: "top",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "Location Name",
              position: "bottom",
            },
          },
          series: {
            title: {
              enabled: true,
              text: "NORM SUggestions",
              position: "bottom",
            },
          },
        },
      },
    };
  }, []);
  const chartThemeOverrides2 = useMemo<any>(() => {
    return {
      ...GraphSeriesOverrides,
      palette: {
        fills: ["#355FD3", "#D0A928", "#403F3F", "#00000026"],
      },
      common: {
        legend: {
          position: "top",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "SKU Code",
              position: "bottom",
            },
          },
          series: {
            title: {
              enabled: true,
              text: "Count of Locations",
              position: "left",
            },
          },
        },
      },
    };
  }, []);
  const chartThemeOverrides3 = useMemo<any>(() => {
    return {
      ...GraphSeriesOverrides,
      palette: {
        fills: ["#0c7528", "#570dbf"],
      },
      common: {
        legend: {
          position: "top",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "SKU Code",
              position: "bottom",
            },
          },
          series: {
            title: {
              enabled: true,
              text: "No of suggestions",
              position: "left",
            },
          },
        },
      },
    };
  }, []);
  const chartThemeOverrides4 = useMemo<any>(() => {
    return {
      ...GraphSeriesOverrides,
      palette: {
        fills: ["#0c7528", "#570dbf"],
      },
      common: {
        legend: {
          position: "top",
        },
        axes: {
          category: {
            title: {
              enabled: true,
              text: "Ageing",
              position: "bottom",
            },
          },
          series: {
            title: {
              enabled: true,
              text: "No of suggestions",
              position: "left",
            },
          },
        },
      },
    };
  }, []);

  const myCustomTheme: any = {
    palette: {
      fills: ["#355FD3", "#D0A928", "#403F3F", "#00000026"],
      strokes: ["#ffffff", "#ffffff"],
    },
  };

  const graph1 = [
    "This chart highlights the top 10 locations based on the maximum no. of suggestions for norm increase or decrease.",
  ];

  const graph2 = [
    "This pie chart highlights the distribution of SKU Location-wise DBM Suggestion status as on today.",
  ];
  const graph3 = [
    "This chart highlights the top 10 products based on the maximum no. of suggestions for norm increase or decrease",
  ];
  const graph4 = [
    "This chart highlights the pendency of DBM suggestions. DBM Suggestion Age = Today - Suggestion Generation Date",
  ];
  if (
    isLoadingGraph1 ||
    isLoadingGraph2 ||
    isLoadingGraph3 ||
    isLoadingGraph4
  ) {
    return <VFLoader />;
  }

  return (
    <>
      <SCDynamicContainer>
        <Allotment vertical>
          <Allotment.Pane>
            <SCHorizontalAllignmentWrapper>
              <Allotment>
                <Allotment.Pane preferredSize={"50%"}>
                  <SCChartContainer >
                    <SCChartHeaderContainer>
                      <SCChartHeader>
                        Top 10 Locations: Max No. of DBM Suggestions
                      </SCChartHeader>
                      {!hideChart1 && (
                        <img
                          src="/assets/img/VectorFLOW/BPR/minimize.svg"
                          alt=""
                          data-testid="minimizechart1"
                          onClick={() => handleChartClose(1)}
                        />
                      )}
                    </SCChartHeaderContainer>
                    <SCHorizontalDivider />
                    <div
                      style={{ height: "460px", display: grid1DisplayStatus }}
                    >
                      {hideChart1 && (
                        <VFTable
                          ref={refGraph1}
                          columnDefs={coldefs1}
                          rowData={DBMSuggestionLocData}
                          enableCharts={true}
                          enableRangeSelection={true}
                          onRowDataUpdated={() => generateChart(1, true)}
                          getChartToolbarItems={getChartToolbarItems}
                          chartToolPanelsDef={{
                            panels: [],
                          }}
                          defaultColDef={{
                            floatingFilter:true,
                            filter: "agMultiColumnFilter",
                          }}
                          chartThemeOverrides={chartThemeOverrides1}
                          chartThemes={["myCustomTheme"]}
                          customChartThemes={{
                            myCustomTheme: myCustomTheme,
                          }}
                          disableZoomScaling={true}
                        />
                      )}
                      {!hideChart1 && (
                        <div style={{ display: "none" }}>
                          <VFTable
                            ref={refGraph1}
                            columnDefs={coldefs1}
                            rowData={DBMSuggestionLocData}
                            enableCharts={true}
                            enableRangeSelection={true}
                            onRowDataUpdated={() => generateChart(1)}
                            getChartToolbarItems={getChartToolbarItems}
                            chartToolPanelsDef={{
                              panels: [],
                            }}
                            chartThemeOverrides={chartThemeOverrides1}
                            chartThemes={["myCustomTheme"]}
                            customChartThemes={{
                              myCustomTheme: myCustomTheme,
                            }}
                            disableZoomScaling={true}
                          />
                        </div>
                      )}
                    </div>
                    {!hideChart1 && (
                      <div id="g1" style={{ height: "460px" }}></div>
                    )}
                    <div id="SKUWiseGraph1"></div>
                  </SCChartContainer>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <VFInfoTip text={graph1} />
                  </div>
                </Allotment.Pane>
                <Allotment.Pane>
                  <SCChartContainer >
                    <SCChartHeaderContainer>
                      <SCChartHeader>
                        Distribution Of Current Active DBM Suggestions
                      </SCChartHeader>
                      {!hideChart2 && <img src="/assets/img/VectorFLOW/BPR/minimize.svg" alt="" data-testid="minimizechart2" onClick={()=>handleChartClose(2)}/>}
                      
                    </SCChartHeaderContainer>
                    <SCHorizontalDivider />
                    <div
                      style={{ height: "460px", display: grid2DisplayStatus }}
                    >
                      {hideChart2 && (
                        <VFTable
                          ref={refGraph2}
                          columnDefs={coldefs2}
                          rowData={pieData}
                          enableCharts={true}
                          enableRangeSelection={true}
                          onFirstDataRendered={() => generateChart(2, true)}
                          getChartToolbarItems={getChartToolbarItems}
                          chartToolPanelsDef={{
                            panels: [],
                          }}
                          defaultColDef={{
                            floatingFilter:true,
                            filter: "agMultiColumnFilter",
                          }}
                          chartThemeOverrides={chartThemeOverrides2}
                          chartThemes={["myCustomTheme"]}
                          customChartThemes={{
                            myCustomTheme: myCustomTheme,
                          }}
                        />
                      )}
                      {!hideChart2 && (
                        <div style={{ display: "none" }}>
                          <VFTable
                            ref={refGraph2}
                            columnDefs={coldefs2}
                            rowData={pieData}
                            enableCharts={true}
                            enableRangeSelection={true}
                            onFirstDataRendered={() => generateChart(2)}
                            getChartToolbarItems={getChartToolbarItems}
                            chartToolPanelsDef={{
                              panels: [],
                            }}
                            chartThemeOverrides={chartThemeOverrides2}
                            chartThemes={["myCustomTheme"]}
                            customChartThemes={{
                              myCustomTheme: myCustomTheme,
                            }}
                            disableZoomScaling={true}
                          />
                        </div>
                      )}
                    </div>
                    {!hideChart2 && (
                      <div id="g2" style={{ height: "460px" }}></div>
                    )}
                    <div id="SKUWiseGraph2"></div>
                  </SCChartContainer>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <VFInfoTip text={graph2} />
                  </div>
                </Allotment.Pane>
              </Allotment>
            </SCHorizontalAllignmentWrapper>
          </Allotment.Pane>
          <Allotment.Pane>
            <SCHorizontalAllignmentWrapper>
              <Allotment>
                <Allotment.Pane>
                  <SCChartContainer >
                    <SCChartHeaderContainer>
                      <SCChartHeader>
                        Top 10 Products: Max No. of DBM Suggestions{" "}
                      </SCChartHeader>
                      {!hideChart3 && (
                        <img
                          src="/assets/img/VectorFLOW/BPR/minimize.svg"
                          alt=""
                          data-testid="minimizechart3"
                          onClick={() => handleChartClose(3)}
                        />
                      )}
                    </SCChartHeaderContainer>
                    <SCHorizontalDivider />
                    <div
                      style={{ height: "570px", display: grid3DisplayStatus }}
                    >
                      {hideChart3 && (
                        <VFTable
                          ref={refGraph3}
                          columnDefs={coldefs3}
                          rowData={DBMSuggestionSkuData}
                          enableCharts={true}
                          enableRangeSelection={true}
                          onRowDataUpdated={() => generateChart(3, true)}
                          getChartToolbarItems={getChartToolbarItems}
                          chartToolPanelsDef={{
                            panels: [],
                          }}
                          defaultColDef={{
                            floatingFilter:true,
                            filter: "agMultiColumnFilter",
                          }}
                          chartThemeOverrides={chartThemeOverrides3}
                          chartThemes={["myCustomTheme"]}
                          customChartThemes={{
                            myCustomTheme: myCustomTheme,
                          }}
                        />
                      )}
                      {!hideChart3 && (
                        <div style={{ display: "none" }}>
                          <VFTable
                            ref={refGraph3}
                            columnDefs={coldefs3}
                            rowData={DBMSuggestionSkuData}
                            enableCharts={true}
                            enableRangeSelection={true}
                            onRowDataUpdated={() => generateChart(3)}
                            getChartToolbarItems={getChartToolbarItems}
                            chartToolPanelsDef={{
                              panels: [],
                            }}
                            chartThemeOverrides={chartThemeOverrides3}
                            chartThemes={["myCustomTheme"]}
                            customChartThemes={{
                              myCustomTheme: myCustomTheme,
                            }}
                            disableZoomScaling={true}
                          />
                        </div>
                      )}
                    </div>
                    {!hideChart3 && (
                      <div id="g3" style={{ height: "460px" }}></div>
                    )}
                    <div id="graph3"></div>
                  </SCChartContainer>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <VFInfoTip text={graph3} />
                  </div>
                </Allotment.Pane>
                <Allotment.Pane>
                  <SCChartContainer >
                    <SCChartHeaderContainer>
                      <SCChartHeader>
                        Ageing categorization of DBM suggestions
                      </SCChartHeader>
                      {!hideChart4 && (
                        <img
                          src="/assets/img/VectorFLOW/BPR/minimize.svg"
                          alt=""
                          data-testid="minimizechart4"
                          onClick={() => handleChartClose(4)}
                        />
                      )}
                    </SCChartHeaderContainer>
                    <SCHorizontalDivider />
                    <div
                      style={{ height: "570px", display: grid4DisplayStatus }}
                    >
                      {hideChart4 && (
                        <VFTable
                          ref={refGraph4}
                          defaultColDef={{
                            floatingFilter:true,
                            filter: "agMultiColumnFilter",
                          }}
                          columnDefs={coldefs4}
                          rowData={DBMSuggestionAgeingData}
                          enableCharts={true}
                          enableRangeSelection={true}
                          onRowDataUpdated={() => generateChart(4, true)}
                          getChartToolbarItems={getChartToolbarItems}
                          chartToolPanelsDef={{
                            panels: [],
                          }}
                          chartThemeOverrides={chartThemeOverrides4}
                          chartThemes={["myCustomTheme"]}
                          customChartThemes={{
                            myCustomTheme: myCustomTheme,
                          }}
                        />
                      )}
                      {!hideChart4 && (
                        <div style={{ display: "none" }}>
                          <VFTable
                            ref={refGraph4}
                            columnDefs={coldefs4}
                            rowData={DBMSuggestionAgeingData}
                            enableCharts={true}
                            enableRangeSelection={true}
                            onRowDataUpdated={() => generateChart(4)}
                            getChartToolbarItems={getChartToolbarItems}
                            chartToolPanelsDef={{
                              panels: [],
                            }}
                            chartThemeOverrides={chartThemeOverrides4}
                            chartThemes={["myCustomTheme"]}
                            customChartThemes={{
                              myCustomTheme: myCustomTheme,
                            }}
                            disableZoomScaling={true}
                          />
                        </div>
                      )}
                    </div>
                    {!hideChart4 && (
                      <div id="g4" style={{ height: "460px" }}></div>
                    )}
                    <div id="graph4"></div>
                  </SCChartContainer>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <VFInfoTip text={graph4} />
                  </div>
                </Allotment.Pane>
              </Allotment>
            </SCHorizontalAllignmentWrapper>
          </Allotment.Pane>
        </Allotment>
      </SCDynamicContainer>
    </>
  );
};

export default DBMNormSuggestions;
