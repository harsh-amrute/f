import VFModalCard from "../VFModalCard";
import VFTable from "../VFTable";
import { generateGridSpecificChartFromChartProps } from '../../../../helpers/utils'
import { useEffect, useState } from "react";

const VFChartsTable = (props:any)=>{
    const {
        title,
        hideChart,
        gridRef,
        colDefs,
        rowData,
        chartProps,
        setHideChart,
        defaultColForCustomGraph,
        palette,
        chartType
    } = props;

    const [gridSpecificChartOptions,setGridSpecificChartOptions] = useState<any>(undefined)

    useEffect(()=>{
        if(chartProps!==undefined){
            setGridSpecificChartOptions(generateGridSpecificChartFromChartProps(chartProps))
        }
    },[chartProps])

    
    const generateChartInGridTable = () =>{
        gridRef?.current?.api?.createRangeChart({
            chartType:chartType,
            cellRange: {
            columns: defaultColForCustomGraph.columns,
            rowStartIndex:defaultColForCustomGraph.start,
            rowEndIndex:defaultColForCustomGraph.end
            }
        })
    }

    const myCustomTheme = {
        palette
    }

    const getChartToolbarItems:any = () => ['chartDownload'];

    return (
        <VFModalCard openModal={hideChart} closeModal={()=>setHideChart(false)} headerIcon='' headerText={title} headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>
        <div className="ag-theme-planning" style={{width:'1000px'}}>
            <VFTable
                ref={gridRef}
                columnDefs={colDefs}
                rowData={rowData}
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
                  }}                                        
                onGridReady={()=>generateChartInGridTable()}
                getChartToolbarItems={getChartToolbarItems}
                chartToolPanelsDef={
                    {
                        panels:[]
                    }
                }
                
                chartThemeOverrides={gridSpecificChartOptions}
                chartThemes={['myCustomTheme']}
                customChartThemes={{
                    'myCustomTheme':myCustomTheme
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
    )
}


export default VFChartsTable