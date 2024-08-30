import { GridOptions } from "ag-grid-enterprise";
import { useEffect, useState } from "react";
import ColorCellRenderer from "../../../Common/ColorCellRenderer";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import CustomGroupCellRenderer from "./CustomGroupCellRenderer";
import DayWiseCoverageDetailsCellRenderer from "./DayWiseCoverageDetailsCellRenderer";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import { useGetDayWiseCoverageData } from "../../../../../../VectorFlow/Services/MTO/Procurement/DayWiseCoverage";

interface IDayWiseCoverageProps {
  selectedDate: string,
  startDate: string,
  endDate: string,
  setLoading: any
}

const DayWiseCoverageTable = ({
  selectedDate,
  startDate,
  endDate,
  setLoading,
}: IDayWiseCoverageProps) => {
  const colDefCustomizations = {
    ColorPriority: {
      cellRenderer: (params: any) => {
        if (params.node.group) {
          return null;
        }
        return ColorCellRenderer(params);
      },
    },
    Status: {
      hide: true,
      rowGroup: true,
    },
  };
  // const extra = [
  //   {
  //       headerName: "Action",
  //       cellRenderer: () => <div>Hello</div>,
  //       position: 0
  //   }
  // ]

  const reportName = "DayWiseCoverage";
  const [HeaderData, setHeaderData] = useState([{}]);
  const [rowData, setRowData] = useState([]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData();
  const { mutateAsync: getData, isLoading: isGridLoading } = useGetDayWiseCoverageData();

  const getGridData = async () => {
    if (selectedDate) {
      const data = await getData({ startDate: startDate, endDate: endDate, plannedReleaseDate: selectedDate });
      setRowData(data?.data?.data)
    }
  }

  useEffect(() => {
    getGridData()
  }, [selectedDate])

  useEffect(() => {
    setLoading(isGridLoading)
  }, [isGridLoading])


  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setColumnDef();
  }, [])

  const [colDef, setColDef] = useState([{}]);

  useEffect(() => {
    setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
  }, [HeaderData]);






  const options: GridOptions<any> = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7",
      };
    },
    columnDefs: colDef,
    defaultColDef: {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true,
      cellStyle: {
        display: "flex",
      }
    },
    autoGroupColumnDef: {
      headerName: "Group",
      cellRenderer: CustomGroupCellRenderer,
      suppressMenu: true,
      initialWidth: 260,
    },
    masterDetail: true,
    detailCellRendererParams: {
      innerHeight: 400,
    },
    detailCellRenderer: DayWiseCoverageDetailsCellRenderer,
    detailRowAutoHeight: true,
    sideBar: {
      toolPanels: ["columns"],
    },
  };

  return (


    <VFTable
      animateRows={true}
      gridOptions={options}
      height={"400px"}
      disableZoomScaling={true}
      columnDefs={options.columnDefs}
      rowData={rowData}
      // pagination={true}
      onGridReady={(params: any) => {
        params.columnApi.autoSizeAllColumns();
      }}
    />

  );
};

export default DayWiseCoverageTable;
