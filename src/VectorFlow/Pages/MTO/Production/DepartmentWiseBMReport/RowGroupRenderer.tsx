import { useEffect, useMemo, useState } from 'react';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { ColDef, GridOptions, IDetailCellRendererParams } from "ag-grid-enterprise";

interface CustomColDef extends ColDef {
    field: string;
    headerName: string;
    cellRenderer?: string;
}

// Define the default column definition interface
interface CustomDefaultColDef {
    flex: number;
}

// Define the grid options interface
interface CustomGridOptions extends GridOptions {
    columnDefs: CustomColDef[];
    defaultColDef: CustomDefaultColDef;
    groupDefaultExpanded?: number;
    masterDetail?: boolean;
    detailRowHeight?: number;
    //detailCellRendererParams?: CustomDetailCellRendererParams; // Optional for nested grids
}

// Define the detail cell renderer parameters interface
// interface CustomDetailCellRendererParams extends IDetailCellRendererParams {
//     detailGridOptions: CustomGridOptions;
//     getDetailRowData: (params: {
//         data: any;
//         successCallback: (rows: any[]) => void;
//         failCallback?: () => void;
//     }) => void;
// }
const RowGroupRenderer = (params: any) => {
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState<any[]>(params.data.children)

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: "FG_Cod", headerName: 'FG Code', cellRenderer: "agGroupCellRenderer" },
        { field: "Lvl", headerName: 'Level', },
        { field: "Rqrment", headerName: 'Requirement' },
        { field: "Stck", headerName: 'Stock' },
        { field: "WIP", headerName: 'WIP' },
        { field: 'Gp', headerName: 'Gap' }
    ]);

    // const detailCellRendererParams = useMemo<any>(() => {
    //     return {
    //       // level 2 grid options
    //   detailGridOptions: {
    //     columnDefs: [
    //         { field: "FG_Cod", headerName: 'FG Code', cellRenderer: "agGroupCellRenderer" },
    //         { field: "Lvl", headerName: 'Level', },
    //         { field: "Rqrment", headerName: 'Requirement' },
    //         { field: "Stck", headerName: 'Stock' },
    //         { field: "WIP", headerName: 'WIP' },
    //         { field: 'Gp', headerName: 'Gap' },
    //     ],
    //     defaultColDef: {
    //       flex: 1,
    //     },
    //     groupDefaultExpanded: 1,
    //     masterDetail: true,
    //     detailRowHeight: 240,
    //     detailCellRendererParams: {
    //       // level 3 grid options
    //       detailGridOptions: {
    //         columnDefs: [
    //             { field: "FG_Cod", headerName: 'FG Code', cellRenderer: "agGroupCellRenderer" },
    //             { field: "Lvl", headerName: 'Level', },
    //             { field: "Rqrment", headerName: 'Requirement' },
    //             { field: "Stck", headerName: 'Stock' },
    //             { field: "WIP", headerName: 'WIP' },
    //             { field: 'Gp', headerName: 'Gap' },
    //         ],
    //         defaultColDef: {
    //           flex: 1,
    //         },
    //       },
    //       getDetailRowData: (params) => {
    //         params.successCallback(params.data.children);
    //       },
    //     } as IDetailCellRendererParams,
    //   },
    //   getDetailRowData: (params) => {
    //     params.successCallback(params.data.children);
    //   },
    //     } as IDetailCellRendererParams;
    //   }, []);

    const generateGridOptions = (level: number): CustomGridOptions => {
        const options: CustomGridOptions = {
            columnDefs: [
                { field: "FG_Cod", headerName: 'FG Code', cellRenderer: "agGroupCellRenderer" },
                { field: "Lvl", headerName: 'Level' },
                { field: "Rqrment", headerName: 'Requirement' },
                { field: "Stck", headerName: 'Stock' },
                { field: "WIP", headerName: 'WIP' },
                { field: 'Gp', headerName: 'Gap' },
            ],
            defaultColDef: {
                flex: 1,
            },
        };

        if (level > 1) {
            options.groupDefaultExpanded = 0;
            options.masterDetail = true;
            //options.detailRowHeight = 240;
            options.detailRowAutoHeight = true
            options.detailCellRendererParams = {
                detailGridOptions: generateGridOptions(level - 1),
                getDetailRowData: (params) => {
                    params.successCallback(params.data.children);
                },
            } as IDetailCellRendererParams;
        }

        return options;
    };

    // UseMemo to create detailCellRendererParams based on the level
    const detailCellRendererParams = useMemo(() => {
        const level = 12; // Set the starting level here
        return {
            detailGridOptions: generateGridOptions(level),
            getDetailRowData: (params) => {
                params.successCallback(params.data.children);
            },
        } as IDetailCellRendererParams;
    }, []);


    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            gridOptions: {
                rowHeight: 50,
                getRowStyle: (params: any) => {
                    return {
                        background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                    };
                },
            },
            cellStyle: {
                'text-align': 'center',
                //'height': '50px',
                "font-size": "18px",
                "font-family": "Roboto",
                'white-space': 'nowrap',
                'resizable': 'true',
                'color': '#000'
            },
        };
    }, []);

    return (
        <div style={containerStyle}>
            <VFTable
                rowData={rowData}
                detailRowHeight={3000}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                groupDefaultExpanded={0}
                masterDetail={true}
                detailCellRendererParams={detailCellRendererParams}
                height={'90%'}
                disableZoomScaling
            />
        </div>
    );
};
export default RowGroupRenderer;