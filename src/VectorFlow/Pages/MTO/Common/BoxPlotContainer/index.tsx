import { AgChartOptions } from "ag-charts-community";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  SCChartContainer,
  SCChartMainContainer,
  SCHorizontalDivider,
  ChartWrapper,
  vChartHeight,
} from "./styles.css";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import VFTable from "../../Common/VFTable";
import { GridRef } from "../../../../../VectorFlow/types/MDM";
import Chart from "react-apexcharts";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface BoxPlotContainerProps {
  colDef: any;
  options?: AgChartOptions;
  data?: any;
  rowData: any;
  header: () => JSX.Element;
  graphTitle: string;
  tableTitle: string;
  tableLoading?: boolean;
  chartLoading?: boolean;
  setTableLoading: Dispatch<SetStateAction<boolean>>;
  setChartLoading: Dispatch<SetStateAction<boolean>>;
  hideChart: boolean;
  toggleChart: Dispatch<SetStateAction<boolean>>;
  TooltipRenderer?: (param: any) => string;
  graphType: number;
  date?: string;
  boxChartData?: any;
  boxChartOptions?: any;
  dateStr?: string;
  boxChartSeries?: any;
}

const BoxPlotContainer = ({
  colDef,
  rowData,
  header,
  graphTitle,
  tableTitle,
  setTableLoading,
  hideChart,
  dateStr,
  toggleChart,
  boxChartOptions,
  boxChartSeries,
}: BoxPlotContainerProps) => {
  const refGraph1 = useRef<GridRef>(null);

  return (
    <div style={{ width: "100%" }}>
      <div
        className={SCChartContainer}
        style={{
          border: "1px solid #CCCCCC",
          margin: "2px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "20px",
          ...assignInlineVars({
            [vChartHeight]: "100%",
          }),
        }}
      >
        <div className={SCChartMainContainer} style={{ zoom: 1 }}>
          {header()}
        </div>

        <hr className={SCHorizontalDivider} />
        <div className={ChartWrapper}>
          <div style={{ height: "100%", width: "100%" }}>
            <div
              className="title"
              style={{
                backgroundColor: "white",
                height: "40px",
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  textAlign: "center",
                  margin: "0 auto",
                  display: "flex",
                }}
              >
                <p>{graphTitle}</p>
                <p style={{ paddingLeft: "4px", fontWeight: 350 }}>{dateStr}</p>
              </div>
            </div>
          </div>
        </div>

        <VFModalCard
          openModal={hideChart}
          closeModal={() => toggleChart(false)}
          headerIcon=""
          headerText={tableTitle}
          headerBgColor=""
          headerTextColor="#00000"
          paddingLeftAndRight={27}
          closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
        >
          <div className="ag-theme-planning" style={{ width: "1000px" }}>
            <VFTable
              ref={refGraph1}
              columnDefs={colDef}
              rowData={rowData}
              enableCharts={true}
              enableRangeSelection={true}
              rowSelection="multiple"
              statusBar={{
                statusPanels: [
                  {
                    statusPanel: "agTotalAndFilteredRowCountComponent",
                    align: "left",
                  },
                  { statusPanel: "agTotalRowCountComponent", align: "left" },
                  { statusPanel: "agFilteredRowCountComponent", align: "left" },
                  { statusPanel: "agSelectedRowCountComponent", align: "left" },
                  { statusPanel: "agAggregationComponent", align: "left" },
                ],
              }}
              onGridReady={() => {
                setTableLoading(false);
              }}
              chartToolPanelsDef={{
                panels: [],
              }}
              disableZoomScaling={true}
              defaultColDef={{
                floatingFilter: true,
                filter: "agMultiColumnFilter",
                flex: 1,
              }}
              chartThemes={["myCustomTheme"]}
              height={"480px"}
            />
          </div>
        </VFModalCard>

        <div style={{ flex: 1, width: "100%" }}>
          <Chart
            options={boxChartOptions}
            type="boxPlot"
            height={"100%"}
            series={boxChartSeries}
          />
        </div>
      </div>
    </div>
  );
};

export default BoxPlotContainer;
