import { forwardRef} from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper } from "./styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";


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
