import { useUserData } from "../../../../../context";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFTable from "../../../../../components/VectorFLOW/commons/VFTable";
import {
  MasterDetailHeader,
  MasterDetailHeaderWrapper,
  MasterDetailWrapper,
} from "./styles.css";
import ColorCellRenderer from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/ColorCellRenderer";


const MasterDetail = (params: any) => {
  // {
  //     "skucode": "CFHSPL48IVY1S",
  //     "SKUDescription": "HIGH SPEED PLUS 1.2M IVY 1S",
  //     "InTransitQty": 50,
  //     "PhysicalInventoryColor": "Red"
  //   }
  const { onContactDetails } = params;
  const { user } = useUserData();
  const theme_ui = user.user.theme_ui;
  // useEffect(()=>{
  //     return () => {
  //         if (!params.api.isDestroyed()) {
  //           params.api.removeDetailGridInfo(params.rowId);
  //         }
  //       };
  // },[])
  return (
    <div className={MasterDetailWrapper}>
      <div className={MasterDetailHeaderWrapper}>
        <p className={MasterDetailHeader}>SKU Details</p>
        <VFButtonOutline
          themeUi={theme_ui}
          onClick={() => onContactDetails(params.data)}
        >
          Contact Details
        </VFButtonOutline>
      </div>

      <div className="ag-theme-intranist" style={{ height: "100%" }}>
        <VFTable
          height={"100%"}
          disableZoomScaling
          columnDefs={[
            {
              field: "SKUCode",
              colId: "SKUCode",
              headerName: "SKU Code",
            },
            {
              field: "SKUDescription",
              colId: "SKUDescription",
              headerName: "SKU Description",
            },
            {
              field: "InTransitQty",
              colId: "InTransitQty",
              headerName: "Quantity",
            },
            {
              field: "PhysicalInventoryColor",
              colId: "PhysicalInventoryColor",
              headerName: "On Hand Inventory",
              cellRenderer: "colorCellRenderer",
            },
          ]}
          defaultColDef={{
            cellStyle: {
              "text-align": "center",
              fontSize: "14px",
            },
            headerClass: "intransit_header",

            flex: 1,
          }}
          components={{
            colorCellRenderer: ColorCellRenderer,
          }}
          pagination
          paginationPageSize={10}
          rowData={params.data.skuDetails}
        />
      </div>
    </div>
  );
};

export default MasterDetail;
