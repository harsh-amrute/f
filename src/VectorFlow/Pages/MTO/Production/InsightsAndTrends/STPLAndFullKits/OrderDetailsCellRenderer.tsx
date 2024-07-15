import { GridOptions } from 'ag-grid-enterprise'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'
import RMMaterialCellRenderer from './RMMaterialCellRenderer';

const BarFillUI = (value: any) => {
    const val = value?.value || 0;
    return (
      <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
        <div>{val || 0}</div>
        <div style={{display: 'flex',minWidth: '100px', background: 'lightgray'}}>
          <div style={{height: '20px',backgroundImage: 'linear-gradient(to right, #8d2e61, #bb3f81, #db6ba7)',
                borderRadius:'2px', width: `${val}px`}}/>
        </div>
      </div>
    );
  };

  const CustomHeader = ({ headerName }: any) => {
    return (
      <div
        style={{
          fontFamily: "Roboto",
          background: "black",
          fontWeight: "500",
          fontSize: "14px",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        {headerName}
      </div>
    );
  };


const OrderDetailsCellRenderer = (params: any) => {
    
    const options: GridOptions<any> = {
        columnDefs: [
            {
                colId: "order_details",
                field: "order_details",
                headerName: "Order Details",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
                width: 300,
                headerComponent: () => <CustomHeader headerName="Order Details" />
            },
            {
                colId: "or_id",
                field: "or_id",
                headerName: "Order Id",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 400,
                cellRenderer: "agGroupCellRenderer"
            },
            {
                colId: "or_type",
                field: "or_type",
                headerName: "Order Type",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
            },
            {
                colId: "line_item_id",
                field: "line_item_id",
                headerName: "Line Item Id",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
            },
            {
                colId: "fg_code",
                field: "fg_code",
                headerName: " FG Code",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 200,
            },
            {
                colId: "fg_desc",
                field: "fg_desc",
                headerName: "FG Desc",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "order_quality",
                field: "order_quality",
                headerName: "Order Quality",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "quantity_manufacture",
                field: "quantity_manufacture",
                headerName: "Quantity Bal. to Mfg.",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "r_wip",
                field: "r_wip",
                headerName: "Release WIP In Days",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
            {
                colId: "fk",
                field: "fk",
                headerName: "Full Kit",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
                cellRenderer: (params: any) => <BarFillUI value={params?.value} />
            },
            {
                colId: "un_fk",
                field: "un_fk",
                headerName: "Unreleased Full Kit In Days",
                hide: false,
                autoHeaderHeight: true,
                wrapHeaderText: true,
                initialWidth: 300,
            },
        ],
        masterDetail: true,
        defaultColDef: {
            suppressMenu: true,
            cellStyle: {
                textAlign: "center"
            },
            flex: 1
        },
        detailCellRendererParams: {
            innerHeight: 400,
          },
        detailCellRenderer: RMMaterialCellRenderer,
    }


    return (
        <div style={{ padding: "2rem" }}>
            <VFTable
                className='child-grid'
                pagination={true}
                gridOptions={options}
                rowData={params.data?.children}
                height={"400px"}
                disableZoomScaling={true}
                onGridReady={(params: any) => {
                    params.columnApi.autoSizeAllColumns()
                }}
            />
        </div>
    )
}

export default OrderDetailsCellRenderer;