import React, { useState } from 'react'
import {
    BPRDailyAnalyticsWrapper,
    BPRDailyAnalyticsContainer,
    BPRDailyAnalyticsHeader,
    BPRDailyAnalyticsTableContainer,
    BPRDailyAnalyticsTableHeaderContainer,
    BPRDailyAnalyticsTableHeader,
    BPRDailyAnalyticsTableRowContainer
} from './styles';

const ReasonsOrderAnalyticalScreen = () => {

    const [rowData] = useState([
        {
            headerName: 'Order\n Status',
        },
        {
            headerName: 'Unassigned'
        },
        {
            headerName: 'Assigned'
        },
        {
            headerName: 'Order\n Count'
        },
    ])

    return (
        <BPRDailyAnalyticsWrapper>
            <BPRDailyAnalyticsContainer>
                <BPRDailyAnalyticsHeader>
                    Analytics
                </BPRDailyAnalyticsHeader>

                <BPRDailyAnalyticsTableContainer>
                    <BPRDailyAnalyticsTableHeaderContainer style={{ borderTop: '1px white dashed', borderBottom: '1px dashed white' }}>
                        {rowData.map((data) => {
                            return (
                                <BPRDailyAnalyticsTableHeader>
                                    {data.headerName}
                                </BPRDailyAnalyticsTableHeader>
                            )
                        })
                        }
                    </BPRDailyAnalyticsTableHeaderContainer>


                </BPRDailyAnalyticsTableContainer>

                <BPRDailyAnalyticsTableRowContainer>



                </BPRDailyAnalyticsTableRowContainer>

            </BPRDailyAnalyticsContainer>
        </BPRDailyAnalyticsWrapper >
    )
}

export default ReasonsOrderAnalyticalScreen