
import { ColDef } from 'ag-grid-enterprise'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

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
    BPRDailyAnalyticsTableChangeIcon,
    BPRDailyAnalyticsTableNoChangeWrapper,
    BPRDailyAnalyticStatusBarSection,
    BPRDailyAnalyticsTableCellHeader,
    BPRDailyAnalyticsTableCellText,
} from './styles'


const DeptWiseAnalytics = () => {


    // const user = useUserData();
    // const themeUi = user.user.theme_ui;
    const [isLoading] = useState<boolean>(false);

    const data = useSelector((state: any)=> state.mto.bmReportAnalytics);


    const colHeaders: any = [
        { headerName: 'color' },
        { headerName: 'Procurement' },
        { headerName: 'Production' }
    ];

    const rowData: any = [
        {
            color: 'black',
            ProcCount: 100,
            ProcPer: 20,
            ProdCount: 80,
            ProdPer: 15,
            ProcValue: -10,
            ProdValue: 20
        },
        {
            color: 'red',
            ProcCount: 100,
            ProcPer: 20,
            ProdCount: 80,
            ProdPer: 15,
            ProcValue: -10,
            ProdValue: 10
        },
        {
            color: 'yellow',
            ProcCount: 100,
            ProcPer: 20,
            ProdCount: 80,
            ProdPer: 15,
            ProcValue: 10,
            ProdValue: -5
        },
        {
            color: 'green',
            ProcCount: 100,
            ProcPer: 20,
            ProdCount: 80,
            ProdPer: 15,
            ProcValue: 0,
            ProdValue: 0

        },
        {
            color: 'blue',
            ProcCount: 100,
            ProcPer: 20,
            ProdCount: 80,
            ProdPer: 15,
            ProcValue: -2,
            ProdValue: -2
        },
        {
            color: '#ccccc',
            ProcCount: 100,
            ProcPer: 20,
            ProdCount: 80,
            ProdPer: 15,
            ProcValue: 2,
            ProdValue: -2
        }

    ]


    const summation = '24232'


    const getCellIcons = (value: number) => {
        if (value > 0) {
            return <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-increase.svg' />
        }
        if (value < 0) {
            return <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-decrease.svg' style={{ transform: 'rotate(90deg)' }} />
        }
        return (
            <BPRDailyAnalyticsTableNoChangeWrapper>
                <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-increase.svg' />
                <BPRDailyAnalyticsTableChangeIcon src='/assets/img/VectorFLOW/BPR/analytics-decrease.svg' style={{ transform: 'rotate(90deg)' }} />
            </BPRDailyAnalyticsTableNoChangeWrapper>
        )

    }



    if (isLoading) {
        return (
            <BPRDailyAnalyticsWrapper>
                <BPRDailyAnalyticsContainer style={{ aspectRatio: '0.9', width: '90%' }}>
                    <BPRDailyAnalyticsHeader  >
                        Analytics (For all orders)
                    </BPRDailyAnalyticsHeader>
                    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
                        <p style={{ color: 'white' }}>________</p>
                    </div>
                </BPRDailyAnalyticsContainer>
            </BPRDailyAnalyticsWrapper>
        )
    }

    if (!rowData || !Array.isArray(rowData) || rowData.length === 0) {
        return (
            <BPRDailyAnalyticsWrapper>
                <BPRDailyAnalyticsContainer style={{ aspectRatio: '0.9', width: '90%' }}>
                    <BPRDailyAnalyticsHeader  >
                        Analytics (For all orders)
                    </BPRDailyAnalyticsHeader>
                    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
                        <p style={{ color: 'white' }}>No data</p>
                    </div>
                </BPRDailyAnalyticsContainer>
            </BPRDailyAnalyticsWrapper>
        )
    }



    return (
        <BPRDailyAnalyticsWrapper>
            <BPRDailyAnalyticsContainer  >
                <BPRDailyAnalyticsHeader  >
                    Analytics (For all orders)
                </BPRDailyAnalyticsHeader>
                <BPRDailyAnalyticsTableContainer>
                    <BPRDailyAnalyticsTableHeaderContainer>
                        {
                            colHeaders.map((colDef: ColDef) => {
                                if (colDef.headerName === 'color') {
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
                                                <BPRDailyAnalyticsTableCell style={{ backgroundColor: row[key], width: 60, boxShadow: "0px 3px 12px #AFAFAF" }} />
                                            )
                                        }
                                        if (key == 'ProcCount') {
                                            return (
                                                <React.Fragment>
                                                    <BPRDailyAnalyticsTableCell>
                                                        <BPRDailyAnalyticsTableCellHeader>{row.ProcCount}</BPRDailyAnalyticsTableCellHeader>
                                                        <BPRDailyAnalyticsTableCellText>{row.ProcPer + '%'}</BPRDailyAnalyticsTableCellText>
                                                    </BPRDailyAnalyticsTableCell>
                                                    <BPRDailyAnalyticsTableCell>
                                                        {getCellIcons(row.ProcValue)}
                                                    </BPRDailyAnalyticsTableCell>
                                                </React.Fragment>
                                            )
                                        }
                                        if (key === 'ProdCount') {
                                            return (
                                                <React.Fragment>
                                                    <BPRDailyAnalyticsTableCell>
                                                        <BPRDailyAnalyticsTableCellHeader>{row.ProdCount}</BPRDailyAnalyticsTableCellHeader>
                                                        <BPRDailyAnalyticsTableCellText>{row.ProdPer + '%'}</BPRDailyAnalyticsTableCellText>
                                                    </BPRDailyAnalyticsTableCell>
                                                    <BPRDailyAnalyticsTableCell>
                                                        {getCellIcons(row.ProdValue)}
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
                        {summation}
                    </BPRDailyAnalyticStatusBarSection>
                </BPRDailyAnalyticStatusBar>
            </BPRDailyAnalyticsContainer>
        </BPRDailyAnalyticsWrapper>
    )
}

export default DeptWiseAnalytics