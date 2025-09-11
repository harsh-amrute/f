import { TableWrapper } from "../UserURLsDrawer/styles"
import VFTable from "../../VectorFLOW/commons/VFTable"

const ErrorPermissions = (props: any) => {

    const {rowData , columnDefs} = props;

    return (
      <>
         <TableWrapper>
            <VFTable
                defaultColDef={{
                    flex:1,
                    cellStyle:{ 'text-align':'center' }
                }}
                rowHeight={50}
                height="600px"
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </TableWrapper>
      </>
    );
  };
  
  export default ErrorPermissions;