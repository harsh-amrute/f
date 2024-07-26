import { GridOptions } from "ag-grid-enterprise";
import { useEffect, useState } from "react";
import ColorCellRenderer from "../../../Common/ColorCellRenderer";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import CustomGroupCellRenderer from "./CustomGroupCellRenderer";
import DayWiseCoverageDetailsCellRenderer from "./DayWiseCoverageDetailsCellRenderer";
import { tableData } from "./table_data";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";

// interface IDayWiseCoverageProps {
//     selectedDate?: string,
// }

// const DayWiseCoverageTable = ({
//     selectedDate,
// }: IDayWiseCoverageProps) => {

const DayWiseCoverageTable = () => {
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

  const [HeaderData, setHeaderData] = useState([{}]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()

  const reportName = "DayWiseCoverage";

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
  }, [])



  const options: GridOptions<any> = {
    getRowStyle: (params: any) => {
      return {
        background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7",
      };
    },
    columnDefs: colDef,
    defaultColDef: {
      suppressMenu: true,
    },
    autoGroupColumnDef: {
      headerName: "Group",
      cellRenderer: CustomGroupCellRenderer,
      suppressMenu: true,
      initialWidth: 220,
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
      height={"450px"}
      disableZoomScaling={true}
      columnDefs={options.columnDefs}
      rowData={tableData.data}
      pagination={true}
      onGridReady={(params: any) => {
        params.columnApi.autoSizeAllColumns();
      }}
    />
  );
};

export default DayWiseCoverageTable;
