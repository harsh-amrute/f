import { GridOptions } from "ag-grid-enterprise";
import VFTable from "../../../Common/VFTable";
import { VFTableWrapper } from "../../../../../../components/VectorFLOW/commons/VFTable/styles.css";

const DayWiseCoverageDetailsCellRenderer = (params: any) => {

    const options: GridOptions<any> = {
        sideBar: false,
        columnDefs: params?.colDef || [],
        defaultColDef: {
            flex:1,
            suppressMenu: true,
            cellStyle: {
                textAlign: "center"
            }
        },
    }


  return (
    // <div>{params.data.status}</div>
    <div
      className={`${VFTableWrapper} `}
      style={{ padding: "1rem"}}
    >
      <h4
        style={{ margin: "0px", padding: "0.25rem 0rem 1rem 2rem", fontSize: "1.2rem" }}
      >
        Raw Material Details
      </h4>
      <VFTable
        className="child-grid"
        pagination={true}
        gridOptions={options}
        rowData={params.data?.children}
        height={"470px"}
        rowHeight={35}
        disableZoomScaling={true}
        onGridReady={(params: any) => {
          params?.api?.autoSizeAllColumns();
        }}
        tooltipShowDelay={500}
      />
    </div>
  );
};

export default DayWiseCoverageDetailsCellRenderer;
