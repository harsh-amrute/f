import React, { useState } from 'react';
import {
    BPRDailyAnalyticsWrapper,
    BPRDailyAnalyticsContainer,
    BPRDailyAnalyticsHeader,
    BPRDailyAnalyticsTableContainer,
    BPRDailyAnalyticsTableHeader
} from './styles';

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';

interface IRow {
    "":string
    No_of_Order: number;
    No_of_Cust: number;
    Total_Ord_val: number;
}

const AnalyticalScreen = () => {

    const [rowData, setRowData] = useState<IRow[]>([
        { "": "Black", No_of_Order: 234, No_of_Cust: 938, Total_Ord_val: 64 },
        { "": "Red", No_of_Order: 123, No_of_Cust: 950, Total_Ord_val: 43 },
        { "": "Red", No_of_Order: 231, No_of_Cust: 462, Total_Ord_val: 44 },
        { "": "Red", No_of_Order: 102, No_of_Cust: 331, Total_Ord_val: 90 },
        { "": "Red", No_of_Order: 107, No_of_Cust: 189, Total_Ord_val: 84 },
    ]);

    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: "" },
        { field: "No_of_Order" },
        { field: "No_of_Cust" },
        { field: "Total_Ord_val" },
    ]);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    return (
        <BPRDailyAnalyticsWrapper>
            <BPRDailyAnalyticsContainer>
                <BPRDailyAnalyticsHeader>
                    Analytics
                </BPRDailyAnalyticsHeader>

                <BPRDailyAnalyticsTableContainer>
                    {
                        colDefs.map((colDef: ColDef) => {
                            return (
                                <BPRDailyAnalyticsTableHeader>
                                    {colDef.field}
                                </BPRDailyAnalyticsTableHeader>
                            )
                        })
                    }
                    {/* <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                    /> */}
                    {/* <VFTable
                        columnDefs={colDefs}
                        rowData={rowData}
                        tooltipHideDelay={100000}
                        tooltipShowDelay={0}
                        tooltipMouseTrack={true}
                    /> */}

                </BPRDailyAnalyticsTableContainer>

            </BPRDailyAnalyticsContainer>
        </BPRDailyAnalyticsWrapper>
    )
}

export default AnalyticalScreen