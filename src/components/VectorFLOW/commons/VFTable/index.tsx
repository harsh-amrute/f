import { forwardRef } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper } from "./styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './styles.css'


interface VFTableProps extends AgGridReactProps {
  height?: number,
  disableZoomScaling?: boolean
}


const VFTable = forwardRef((props: VFTableProps, ref: any) => {


  return (
    <VFTableWrapper
      className="ag-theme-alpine"
      role={"table"}
      height={props.height}
      disableZoomScaling={props.disableZoomScaling}>
      <AgGridReact
        ref={ref}
        {...props}
        suppressDragLeaveHidesColumns={true}
      />
    </VFTableWrapper>
  );
});

export default VFTable;
