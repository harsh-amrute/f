import VFModalCard from "../VFModalCard";
import VFTable from "../../../../VectorFlow/Pages/MTO/Common/VFTable";
import './styles.css'
import VFButtonOutline from "../VFButtonOutline";
import { useUserData } from "../../../../context";
import { SideBarDef } from 'ag-grid-enterprise';


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
        chartType,
        downloadName,
        gridSpecificChartOptions
    } = props;


    const {user} = useUserData()
    const theme_ui = user.user.theme_ui

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

    const handleExportExcel = () => {
        gridRef?.current?.api?.exportDataAsExcel({
            fileName: downloadName || 'export.xlsx', 
        });
    };

    const sideBar:SideBarDef = {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
                suppressPivots: true,
                suppressPivotMode: true,
                suppressRowGroups: true,
                suppressValues: true,
              },
          },
        ],
        defaultToolPanel:'',
      }

  

    return (
        <>

        <VFModalCard openModal={hideChart} closeModal={()=>setHideChart(false)} headerIcon='' headerText={title} headerBgColor="white" headerTextColor="black" paddingLeftAndRight={27} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}>

        <div className="ag-theme-planning" style={{width:'1000px'}}>
    
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }} id="exportExcel">
            <VFButtonOutline 
                onClick={handleExportExcel} 
                themeUi={theme_ui}  
                style={{ fontSize: '12px', height: '30px', marginTop: '10px', display: 'flex', alignItems: 'center', gap:'10px', paddingLeft:'10px' }} // Added flex and alignItems
            >
            <img 
                src={
                    theme_ui === "REGALBLAZE"
                    ? "/assets/img/VectorFLOW/BPR/excel-regal.svg"
                    : "/assets/img/VectorFLOW/BPR/excel.svg"
                }
                alt="Export Icon" 
                style={{ width: '14px', height: '14px', }} 
            />
             Excel Export
             </VFButtonOutline>
        </div>

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
                sideBar={sideBar}
            />
        </div>
    </VFModalCard>

</>
    )
}


export default VFChartsTable