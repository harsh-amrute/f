
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import RetailActionToolBar from "../../../../../../components/layouts/RetailActionToolBar";
import { useUserData } from "../../../../../../context";
import useApproval from "./useApproval";
import "../styles.css";


const Approval = ({ view, setView }: any) => {
  const { MCGridColumnDefs, McGridRowData, gridOptions, agGridProps } = useApproval();
  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  console.log(setView)

  return (
    <>
      <RetailActionToolBar
        themeUi={themeUi}
        view={view}
        currentStatus={"Edit"}
        handleSubmitButton={() => console.log("")}
        handleOnCancel={() => console.log("")}
        handleSelectChange={() => console.log("")}
        onViewChange={(view:string) => {console.log(view);setView(view)}}
        onCallBack={() => console.log("")}
      />

      <div className="ag-theme-mcgrid">
        <VFTable
          {...agGridProps}
          columnDefs={MCGridColumnDefs}
          rowData={McGridRowData}
          suppressRowClickSelection={true}
          gridOptions={gridOptions}
          enableRangeSelection={true}
          pagination={true}
          rowSelection="multiple"
          statusBar={{
            statusPanels: [
              { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
              { statusPanel: "agTotalRowCountComponent", align: "left" },
              { statusPanel: "agFilteredRowCountComponent", align: "left" },
              { statusPanel: "agSelectedRowCountComponent", align: "left" },
              { statusPanel: "agAggregationComponent", align: "left" }
            ]
          }}
          height={"400px"}
          disableZoomScaling={true}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: "space-between" }}>
        <div
          style={{
            border: "1px solid #C2C2C2",
            width: "270px",
            height: "35px",
            borderRadius: "20px",
            marginLeft: "20px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <img
            src={
              themeUi === "REGALBLAZE"
                ? "/assets/img/VectorFLOW/BPR/bulb_icon_yellow.svg"
                : "/assets/img/VectorFLOW/BPR/bulb_icon.svg"
            }
            style={{ paddingLeft: "10px" }}
            height={28}
            width={28}
          />
          <p
            style={{
              paddingLeft: "10px",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "Roboto"
            }}
          >
            Loss Of Sale Prevented
          </p>
          <p
            style={{
              color: themeUi === "REGALBLAZE" ? "#c7810e" : "#BC3D81",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "Roboto",
              paddingLeft: "7px"
            }}
          >
            100 / 129
          </p>
        </div>

        <div style={{ marginRight: '20px' }}>
          {/* <VFButton onClick={() => setView('chart')} themeUi={themeUi} disabled={false}>
            Go Back
          </VFButton> */}
        </div>
      </div>
    </>
  );
};

export default Approval;
