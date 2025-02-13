import { useState, useRef } from 'react';
import { SCChartContainer, SCHorizontalDivider} from '../../../../../../components/VectorFLOW/commons/VFCharts/styles';
import VFChartTable from '../../../../../../components/VectorFLOW/commons/VFChartsTable'
import { GridRef } from '../../../../../../VectorFlow/types/MDM';
import { VFChartsHeader } from "../../../../../../components/VectorFLOW/commons/VFCharts";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";

const defaultStyles = {
  headerZoom:1,
  headerContainerHeight:'60px',
  agChartHeight:'80%'
}

const PieChartandGrid = (props:any) => {

    const {
      chartParams,
      height,
      colDefs,
      rowData,
      chartProps,
      containerStyle
  } = props;

    const [hideChart,setHideChart] = useState<boolean>(false)
    //const [chartId, setChartId] = useState<any>("");

    const getChartToolbarItems:any = () => ['chartDownload'];

    const gridRef = useRef<GridRef>()
    const chartRef = useRef<any>(null)
    const [isHovered, setIsHovered] = useState(false);
    const imgSrc = isHovered
    ? '/assets/img/downlod-icon-hover.svg'
    : '/assets/img/downlod-icon.svg';

    const generateChart = () =>{
      const container2 = document.getElementById("g3") as HTMLElement;
      chartRef.current?.api.createRangeChart({
        chartType: "pie",
        cellRange: {
          columns: ["suggestion", "count"],
          rowStartIndex: 0,
          rowEndIndex: 9,
        },
        chartContainer: container2,
      });
    }


  const {palette, chartType, defaultColForChart, graphInfo, title, customizedStyles=defaultStyles, downloadName } = chartParams

  return (
    <SCChartContainer height={"98%"} style={{ marginLeft: "18px" }}>

      <VFChartsHeader hideChart={hideChart} styles={customizedStyles} graphInfo={graphInfo} setHideChart={setHideChart} title={title}  />


      <SCHorizontalDivider />


        <div style={{ display: "none" }}>
          <VFTable 
            ref={chartRef}
            columnDefs={colDefs}
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
            onFirstDataRendered={() => generateChart()}
            getChartToolbarItems={getChartToolbarItems}
            chartToolPanelsDef={{
              panels: [],
            }}
            defaultColDef={{
              floatingFilter: true,
              filter: "agMultiColumnFilter",
            }}
            chartThemeOverrides={chartProps}
            chartThemes={["myCustomTheme"]}
            customChartThemes={{
              myCustomTheme: {palette},
            }}
            height={"470px"}
          />
      </div>
      <div id="g3" style={{ height: "80%" }}></div>

      <VFChartTable
          chartType={chartType} 
          downloadName={downloadName} 
          palette={palette} 
          title={title} 
          defaultColForCustomGraph={defaultColForChart} 
          setHideChart={setHideChart} 
          hideChart={hideChart} 
          gridRef={gridRef} 
          colDefs={colDefs} 
          rowData={rowData} 
          chartProps={chartProps}
          gridSpecificChartOptions={chartProps}
          />

    </SCChartContainer>
  );
};


export default PieChartandGrid