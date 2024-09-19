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
    BPRDailyAnalyticsWrapper,
    BPRDailyAnalyticsTableCellHeader,
} from './DueDateQuotation.styled';
import { formatNumber } from '../../Procurement/MaterialCoverage/CommonFunc';

const DDQAnalytics = () => {

    const options = {
        "Order": [
            {
                "procBuff": 6,
                "PodBuff": 9,
                "ccrroute": 7,
                "unsch": 0,
                "sch": 0,
                "count": 4
            },
            {
                "procBuff": 5,
                "PodBuff": 2,
                "ccrroute": 9,
                "unsch": 0,
                "sch": 0,
                "count": 2
            },
            {
                "procBuff": 14,
                "PodBuff": 4,
                "ccrroute": 3,
                "unsch": 0,
                "sch": 0,
                "count": 3
            }
        ]
    }

    const [rowData] = useState([
        {
            headerName: 'Proc Buffer',
        },
        {
            headerName: 'Prod Buffer'
        },
        {
            headerName: 'CCR/ Route'
        },
        {
            headerName: 'Unsch- eduled'
        },
        {
            headerName: 'Sched- uled'
        },
        {
            headerName: 'Count'
        },
    ])



    if (!options.Order) {
        return null
    }


    return (
        <BPRDailyAnalyticsWrapper>
            <BPRDailyAnalyticsContainer>
                <BPRDailyAnalyticsHeader style={{ borderBottom: '1px dashed white' }}>
                    Analytics
                </BPRDailyAnalyticsHeader>
                <BPRDailyAnalyticsHeader>
                    (Orders with unassigned)
                </BPRDailyAnalyticsHeader>

                <BPRDailyAnalyticsTableContainer>
                    <BPRDailyAnalyticsTableHeaderContainer style={{ borderBottom: '1px dashed white' }}>
                        {rowData.map((data) => {

                            if (data.headerName === 'Proc Buffer') {
                                return (
                                    <BPRDailyAnalyticsTableHeader style={{ borderTop: '1px solid white', borderLeft: '1px solid white' }}>
                                        {data.headerName}

                                    </BPRDailyAnalyticsTableHeader>
                                )
                            }
                            else if (data.headerName === "Prod Buffer") {
                                return (
                                    <BPRDailyAnalyticsTableHeader style={{ borderTop: '1px solid white' }}>
                                        {data.headerName}

                                    </BPRDailyAnalyticsTableHeader>
                                )
                            }
                            else if (data.headerName === 'CCR/ Route') {
                                return (
                                    <BPRDailyAnalyticsTableHeader style={{ borderTop: '1px solid white', borderRight: '1px solid white' }}>
                                        {data.headerName}

                                    </BPRDailyAnalyticsTableHeader>
                                )
                            }
                            return (
                                <BPRDailyAnalyticsTableHeader>
                                    {data.headerName}
                                </BPRDailyAnalyticsTableHeader>
                            )
                        })
                        }
                    </BPRDailyAnalyticsTableHeaderContainer>
                    <BPRDailyAnalyticsTableRowContainer>

                        {options?.Order?.map((o: any) => {
                            return (
                                <BPRDailyAnalyticsTableRow style={{
                                    height: 30,
                                    boxShadow: 'none',
                                    backgroundColor: 'transparent',
                                    borderBottom: '1px white solid',
                                    borderRadius: 0
                                }}>

                                    <BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCellHeader style={{ color: 'white' }}>
                                            {o.procBuff}
                                        </BPRDailyAnalyticsTableCellHeader>

                                    </BPRDailyAnalyticsTableCell>
                                    <BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCellHeader style={{ color: 'white' }}>
                                            {o.PodBuff}
                                        </BPRDailyAnalyticsTableCellHeader>

                                    </BPRDailyAnalyticsTableCell>
                                    <BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCellHeader style={{ color: 'white' }} >
                                            {formatNumber(o.ccrroute)}
                                        </BPRDailyAnalyticsTableCellHeader>

                                    </BPRDailyAnalyticsTableCell>
                                    <BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCellHeader style={{ color: 'white' }} >
                                            {formatNumber(o.unsch)}
                                        </BPRDailyAnalyticsTableCellHeader>

                                    </BPRDailyAnalyticsTableCell>
                                    <BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCellHeader style={{ color: 'white' }} >
                                            {formatNumber(o.sch)}
                                        </BPRDailyAnalyticsTableCellHeader>

                                    </BPRDailyAnalyticsTableCell>
                                    <BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCellHeader style={{ color: 'white' }} >
                                            {formatNumber(o.count)}
                                        </BPRDailyAnalyticsTableCellHeader>

                                    </BPRDailyAnalyticsTableCell>
                                </BPRDailyAnalyticsTableRow>
                            )
                        })}
                    </BPRDailyAnalyticsTableRowContainer>

                </BPRDailyAnalyticsTableContainer>


            </BPRDailyAnalyticsContainer>
        </BPRDailyAnalyticsWrapper >

    )


}

export default DDQAnalytics;
