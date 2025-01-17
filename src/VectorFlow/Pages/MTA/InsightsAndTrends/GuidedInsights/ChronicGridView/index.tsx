import GridViewTable from "../../../SupplyChainIntelligenceHub/Planning/GridView/GridViewTable";
import { AgGridReactProps } from "ag-grid-react";
interface ChronicGridViewProps {
    currentGridData:any
}
const ChronicGridView=({currentGridData}:ChronicGridViewProps)=>{

  const sideBarForChronicGrid = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        // toolPanelParams: {},
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ],
    defaultToolPanel:'',
    }
    
    const agGridProps:AgGridReactProps = {
        

      paginationPageSize:parseInt(process.env.REACT_APP_GUIDEDINSIGHT_ROWS_PER_PAGE || '50'),

        suppressRowTransform:true,
        tooltipShowDelay:0.3,
        tooltipTrigger:'focus',
        tooltipInteraction:true,
        readOnlyEdit:true,
        gridOptions:{
            sideBar:sideBarForChronicGrid,
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },     
        },
       enableRangeSelection:true,
       rowSelection:"multiple",
       statusBar :{
           statusPanels: [
             { statusPanel: 'agTotalAndFilteredRowCountComponent', align:'left' },
             { statusPanel: 'agTotalRowCountComponent', align:'left' },
             { statusPanel: 'agFilteredRowCountComponent', align:'left' },
             { statusPanel: 'agSelectedRowCountComponent', align:'left' },
             { statusPanel: 'agAggregationComponent', align:'left' },
           ],
         },
        pagination:true,
        suppressRowClickSelection:true,

        defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
           
            
            cellDataType:false,
            resizable:false,
            cellStyle:{
                "flex":1,
                'text-align':'center',
                'height':'50px',
                "font-style":"normal",
                " font-variant":"normal",
                " font-weight":"300",
                " font-size":"20px",
                " font-family":"Roboto",
                "display":"block",
                'text-overflow':'ellipsis',
                'white-space':'nowrap'
            },
        }
    }
    const PlanningColumns=[
    
    {colId:"skucode",
      field:"skucode",
      headerName:"skucode",enablePivot:true},
    {colId:"location",
      field:"location",
      headerName:"location", enablePivot:true,
    rowGroup: true
    },
    {colId:"skudesc",
      field:"skudesc",
      headerName:"skudesc", enablePivot:true},
    {colId:"parentloc",
      field:"parentloc",
      headerName:"parentloc",  enablePivot:true},
    {colId:"RLT",
      field:"RLT",
      headerName:"RLT", enablePivot:true},
    {colId:"BlackRedAgeing",
      field:"BlackRedAgeing",
      headerName:"BlackRedAgeing",  enablePivot:true},
    {colId:"Executive",
      field:"Executive",
      headerName:"Executive",  enablePivot:true},
    {colId:"Techcolor",
      field:"Techcolor",
      headerName:"Techcolor",  enablePivot:true},
    {colId:"ExecutiveEco",
      field:"ExecutiveEco",
      headerName:"ExecutiveEco",  enablePivot:true},
     {colId:"ecocolor",
      field:"ecocolor",
      headerName:"ecocolor",  enablePivot:true},
     {colId:"RationedStockatparent",
      field:"RationedStockatparent",
      headerName:"RationedStockatparent",  enablePivot:true}
    ]

    return <GridViewTable agGridProps={agGridProps} agGridColDefs={PlanningColumns} agGridRowData={currentGridData} customGridRowData={[]} customGridColDef={[]} isSubGridOpen={false} currentCategory={"GuidedInsightchronicunavailability"} currentTab={''} gridHeight={'95%'}/>
    
   
}
export default ChronicGridView