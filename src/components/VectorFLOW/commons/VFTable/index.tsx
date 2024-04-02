import { forwardRef} from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper } from "./styles";

import { AG_GRID_KEY } from "../../../../helpers/constants";
import { LicenseManager } from "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";

LicenseManager.setLicenseKey(AG_GRID_KEY);


const VFTable = forwardRef((props: AgGridReactProps, ref: any) => {
 
  return (
    <VFTableWrapper className="ag-theme-alpine" role={"table"}>
      <AgGridReact
        ref={ref}
        {...props}
      />
    </VFTableWrapper>
  );
});

export default VFTable;
