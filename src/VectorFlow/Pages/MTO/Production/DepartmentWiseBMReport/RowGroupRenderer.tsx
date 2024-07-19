import { useEffect, useMemo, useState } from 'react';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { orderDataDropDown, deptwiseBMReportData } from './DeptWiseBMReportData';
import { ColDef, ColGroupDef, ColumnGroup } from "ag-grid-enterprise";

const RowGroupRenderer = (params: any) => {
    console.log('Parekmkfv=', params)
    //  const {HeaderChildren} = HeaderChildren
    const [rowData, setRowData] = useState<any[]>(/*[
        { "FG_Cod": "A123", "Lvl": "Level 1", "Rqrment": "Requirement 1", "Stck": 100, "WIP": 50, "Gp": 50 },
        { "FG_Cod": "A123", "Lvl": "Level 2", "Rqrment": "Requirement 2", "Stck": 150, "WIP": 70, "Gp": 80 },
        { "FG_Cod": "B456", "Lvl": "Level 1", "Rqrment": "Requirement 3", "Stck": 120, "WIP": 60, "Gp": 60 },
        { "FG_Cod": "B456", "Lvl": "Level 2", "Rqrment": "Requirement 4", "Stck": 90, "WIP": 30, "Gp": 60 }
    ]*/
    );

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: "FG_Cod", rowGroup: true, hide: true },
        { field: "Lvl", rowGroup: true, hide: true },
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
                //className='child-grid'
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