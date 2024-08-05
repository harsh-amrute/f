import { AgChartOptions, AgCharts } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import { Dispatch, SetStateAction, useRef } from 'react'
import { SCChartContainer, SCChartMainContainer, SCHorizontalDivider, ChartWrapper } from './styles'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'
import { GridRef } from '../../../../../VectorFlow/types/MDM'

interface SplitGrpahContainerProps {
  colDef: any,
  options: AgChartOptions,
  data: any,
  rowData: any,
  header: () => JSX.Element,
  graphTitle: string,
  tableTitle: string,
  tableLoading?: boolean,
  chartLoading?: boolean,
  setTableLoading: Dispatch<SetStateAction<boolean>>,
  setChartLoading: Dispatch<SetStateAction<boolean>>,
  hideChart: boolean,
  toggleChart: Dispatch<SetStateAction<boolean>>,
  TooltipRenderer: (param: any) => string,
  graphType: number,
  date?: string,
  chartHeight?: number
}



const SplitGraphContainer = ({
  colDef,
  options,
  data,
  rowData,
  header,
  graphTitle,
  tableTitle,
  setTableLoading,
  setChartLoading,
  hideChart,
  toggleChart,
  TooltipRenderer,
  graphType,
  chartHeight,
}: SplitGrpahContainerProps) => {
  const chartRef = useRef<AgChartsReact>(null);
  const refGraph1 = useRef<GridRef>(null);

  const myCustomTheme = () => {
    switch (graphType) {
      case 1:
        return {
          palette: {
            fills: ['black', 'red', 'yellow', 'green', 'grey'],
            strokes: ['black', 'red', 'yellow', 'green', 'grey'],
          },
        }

      case 4:
        return {
          palette: {
            fills: ["#AD5000", 'gray', '#459D55'],
            strokes: ["#AD5000", 'gray', '#459D55'],
          },
        }

      case 5:
        return {
          palette: {
            fills: ['gray'],
            strokes: ['gray'],
          },
        }

      case 6:
        return {
          palette: {
            fills: ['black', 'red'],
            strokes: ['black', 'red'],
          },
        }
      case 7:
        return {
          palette: {
            fills: ['black', 'red', 'yellow', 'green', 'blue'],
            strokes: ['black', 'red', 'yellow', 'green', 'blue'],
          },
        }

      default:
        return {
          palette: {
            fills: ['black', 'red', 'green', 'yellow', 'grey'],
            strokes: ['black', 'red', 'green', 'yellow', 'grey'],
          },
        }
    }


  }


  const generateChart = (graphNo: number) => {

    switch (graphNo) {
      case 1:
        refGraph1.current?.api.createRangeChart({
          chartType: 'line',
          cellRange: {
            columns: ['dt', 'b', 'r', 'y', 'g', 'bl', 'w'],
          },

          chartThemeOverrides: {
            line: {
              series: {
                tooltip: {
                  renderer: TooltipRenderer
                },
                strokeWidth: 3

              },
              legend: {
                item: {
                  marker: {
                    shape: 'square'
                  }
                }
              }


            }
          }

        })
        break;
      case 2:
        refGraph1.current?.api.createRangeChart({
          chartType: 'column',
          cellRange: {
            columns: ['rn', 'rc'],
          },

          chartThemeOverrides: {
            line: {
              series: {
                tooltip: {
                  renderer: TooltipRenderer
                },
                strokeWidth: 3

              },
              legend: {
                item: {
                  marker: {
                    shape: 'square'
                  }
                }
              }

            }
          }
        })
        break;
      case 3:
        refGraph1.current?.api.createRangeChart({
          chartType: 'column',
          cellRange: {
            columns: ['sn', 'rc'],
          },

          chartThemeOverrides: {
            line: {
              series: {
                tooltip: {
                  renderer: TooltipRenderer
                },
                strokeWidth: 3

              },
              legend: {
                item: {
                  marker: {
                    shape: 'square'
                  }
                }
              }

            }
          }
        })
        break;
      case 4:
        refGraph1.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["ccr", "exceedDays", 'days', 'limit'],
          },
          seriesChartTypes: [
            { colId: "exceedDays", chartType: "stackedColumn" },
            { colId: "days", chartType: "stackedColumn" },
            { colId: "limit", chartType: "line" }
          ],
          chartThemeOverrides: {
            column: {
              axes: {
                category: {
                  gridStyle: [{ stroke: "transparent" }],

                  bottom: {
                    label: {
                      fontSize: 8,
                    },
                  },
                },
              },
              series: {
                highlightStyle: {
                  item: {
                    fill: "white",
                    fillOpacity: 0.2,
                  },
                },
                tooltip: {
                  renderer: TooltipRenderer,
                },
                strokeWidth: 1,
                strokeOpacity: 0,
              },
              legend: {
                item: {
                  label: {
                    fontSize: 10,
                  },

                  marker: {
                    shape: "square",
                  },
                },
              },
            },
            bar: {
              axes: {
                category: {
                  gridStyle: [{ stroke: "transparent" }, { stroke: "transparent" }],
                },
              },
            },
          },
        });
        break;
      case 5:
        refGraph1.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["ccr", "days"],
          },
          chartThemeOverrides: {
            column: {
              axes: {
                category: {
                  gridStyle: [{ stroke: "transparent" }],

                  bottom: {
                    label: {
                      fontSize: 8,
                    },
                  },
                },
              },
              series: {
                highlightStyle: {
                  item: {
                    fill: "white",
                    fillOpacity: 0.2,
                  },
                },
                tooltip: {
                  renderer: TooltipRenderer,
                },
                strokeWidth: 1,
                strokeOpacity: 0,
              },
              legend: {
                item: {
                  label: {
                    fontSize: 10,
                  },

                  marker: {
                    shape: "square",
                  },
                },
              },
            },
            bar: {
              axes: {
                category: {
                  gridStyle: [{ stroke: "transparent" }, { stroke: "transparent" }],
                },
              },
            },
          },
        });
        break;
      case 6:
        refGraph1.current?.api.createRangeChart({
          chartType: "stackedBar",
          cellRange: {
            columns: ["r", "bo", "ro"],
          },
          chartThemeOverrides: {
            bar: {
              axes: {
                category: {
                  position: 'left', // Position the category axis on the left
                  gridStyle: [{ stroke: "transparent" }],
                  label: {
                    fontSize: 8,
                    rotation: 0
                  },
                  left: {
                    label: {
                      fontSize: 8,
                    },
                  },
                },
                number: {
                  position: 'bottom',
                  gridStyle: [{ stroke: "transparent" }],
                  label: {
                    fontSize: 8,
                  },
                },
              },
              series: {
                highlightStyle: {
                  item: {
                    fill: "white",
                    fillOpacity: 0.2,
                  },
                },
                tooltip: {
                  renderer: TooltipRenderer,
                },
                strokeWidth: 1,
                strokeOpacity: 0,
              },
              legend: {
                item: {
                  label: {
                    fontSize: 10,
                  },

                  marker: {
                    shape: "square",
                  },
                },
              },
            }
          },
        });
        break;
        break;
      case 7:
        refGraph1.current?.api.createRangeChart({
          chartType: "stackedColumn",
          cellRange: {
            columns: ["trailDept", "b", 'r', 'y', 'g', 'bl'],
          },
          chartThemeOverrides: {
            column: {
              axes: {
                category: {
                  gridStyle: [{ stroke: "transparent" }],

                  bottom: {
                    label: {
                      fontSize: 8,
                    },
                  },
                },
              },
              series: {
                highlightStyle: {
                  item: {
                    fill: "white",
                    fillOpacity: 0.2,
                  },
                },
                tooltip: {
                  renderer: TooltipRenderer,
                },
                strokeWidth: 1,
                strokeOpacity: 0,
              },
              legend: {
                item: {
                  label: {
                    fontSize: 10,
                  },

                  marker: {
                    shape: "square",
                  },
                },
              },
            },
            bar: {
              axes: {
                category: {
                  gridStyle: [{ stroke: "transparent" }, { stroke: "transparent" }],
                },
              },
            },
          },
        });
        break;
      default:
        <></>
    }


  }




  return (
    <div style={{ width: "100%" }}>


      <SCChartContainer style={{ border: '1px solid #CCCCCC', margin: '2px' }}>
        <SCChartMainContainer style={{ zoom: 1 }}>
          {header()}
        </SCChartMainContainer>

        <SCHorizontalDivider />
        <ChartWrapper>
          <div style={{ height: '100%', width: '100%' }}>
            <div className="title" style={{ backgroundColor: 'white', height: '40px', display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 500, textAlign: 'center', margin: '0 auto' }}>
                {graphTitle}
              </div>
              <div style={{ marginLeft: '0 10px -5px', marginBottom: '-5px' }} onClick={() => {

                (chartRef && chartRef.current && chartRef.current.chart) && AgCharts.download(chartRef.current.chart, { fileName: graphTitle });

              }}>
                <img src='/assets/img/mto/RMPMBufferTrend/download.svg' style={{ color: "#CCCCCC", paddingBottom: '5px' }} height={15} width={15} color={"#CCCCCC"} />
              </div>

            </div>
          </div>
        </ChartWrapper>

        <VFModalCard
          openModal={hideChart}
          closeModal={() => toggleChart(false)}
          headerIcon=''
          headerText={tableTitle}
          headerBgColor=""
          headerTextColor="#00000"
          paddingLeftAndRight={27}
          closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
          <div className="ag-theme-planning" style={{ width: '1000px' }}>
            <VFTable
              ref={refGraph1}
              columnDefs={colDef}
              rowData={rowData}
              enableCharts={true}
              enableRangeSelection={true}
              rowSelection="multiple"
              statusBar={{
                statusPanels: [
                  { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
                  { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                  { statusPanel: 'agFilteredRowCountComponent', align: 'left' },
                  { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
                  { statusPanel: 'agAggregationComponent', align: 'left' },
                ],
              }} onGridReady={() => { setTableLoading(false); generateChart(graphType) }}
              chartToolPanelsDef={
                {
                  panels: []
                }
              }
              disableZoomScaling={true}
              defaultColDef={{
                floatingFilter: true,
                filter: "agMultiColumnFilter",
              }}
              chartThemes={['myCustomTheme']}
              customChartThemes={{
                'myCustomTheme': myCustomTheme()
              }}
              height={'480px'}
            />
          </div>
        </VFModalCard>
        <div style={{ height: `${chartHeight ? chartHeight : 50}vh` }}>
          <AgChartsReact suppressDragLeaveHidesColumns={true} ref={chartRef} options={{ ...options, data: data }} onChartReady={() => { setChartLoading(false) }} />
        </div>
      </SCChartContainer>
    </div>

  )
}

export default SplitGraphContainer