

import { forwardRef} from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { VFTableWrapper } from "../../../../../components/VectorFLOW/commons/VFTable/styles";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"
import './styles.css'


interface VFTableProps extends AgGridReactProps {
  height?:number,
  disableZoomScaling?:boolean
}


const CustomVFTable = forwardRef((props: VFTableProps, ref: any) => {


  return (
    <VFTableWrapper className="ag-theme-material" role={"table"} height={props.height}  disableZoomScaling={props.disableZoomScaling}>
      <AgGridReact
        ref={ref}
        {...props}
      />
    </VFTableWrapper>
  );
});

export default CustomVFTable;
