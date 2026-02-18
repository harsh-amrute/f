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
} from './DynamicReleaseManagement.styled.css'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../../../../redux/store/store';
import { formatNumber } from '../../Procurement/MaterialCoverage/CommonFunc';


const DRMAnalytics = () => {

    const options = {
        "Order": [
            {
                "ccr": 'OverLimit',
                "RMS": 29,
                "RMT": 67,
                "others": 0,
                "count": 96,
            },
            {
                "ccr": 'UnderLimit',
                "RMS": 29,
                "RMT": 91,
                "others": 0,
                "count": 146,
            },
            {
                "ccr": 'Balanced',
                "RMS": 45,
                "RMT": 19,
                "others": 0,
                "count": 110,
            }
        ]
    }

    const [rowData] = useState([
        {
            headerName: 'CCR',
        },
        {
            headerName: 'RM In-Stock'
        },
        {
            headerName: 'RM In-Transit'
        },
        {
            headerName: 'Others'
        },
        {
            headerName: 'Count'
        },
    ])


    if (!options.Order) {
        return null
    }


    return (
        <div className={BPRDailyAnalyticsWrapper}>
            <div className={BPRDailyAnalyticsContainer}>
                <div className={BPRDailyAnalyticsHeader}>
                    Analytics
                </div>

                <div className={BPRDailyAnalyticsTableContainer}>
                    <div className={BPRDailyAnalyticsTableHeaderContainer} style={{ borderTop: '1px dashed white', borderBottom: '1px dashed white' }}>
                        {rowData.map((data) => {
                            return (
                                <div className={BPRDailyAnalyticsTableHeader}>
                                    {data.headerName}
                                </div>
                            )
                        })
                        }
                    </div>
                    <div className={BPRDailyAnalyticsTableRowContainer}>

                        {options?.Order?.map((o: any) => {
                            return (
                                <div className={BPRDailyAnalyticsTableRow} style={{
                                    height: 30,
                                    boxShadow: 'none',
                                    backgroundColor: 'transparent',
                                    borderBottom: o.ccr === 'Balanced' ? '' : '1px white solid',
                                    borderRadius: 0
                                }}>

                                    <div className={BPRDailyAnalyticsTableCell}>
                                        <p className={BPRDailyAnalyticsTableCellHeader} style={{ color: 'white' }}>
                                            {o.ccr}
                                        </p>

                                    </div>
                                    <div className={BPRDailyAnalyticsTableCell}>
                                        <p className={BPRDailyAnalyticsTableCellHeader} style={{ color: 'white' }}>
                                            {formatNumber(o.RMS)}
                                        </p>

                                    </div>
                                    <div className={BPRDailyAnalyticsTableCell}>
                                        <p className={BPRDailyAnalyticsTableCellHeader} style={{ color: 'white' }}>
                                            {formatNumber(o.RMT)}
                                        </p>

                                    </div>
                                    <div className={BPRDailyAnalyticsTableCell}>
                                        <p className={BPRDailyAnalyticsTableCellHeader} style={{ color: 'white' }}>
                                            {formatNumber(o.others)}
                                        </p>

                                    </div>
                                    <div className={BPRDailyAnalyticsTableCell}>
                                        <p className={BPRDailyAnalyticsTableCellHeader} style={{ color: 'white' }} >
                                            {formatNumber(o.count)}
                                        </p>

                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>


            </div>
        </div>

    )


}

export default DRMAnalytics