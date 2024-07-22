import { useEffect, useMemo, useState } from 'react';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { orderDataDropDown, deptwiseBMReportData } from './DeptWiseBMReportData';
import { ColDef, ColGroupDef, ColumnGroup } from "ag-grid-enterprise";

const RowGroupRenderer = (params: any) => {
    //console.log('Parekmkfv=', params)
    //  const {HeaderChildren} = HeaderChildren
    const [rowData, setRowData] = useState<any[]>();

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: "FG_Cod", headerName: 'FG Code', rowGroup: true, hide: true },
        { field: "Lvl", headerName: 'FG Code', rowGroup: true, hide: true },
        { field: "Rqrment", headerName: 'Requirement' },
        { field: "Stck", headerName: 'Stock' },
        { field: "WIP", headerName: 'WIP' },
        { field: 'Gp', headerName: 'Gap' }
    ]);

    // useEffect(() => {
    //     const data = deptwiseBMReportData.map(data => {
    //         return [...data.children]
    //     })
    //     console.log('children=', data)
    //     setRowData(data)
    // }, [])


    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 100,
            cellStyle: {
                textAlign: 'center'
            }
        };
    }, []);
    const autoGroupColumnDef = useMemo<ColDef>(() => {
        return {
            minWidth: 200,
        };
    }, []);

    const groupDisplayType = 'singleColumn';

    return (
        <div style={{ backgroundColor: 'white' }}>
            <VFTable
                className='child-grid'
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                autoGroupColumnDef={autoGroupColumnDef}
                groupDisplayType={groupDisplayType}
                rowData={params.data.children}
                height={'300px'}
            />
        </div>
    );
};

export default RowGroupRenderer;