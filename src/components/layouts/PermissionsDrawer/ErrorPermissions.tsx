import { tableWrapper } from "../UserURLsDrawer/styles.css"
import VFTable from "../../VectorFLOW/commons/VFTable"
import { AgGridReactProps } from 'ag-grid-react';

const ErrorPermissions = (props: any) => {

    const {rowData , columnDefs} = props;

const agGridProps:AgGridReactProps = {
  tooltipShowDelay:0,
  tooltipTrigger:'hover',
}
    return (
      <>
         <div className={tableWrapper}>
            <VFTable
                defaultColDef={{
                    flex:1,
                    cellStyle:{ 'text-align':'center' }
                }}
                rowHeight={50}
                height="600px"
                rowData={rowData}
                columnDefs={columnDefs}
                {...agGridProps}
            />
        </div>
      </>
    );
  };
  
  export default ErrorPermissions;