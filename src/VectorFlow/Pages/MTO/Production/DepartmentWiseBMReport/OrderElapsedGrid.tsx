
import React, { useState } from 'react';
import { useUserData } from '../../../../../context';
import { SCTabButton } from '../../../../../components/VectorFLOW/commons/VFTab/styles';
import {
    NoDataAvailableContainer,
    NoDataToShowDiv,
    NoDataText,
    SelectText,
    BPRViewTableWrapper,
    BPRViewTablePrefixWrapper,
    BPRViewTableHeaderTab,
    ExpansionWrapper,
    ExpansionHeader,
    ExpansionContent,
    ExpansionHeaderNormalText,
    ExpansionHeaderColoredText,
    ExpansionHeaderGroup,
    IconWrapper,
    HigHAgeingIconWrapper
} from './styles'

import { BPRViewTableGrid } from '../../../../../VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/BPR/styles';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { orderStatus, orderStatusData, ElapsedTime, ElapsedTimeData, AgieingTime, ageingData } from './DeptWiseBMReportData'

interface orderElapsedGridProps {
    isTrue?: boolean
}

const OrderElapsedGrid = ({ isTrue }: orderElapsedGridProps) => {

    const { user } = useUserData()

    const themeUi = user.user.theme_ui
    const [activeTab, setActiveTab] = useState('OrderStatus');
    const [isLeftPanelOrderStatusOpen, toggleLeftPanelOrderStatus] = useState<boolean>(false);
    const [isleftPanelElapsedTimeOpen, toggleLeftPanelElapsedTime] = useState<boolean>(false)
    const [isRightPanel, toggleRightPanel] = useState<boolean>(false);

    const [leftPanelActiveTab, SetLeftPanelActiveTab] = useState<string>('Order_Status')


    const dropDownButton = () => {
        return (
            themeUi !== 'REGALBLAZE' ?
                isLeftPanelOrderStatusOpen ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown.svg' /> :
                isLeftPanelOrderStatusOpen ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup-regal.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown-regal.svg' />
        )
    }

    return (
        isTrue ?
            <div style={{ display: 'flex', gap: "2rem" }}>
                <BPRViewTableWrapper>
                    <BPRViewTablePrefixWrapper>
                        <BPRViewTableHeaderTab
                            themeUi={themeUi}
                            zIndex={leftPanelActiveTab === 'Order_Status' ? 1 : 0}
                            marLeft={false}
                            status={leftPanelActiveTab === 'Order_Status' ? "active" : 'inactive'}
                            onClick={() => SetLeftPanelActiveTab('Order_Status')}
                        >
                            Order Status
                        </BPRViewTableHeaderTab>
                        <BPRViewTableHeaderTab
                            themeUi={themeUi}
                            zIndex={leftPanelActiveTab === 'Elapsed_Time' ? 1 : 0}
                            marLeft={false}
                            status={leftPanelActiveTab === 'Elapsed_Time' ? "active" : 'inactive'}
                            onClick={() => SetLeftPanelActiveTab('Elapsed_Time')}
                        >
                            Elapsed Time
                        </BPRViewTableHeaderTab>
                    </BPRViewTablePrefixWrapper>

                    <BPRViewTableGrid style={{ padding: '10px', borderRadius: 0 }}>
                        {leftPanelActiveTab === 'Order_Status' ?
                            <ExpansionWrapper>
                                <ExpansionHeader style={{ borderBottom: isLeftPanelOrderStatusOpen ? 'solid 1px #E3ACC9' : 'none' }}>
                                    <ExpansionHeaderGroup>
                                        <ExpansionHeaderNormalText>
                                            Selected Orders  :
                                        </ExpansionHeaderNormalText>
                                        <ExpansionHeaderColoredText>
                                            4
                                        </ExpansionHeaderColoredText>
                                    </ExpansionHeaderGroup>
                                    <ExpansionHeaderGroup style={{ marginLeft: '10px' }}>
                                        <ExpansionHeaderNormalText>
                                            WIP Present In  :
                                        </ExpansionHeaderNormalText>
                                        <ExpansionHeaderColoredText>
                                            Dept 1, Dept 2
                                        </ExpansionHeaderColoredText>
                                    </ExpansionHeaderGroup>
                                    <ExpansionHeaderGroup onClick={() => toggleLeftPanelOrderStatus(!isLeftPanelOrderStatusOpen)} style={{ marginLeft: 'auto' }}>
                                        {
                                            dropDownButton()
                                        }
                                    </ExpansionHeaderGroup>
                                </ExpansionHeader>
                                {(isLeftPanelOrderStatusOpen) && (
                                    <ExpansionContent>
                                        <VFTable
                                            columnDefs={orderStatus}
                                            rowData={orderStatusData}
                                            height='400px'
                                        />
                                    </ExpansionContent>
                                )}
                            </ExpansionWrapper>
                            :
                            <ExpansionWrapper>
                                <ExpansionHeader style={{ borderBottom: isleftPanelElapsedTimeOpen ? 'solid 1px #E3ACC9' : 'none' }}>
                                    <ExpansionHeaderGroup>
                                        <ExpansionHeaderNormalText>
                                            Selected Orders  :
                                        </ExpansionHeaderNormalText>
                                        <ExpansionHeaderColoredText>
                                            4
                                        </ExpansionHeaderColoredText>
                                    </ExpansionHeaderGroup>
                                    <ExpansionHeaderGroup style={{ marginLeft: '10px' }}>
                                        <ExpansionHeaderNormalText>
                                            Elapsed Time  :
                                        </ExpansionHeaderNormalText>
                                        <ExpansionHeaderColoredText>
                                            10 days
                                        </ExpansionHeaderColoredText>
                                    </ExpansionHeaderGroup>
                                    <ExpansionHeaderGroup onClick={() => toggleLeftPanelElapsedTime(!isleftPanelElapsedTimeOpen)} style={{ marginLeft: 'auto' }}>
                                        {
                                            dropDownButton()
                                        }
                                    </ExpansionHeaderGroup>
                                </ExpansionHeader>
                                {(isleftPanelElapsedTimeOpen) && (
                                    <ExpansionContent>
                                        <VFTable
                                            height='400px'
                                            rowData={ElapsedTimeData}
                                            columnDefs={ElapsedTime}
                                        />
                                    </ExpansionContent>
                                )}
                            </ExpansionWrapper>
                        }
                    </BPRViewTableGrid>
                </BPRViewTableWrapper>

                <BPRViewTableWrapper >
                    <BPRViewTablePrefixWrapper>
                        <BPRViewTableHeaderTab
                            bgColor='red'
                            themeUi={themeUi}
                            zIndex={1}
                            marLeft={false}
                            status="active"
                        >
                            <HigHAgeingIconWrapper
                                src='/assets/img/mto/DeptWiseBmReport/highageing.svg'
                            />
                            High Ageing Batches
                        </BPRViewTableHeaderTab>
                    </BPRViewTablePrefixWrapper>

                    <BPRViewTableGrid style={{ padding: '10px', borderRadius: 0 }}>
                        <ExpansionWrapper>
                            <ExpansionHeader style={{ borderBottom: isleftPanelElapsedTimeOpen ? 'solid 1px #E3ACC9' : 'none' }}>
                                <ExpansionHeaderGroup>
                                    <ExpansionHeaderNormalText>
                                        No. Of batches  :
                                    </ExpansionHeaderNormalText>
                                    <ExpansionHeaderColoredText>
                                        4
                                    </ExpansionHeaderColoredText>
                                </ExpansionHeaderGroup>
                                <ExpansionHeaderGroup style={{ marginLeft: 'auto' }}>
                                    <ExpansionHeaderNormalText>
                                        Min Ageing  :
                                    </ExpansionHeaderNormalText>
                                    <ExpansionHeaderColoredText>
                                        10 days
                                    </ExpansionHeaderColoredText>
                                </ExpansionHeaderGroup>
                                <ExpansionHeaderGroup style={{ marginLeft: 'auto' }}>
                                    <ExpansionHeaderNormalText>
                                        Max Ageing  :
                                    </ExpansionHeaderNormalText>
                                    <ExpansionHeaderColoredText>
                                        10 days
                                    </ExpansionHeaderColoredText>
                                </ExpansionHeaderGroup>
                                <ExpansionHeaderGroup onClick={() => toggleRightPanel(!isRightPanel)} style={{ marginLeft: '100px' }}>
                                    {
                                        dropDownButton()
                                    }
                                </ExpansionHeaderGroup>
                            </ExpansionHeader>
                            {(isRightPanel) && (
                                <ExpansionContent>
                                    <VFTable
                                        height='400px'
                                        columnDefs={AgieingTime}
                                        rowData={ageingData}
                                    />
                                </ExpansionContent>
                            )}
                        </ExpansionWrapper>
                    </BPRViewTableGrid>
                </BPRViewTableWrapper>
            </div>

            :

            <NoDataAvailableContainer>
                <NoDataToShowDiv>
                    <NoDataText>No Data To Show</NoDataText>
                    <SelectText>Please select a row from above table to view data</SelectText>
                </NoDataToShowDiv>
            </NoDataAvailableContainer>




    )
}

export default OrderElapsedGrid