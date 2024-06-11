import React, { useState } from 'react';
import {
    BPRDailyAnalyticsHeader,
    BPRDailyAnalyticsContainer,
    BPRDailyAnalyticsTableCell,
    BPRDailyAnalyticsTableContainer,
    BPRDailyAnalyticsTableHeader,
    BPRDailyAnalyticsTableHeaderContainer,
    BPRDailyAnalyticsTableRow,
    BPRDailyAnalyticsTableRowContainer,
    BPRDailyAnalyticStatusBar,
    BPRDailyAnalyticsWrapper,
    BPRDailyAnalyticStatusBarSection,
    BPRDailyAnalyticsTableCellText
} from './styles';
import { useSelector } from 'react-redux';
import { ColDef } from "ag-grid-community";
import { RootState } from '../../../../../redux/store/store';


interface IRow {
    "": string
    No_of_Order: number;
    No_of_Cust: number;
    Total_Ord_val: number;
}
interface BPRDailyAnalyticsProps {
    colDefs: ColDef[]
}

const AnalyticalScreen = (props: BPRDailyAnalyticsProps) => {
    //AnalyticsData
    const options = useSelector((state: RootState) => state.mto.AnalyticsData);
    console.log('anaytical=', options)
    // const [rowData, setRowData] = useState<IRow[]>([

    // ]);
    const {
        colDefs
    } = props;
    const [rowData] = useState<IRow[]>([
        { "": "Black", No_of_Order: 234, No_of_Cust: 938, Total_Ord_val: 64 },
        { "": "Red", No_of_Order: 123, No_of_Cust: 950, Total_Ord_val: 43 },
        { "": "Red", No_of_Order: 231, No_of_Cust: 462, Total_Ord_val: 44 },
        { "": "Red", No_of_Order: 102, No_of_Cust: 331, Total_Ord_val: 90 },
        { "": "Red", No_of_Order: 107, No_of_Cust: 189, Total_Ord_val: 84 },
    ])

    // const [colDef, setColDefs] = useState<ColDef<IRow>[]>([
    //     { field: "" },
    //     { field: "No_of_Order" },
    //     { field: "No_of_Cust" },
    //     { field: "Total_Ord_val" },
    // ]);

    // const defaultColDef: ColDef = {
    //     flex: 1,
    // };

    return (
        <BPRDailyAnalyticsWrapper>
            <BPRDailyAnalyticsContainer>
                <BPRDailyAnalyticsHeader>
                    Analytics
                </BPRDailyAnalyticsHeader>
                <BPRDailyAnalyticsTableContainer>
                    <BPRDailyAnalyticsTableHeaderContainer>
                        {
                            colDefs.map((colDef: ColDef) => {
                                if (colDef.colId === 'color') {
                                    return (
                                        <BPRDailyAnalyticsTableHeader style={{ width: 25 }} />
                                    )
                                }
                                return (
                                    <BPRDailyAnalyticsTableHeader>
                                        {colDef.headerName}
                                    </BPRDailyAnalyticsTableHeader>
                                )
                            })
                        }
                    </BPRDailyAnalyticsTableHeaderContainer>
                    <BPRDailyAnalyticsTableRowContainer>
                        {rowData.map((row: any) => {
                            return (
                                <BPRDailyAnalyticsTableRow>
                                    {Object.keys(row).map((key: string) => {
                                        if (key === 'color') {
                                            return (
                                                <BPRDailyAnalyticsTableCell
                                                    style={{
                                                        backgroundColor: row[key],
                                                        width: 60, boxShadow: "0px 3px 12px #AFAFAF"
                                                    }}
                                                />
                                            )
                                        }
                                        if (key == "No Of \nOders") {
                                            return (
                                                <React.Fragment>
                                                    <BPRDailyAnalyticsTableCell>

                                                        <BPRDailyAnalyticsTableCellText>
                                                            {/* {getCellText(row.techChange, 'techChange')} */}
                                                        </BPRDailyAnalyticsTableCellText>
                                                    </BPRDailyAnalyticsTableCell>

                                                </React.Fragment>
                                            )
                                        }
                                        if (key === 'No Of Customers') {
                                            return (
                                                <React.Fragment>
                                                    <BPRDailyAnalyticsTableCell>

                                                        <BPRDailyAnalyticsTableCellText>
                                                            {/*getCellText(row.ecoChange, 'ecoChange')*/}</BPRDailyAnalyticsTableCellText>
                                                    </BPRDailyAnalyticsTableCell>

                                                </React.Fragment>
                                            )
                                        }
                                        if (key === 'Total Order Value') {
                                            return (
                                                <React.Fragment>
                                                    <BPRDailyAnalyticsTableCell>

                                                        <BPRDailyAnalyticsTableCellText>
                                                            {/*getCellText(row.ecoChange, 'ecoChange')*/}</BPRDailyAnalyticsTableCellText>
                                                    </BPRDailyAnalyticsTableCell>

                                                </React.Fragment>
                                            )
                                        }
                                    })}
                                </BPRDailyAnalyticsTableRow>
                            )
                        })}
                    </BPRDailyAnalyticsTableRowContainer>
                </BPRDailyAnalyticsTableContainer>

                <BPRDailyAnalyticStatusBar>
                    <BPRDailyAnalyticStatusBarSection>
                        Total
                    </BPRDailyAnalyticStatusBarSection>
                    <BPRDailyAnalyticStatusBarSection>
                        {/*summation*/}
                    </BPRDailyAnalyticStatusBarSection>
                </BPRDailyAnalyticStatusBar>
            </BPRDailyAnalyticsContainer>
        </BPRDailyAnalyticsWrapper>
    )

    // return (
    //     <BPRDailyAnalyticsWrapper>
    //         <BPRDailyAnalyticsContainer>
    //             <BPRDailyAnalyticsHeader>
    //                 Analytics
    //             </BPRDailyAnalyticsHeader>

    //             <BPRDailyAnalyticsTableContainer>
    //                 {
    //                     colDefs.map((colDef: ColDef) => {
    //                         return (
    //                             <BPRDailyAnalyticsTableHeader>
    //                                 {colDef.field}
    //                             </BPRDailyAnalyticsTableHeader>
    //                         )
    //                     })
    //                 }
    //                 {/* <AgGridReact
    //                     rowData={rowData}
    //                     columnDefs={colDefs}
    //                     defaultColDef={defaultColDef}
    //                 /> */}
    //                 {/* <VFTable
    //                     columnDefs={colDefs}
    //                     rowData={rowData}
    //                     // tooltipHideDelay={100000}
    //                     // tooltipShowDelay={0}
    //                     // tooltipMouseTrack={true}
    //                 /> */}

    //             </BPRDailyAnalyticsTableContainer>

    //         </BPRDailyAnalyticsContainer>
    //     </BPRDailyAnalyticsWrapper>
    // )
}

export default AnalyticalScreen