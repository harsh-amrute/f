import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
// import "./styles.css";
import VFTable from "../../../../../../../../../components/VectorFLOW/commons/VFTable";
import { type GridRef } from "../../../../../../../../types/MDM";
import {
  SCChartHeaderContainer,
  SCChartHeader,
  SCChartContainer,
  SCHorizontalDivider,
  SCDynamicContainer,
  Xaxislegend,
  chartHeightVar,
  headerHeightVar,
  ml20,
} from "../../../style.css";

import VFModalCard from "../../../../../../../../../components/VectorFLOW/commons/VFModalCard";
import VFInfoToolTip from "../../../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import {
  convertToInt,
  getProductAndLocationHeirarchiesFromEnv,
  generateChartOptions,
  nonce,
} from "../../../../../../../../../helpers/utils";

import Chart from "react-apexcharts";
import { chartParams1 } from "./chartParams";
import VFCharts from "../../../../../../../../../components/VectorFLOW/commons/VFCharts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../../redux/store/store";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface MonitorGITChildLocationWiseProps {
  data: any;
}

const MonitorGITChildLocationWiseCharts = ({
  data,
}: MonitorGITChildLocationWiseProps) => {
  const [chartThemeOverridesG1, setChartThemeOverridesG1] =
    useState<any>(undefined);
  const [chartThemeOverridesG2, setChartThemeOverridesG2] =
    useState<any>(undefined);
  const [rowData1, setRowData1] = useState<any>([]);
  const [rowData2, setRowData2] = useState<any>([]);

  const refGraph2 = useRef<GridRef>();
  const [hideChart2, toggleChart2] = useState<boolean>(false);

  const [chartId1, setChartId1] = useState<any>("");

  const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
  const PRODUCT_PERMISSION_L1 = EnvConfig["PRODUCT_PERMISSION_L1"];
  const PRODUCT_PERMISSION_L2 = EnvConfig["PRODUCT_PERMISSION_L2"];
  const PRODUCT_PERMISSION_L3 = EnvConfig["PRODUCT_PERMISSION_L3"];

  const LOCATION_PERMISSION_L1 = EnvConfig["LOCATION_PERMISSION_L1"];
  const LOCATION_PERMISSION_L2 = EnvConfig["LOCATION_PERMISSION_L2"];
  const LOCATION_PERMISSION_L3 = EnvConfig["LOCATION_PERMISSION_L3"];

  const seriesData = useMemo(() => {
    if (!data) return [];
    return data["delayDaysStatisticalBox"]["data"].map((item: any) => ({
      x: item.name,
      y: [
        parseFloat(item.mind),
        parseFloat(item.Q1),
        parseFloat(item.median),
        parseFloat(item.Q3),
        parseFloat(item.maxd),
      ],
    }));
  }, [data]);

  useEffect(() => {
    const formattedRowData1 = sortData(
      convertToInt(data["maxTechBlackRedColumn"]["data"], [
        "delay",
        "superdelay",
      ])
    );
    setRowData1(formattedRowData1);
    setChartThemeOverridesG1(
      generateChartOptions(formattedRowData1, chartParams1, undefined)
    );

    //// add for chart 2
  }, []);

  const series = [
    {
      name: "boxplot",
      data: seriesData,
    },
  ];

  const mapUIConfigToColdefs = (
    columns: Array<{ header: string; colCode: string }>
  ) => {
    let colDefs = [];

    const customColdefs = [
      {
        field: "name",
        colId: "name",
        headerName: "Location Name",
      },
      {
        field: "delay",
        colId: "delay",
        headerName: "Delay",
        filter: "agNumberColumnFilter",
      },
      {
        field: "superdelay",
        colId: "superdelay",
        headerName: "Super Delay",
        filter: "agNumberColumnFilter",
      },
    ];

    colDefs = columns.map((column: { header: string; colCode: string }) => {
      const customColdef = getProductAndLocationHeirarchiesFromEnv(
        column,
        {},
        PRODUCT_PERMISSION_L1,
        PRODUCT_PERMISSION_L2,
        PRODUCT_PERMISSION_L3,
        LOCATION_PERMISSION_L1,
        LOCATION_PERMISSION_L2,
        LOCATION_PERMISSION_L3
      );

      if (customColdef) return customColdef;

      return {
        field: column["colCode"],
        colId: column["colCode"],
        headerName: column["header"],
      };
    });
    return [...customColdefs, ...colDefs];
  };

  const mapUIConfigToColdefs2 = (
    columns: Array<{ header: string; colCode: string }>
  ) => {
    let colDefs = [];

    const customColdefs = [
      {
        field: "name",
        colId: "name",
        headerName: "Name",
      },
      {
        field: "LogisticsLocation",
        colId: "LogisticsLocation",
        headerName: "Logistics Location",
      },
      {
        field: "Q1",
        colId: "Q1",
        headerName: "Q1",
      },
      {
        field: "Q3",
        colId: "Q3",
        headerName: "Q3",
      },
      {
        field: "maxd",
        colId: "maxd",
        headerName: "Maximum",
        filter: "agNumberColumnFilter",
      },
      {
        field: "mean",
        colId: "mean",
        headerName: "Mean",
        filter: "agNumberColumnFilter",
      },
      {
        field: "median",
        colId: "median",
        headerName: "Median",
        filter: "agNumberColumnFilter",
      },

      {
        field: "mind",
        colId: "mind",
        headerName: "Minimum",
        filter: "agNumberColumnFilter",
      },
    ];

    colDefs = columns.map((column: { header: string; colCode: string }) => {
      const customColdef = getProductAndLocationHeirarchiesFromEnv(
        column,
        {},
        PRODUCT_PERMISSION_L1,
        PRODUCT_PERMISSION_L2,
        PRODUCT_PERMISSION_L3,
        LOCATION_PERMISSION_L1,
        LOCATION_PERMISSION_L2,
        LOCATION_PERMISSION_L3
      );

      if (customColdef) return customColdef;

      return {
        field: column["colCode"],
        colId: column["colCode"],
        headerName: column["header"],
      };
    });
    return [...customColdefs, ...colDefs];
  };

  const colDefs1 = mapUIConfigToColdefs(
    data["maxTechBlackRedColumn"]["uiconfig"]
  );

  const colDefs2 = mapUIConfigToColdefs2(
    data["delayDaysStatisticalBox"]["uiconfig"]
  );

  const sortData = (data: any) => {
    data.sort((row1: any, row2: any) => {
      return (
        row2["superdelay"] +
        row2["delay"] -
        (row1["superdelay"] + row1["delay"])
      );
    });
    return data;
  };

  const generateChart = (graphNo: number, withOutContainer?: boolean) => {
    // should be removed once chart 2 is created
    // nothing related to chart 2 was there here , only chart 1 was created here so removed the contents
  };

  const handleChartClose = (graphNo: number) => {
    // should be removed once chart 2 is created
    if (graphNo === 2) {
      toggleChart2(true);
    }
  };

  const myCustomTheme: any = {
    palette: {
      fills: ["#9A0101", "#F02424"],
      strokes: ["#ffffff", "#ffffff"],
    },
  };

  const graph2 = [
    // should be added in chartParams2
    "This box plot graph displays the statistical distribution of delay days in transport for various locations. Each box represents the range of delay days as on today",
  ];

  const boxplotContainerRef = useRef<HTMLDivElement>(null);
  const [boxplotHeight, setBoxplotHeight] = useState<number>(0);

  useEffect(() => {
    const container = boxplotContainerRef.current;
    if (!container) return;
  
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        if (height > 0) {
          setBoxplotHeight(Math.floor(height));
        }
      }
    });
  
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={SCDynamicContainer}>
        <Allotment>
          <Allotment.Pane preferredSize={"50%"}>
            <VFCharts
              height={"95%"}
              chartParams={chartParams1}
              colDefs={colDefs1}
              rowData={rowData1}
              chartProps={chartThemeOverridesG1}
              containerStyle={{ marginLeft: "0px", marginRight: "10px" }}
            />
          </Allotment.Pane>

          <Allotment.Pane preferredSize={"50%"}>
            <div
              className={`${SCChartContainer} ${ml20}`}
              style={{
                ...assignInlineVars({ [chartHeightVar]: "95%" }),
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                className={`${SCChartHeaderContainer}`}
                style={assignInlineVars({
                  [headerHeightVar]: "40px",
                })}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <p className={SCChartHeader} style={{ marginRight: 10 }}>
                    Statistical Overview Of Delay Days In Transport At Receiving
                    Locations
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "18px",
                  }}
                >
                  <div style={{ marginBottom: "-5px", marginRight: "10px" }}>
                    <VFInfoToolTip infoList={graph2} />
                  </div>
                  {!hideChart2 && (
                    <img
                      src="/assets/img/VectorFLOW/BPR/expand-graph.svg"
                      width={15}
                      height={15}
                      alt=""
                      onClick={() => handleChartClose(2)}
                    />
                  )}
                </div>
              </div>
              <hr className={SCHorizontalDivider} />
              <div
                className="boxplot-chart"
                ref={boxplotContainerRef}
                style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}
              >
                {/* <GlobalStyle /> */} 
                <Chart
                  options={{
                    chart: {
                      type: "boxPlot",
                      nonce: nonce,
                      height: boxplotHeight - 49,
                      animations: {
                        enabled: false,
                        easing: "easeinout",
                        speed: 800,
                        animateGradually: {
                          enabled: false,
                          delay: 150,
                        },
                        dynamicAnimation: {
                          enabled: false,
                          speed: 350,
                        },
                      },
                      zoom: {
                        enabled: false,
                      },
                      toolbar: {
                        show: true,
                        tools: {
                          download:
                            '<img src ="/assets/img/downlod-icon.svg" width=16 height=16 class="download-icon" />',
                        },
                      },
                    }as any,
                    grid: {
                      show: true,
                      strokeDashArray: 4, // Length of dashes
                    },
                    stroke: {
                      show: true,
                      curve: "smooth",
                      lineCap: "butt",
                      colors: ["#848484"],
                      width: 1.5,
                      dashArray: 0,
                    },
                    // xaxis: {
                    //     crosshairs: {
                    //         show: false
                    //     },
                    //     tooltip:{
                    //         enabled:false,
                    //     },

                    //     labels: {
                    //         style: {
                    //           fontSize: '12px', // Font size of y-axis labels
                    //           fontFamily: 'Roboto', // Font family of y-axis labels
                    //             colors:'#717171',
                    //             fontWeight:400
                    //         },
                    //       },
                    // },
                    xaxis: {
                      crosshairs: {
                        show: false,
                      },
                      tooltip: {
                        enabled: false,
                      },
                      title: {
                        text: "Receiving Location Name",
                        style: { fontSize: "10px", fontFamily: "Roboto", color: "#6d6d6d" },
                      },
                      labels: {
                        style: {
                          fontSize: "12px", // Font size of y-axis labels
                          fontFamily: "Roboto", // Font family of y-axis labels
                          colors: "#717171",
                          fontWeight: 400,
                        },
                        //   formatter: (params:any) => {
                        //     if (params !== undefined && params.value !== undefined) {
                        //       const stringValue = params.value.toString();
                        //       if(stringValue.length > 10) return stringValue.slice(0,10) + '...';
                        //       return params.value;
                        //     }
                        //     return '';
                        //   },
                      },
                    },
                    yaxis: {
                      title: {
                        text: "Delay Days",
                        style: {
                          fontSize: "10px",
                          fontFamily: "Roboto",
                          color: "#6d6d6d",
                        },
                      },
                      labels: {
                        style: {
                          fontSize: "14px", // Font size of y-axis labels
                          fontFamily: "Roboto", // Font family of y-axis labels
                          colors: "#717171",
                        },
                      },
                    },

                    plotOptions: {
                      boxPlot: {
                        colors: {
                          lower: "#D3D3D3", // Color for Q1 (1st quartile)
                          upper: "#848484", // Color for Q3 (3rd quartile)
                        },
                      },
                    },
                    legend: {
                        show: true,
                        position: "bottom",
                        markers: { fillColors: ["transparent", "transparent"], strokeColor: "transparent" },
                        labels: { colors: ["transparent", "transparent"] },
                      },
                  }}
                  series={series} // Make sure you have defined the series data
                  type="boxPlot"
                  height={boxplotHeight - 49}
                />
              </div>

              <VFModalCard
                openModal={hideChart2}
                closeModal={() => toggleChart2(false)}
                headerIcon=""
                headerText="Statistical Overview of Delay Days in Transport at Receiving Locations"
                headerBgColor=""
                headerTextColor="#00000"
                paddingLeftAndRight={27}
                closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
              >
                <div className="ag-theme-planning" style={{ width: "1000px" }}>
                  <VFTable
                    ref={refGraph2}
                    columnDefs={colDefs2}
                    rowData={sortData(
                      convertToInt(data["delayDaysStatisticalBox"]["data"], [
                        "Q1",
                        "Q3",
                        "maxd",
                        "mind",
                        "mean",
                        "median",
                      ])
                    )}
                    enableCharts={true}
                    enableRangeSelection={true}
                    rowSelection="multiple"
                    statusBar={{
                      statusPanels: [
                        {
                          statusPanel: "agTotalAndFilteredRowCountComponent",
                          align: "left",
                        },
                        {
                          statusPanel: "agTotalRowCountComponent",
                          align: "left",
                        },
                        {
                          statusPanel: "agFilteredRowCountComponent",
                          align: "left",
                        },
                        {
                          statusPanel: "agSelectedRowCountComponent",
                          align: "left",
                        },
                        {
                          statusPanel: "agAggregationComponent",
                          align: "left",
                        },
                      ],
                    }}
                    onGridReady={() => generateChart(2, true)}
                    chartToolPanelsDef={{
                      panels: [],
                    }}
                    chartThemeOverrides={chartThemeOverridesG1}
                    chartThemes={["myCustomTheme"]}
                    customChartThemes={{
                      myCustomTheme: myCustomTheme,
                    }}
                    disableZoomScaling={true}
                    defaultColDef={{
                      floatingFilter: true,
                      filter: "agMultiColumnFilter",
                    }}
                    height={"480px"}
                  />
                </div>
              </VFModalCard>
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </>
  );
};

export default MonitorGITChildLocationWiseCharts;
