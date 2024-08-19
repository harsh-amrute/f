
import React, { useEffect, useMemo, useState } from 'react';
import { useUserData } from '../../../../../context';
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
    HigHAgeingIconWrapper,
    VFWrapper
} from './styles'
import { AgGridReactProps } from 'ag-grid-react';
import { BPRViewTableGrid } from '../../../../../VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/BPR/styles';
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import { orderStatus, orderStatusData, ElapsedTime, ElapsedTimeData, AgieingTime, ageingData } from './DeptWiseBMReportData'

interface orderElapsedGridProps {
    isTrue?: boolean
    data: []
}

// Define the types for column definitions
interface ColumnDef {
    headerName: string;
    field?: string;
    colId?: string;
    children?: ColumnDef[];
}

// Define the types for department data
interface ApiColumn {
    cc: string; // Column code
    cp: number; // Column position
    hd: string; // Header display
    v: boolean; // Visibility flag
    cla?: string; // Class or other attributes
    scc?: string; // Field ID for grid columns
    children?: ApiColumn[]; // Children columns for grouped columns
}

// Define the structure of the column definition
interface ColumnDef {
    headerName: string;
    field?: string;
    colId?: string;
    children?: ColumnDef[];
}


const OrderElapsedGrid = ({ isTrue, data }: orderElapsedGridProps) => {
    //console.log('OrderElapsedGrid',Object.keys(data))
    //const OrderElapsedGrid: any = [];
    //OrderElapsedGrid.push([...data])
    // const [orderElapsedGridData] = useState<any>([...data]);
    const { user } = useUserData()
    const themeUi = user.user.theme_ui
    const [isLeftPanelOrderStatusOpen, toggleLeftPanelOrderStatus] = useState<boolean>(false);
    const [isleftPanelElapsedTimeOpen, toggleLeftPanelElapsedTime] = useState<boolean>(false)
    const [isRightPanel, toggleRightPanel] = useState<boolean>(false);
    const [leftPanelActiveTab, SetLeftPanelActiveTab] = useState<string>('Order_Status')
    const [ordeStatusColDef, setOrderStatusColdef] = useState<any>();

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const agGridProps: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },
            pagination: true,
            defaultColDef: {
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                cellStyle: {
                    'text-align': 'center',
                    "font-style": "normal",
                    "font-variant": "normal",
                    //"font-weight": "300",
                    "font-size": "18px",
                    "font-family": "Roboto",
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'resizable': 'true',
                },

            },

        },
        sideBar: sideBar,
        pivotMode: false
    };

    const agGridPropsElapsedTime: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },
            pagination: true,
            defaultColDef: {
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                cellStyle: {
                    'text-align': 'center',
                    "font-style": "normal",
                    "font-variant": "normal",
                    //"font-weight": "300",
                    "font-size": "18px",
                    "font-family": "Roboto",
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'resizable': 'true',
                },
                floatingFilterComponentParams: {
                    suppressFilterButton: true
                },
                initialFlex: 1
            },

        },
        sideBar: sideBar,
        pivotMode: false
    };

    const dropDownButton = (val: number) => {
        return (
            val == 1 ?
                themeUi !== 'REGALBLAZE' ?
                    isLeftPanelOrderStatusOpen ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown.svg' /> :
                    isLeftPanelOrderStatusOpen ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup-regal.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown-regal.svg' />
                :
                val == 2 ?
                    themeUi !== 'REGALBLAZE' ?
                        isleftPanelElapsedTimeOpen ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown.svg' /> :
                        isleftPanelElapsedTimeOpen ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup-regal.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown-regal.svg' /> :

                    themeUi !== 'REGALBLAZE' ?
                        isRightPanel ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown.svg' /> :
                        isRightPanel ? <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowup-regal.svg' /> : <IconWrapper src='/assets/img/mto/DeptWiseBmReport/arrowdown-regal.svg' />

        )
    }

    const apiResponse: any[] = [
        {
            "cc": "ordid",
            "cp": 1,
            "hd": "Order ID",
            "v": true,
            "cla": "Centre",
            "scc": 'ord_id',

        },
        {
            "cc": "li",
            "cp": 2,
            "hd": "Line Item",
            "v": true,
            "cla": "Centre",
            "scc": 'li',
        },
        {
            "cc": "tq",
            "cp": 3,
            "hd": "Quantity",
            "v": true,
            "cla": "Centre",
            "scc": 'tq',
        },
        {
            "cc": "dept1",
            "cp": 4,
            "hd": "Department 1",
            "v": true,
            "cla": "Centre",
            "scc": 'dept1',
            "children": [
                {
                    "cc": "woh",
                    "cp": 4,
                    "hd": "WIP on hand",
                    "v": true,
                    "cla": "Centre",
                    "scc": 'woh',
                },
                {
                    "cc": "mfg",
                    "cp": 4,
                    "hd": "Balance to manufacture",
                    "v": true,
                    "cla": "Centre",
                    "scc": 'mfg',
                },
            ]
        },
        {
            "cc": "dept2",
            "cp": 4,
            "hd": "Department 2",
            "v": true,
            "cla": "Centre",
            "scc": 'dept2',
            "children": [
                {
                    "cc": "woh",
                    "cp": 4,
                    "hd": "WIP on hand",
                    "v": true,
                    "cla": "Centre",
                    "scc": 'woh',
                },
                {
                    "cc": "mfg",
                    "cp": 4,
                    "hd": "Balance to manufacture",
                    "v": true,
                    "cla": "Centre",
                    "scc": 'mfg',
                },
            ]
        },
        {
            "cc": "dept3",
            "cp": 4,
            "hd": "Department 3",
            "v": true,
            "cla": "Centre",
            "scc": 'dept3',
            "children": [
                {
                    "cc": "woh",
                    "cp": 4,
                    "hd": "WIP on hand",
                    "v": true,
                    "cla": "Centre",
                    "scc": 'woh',
                },
                {
                    "cc": "btm",
                    "cp": 4,
                    "hd": "Balance to manufacture",
                    "v": true,
                    "cla": "Centre",
                    "scc": 'mfg',
                },
            ]
        }
    ]

    const convertApiResponseToColDefs = (apiResponse: ApiColumn[]): ColumnDef[] => {
        // Helper function to recursively map API column to ColumnDef
        const mapToColDef = (apiColumn: ApiColumn): ColumnDef => {
            const columnDef: ColumnDef = {
                headerName: apiColumn.hd,
                field: apiColumn.scc,
                colId: apiColumn.scc,
            };

            if (apiColumn.children && apiColumn.children.length > 0) {
                columnDef.children = apiColumn.children.map(mapToColDef);
            }

            return columnDef;
        };

        // Map each API column entry to ColumnDef format
        return apiResponse.map(mapToColDef);
    };





    useEffect(() => {
        if (data) {
            const columnDefs = convertApiResponseToColDefs(apiResponse);
            console.log('coldef', columnDefs);
            setOrderStatusColdef(columnDefs)
        }
    }, [data])


   

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
                                            dropDownButton(1)
                                        }
                                    </ExpansionHeaderGroup>
                                </ExpansionHeader>
                                {(isLeftPanelOrderStatusOpen) && (
                                    <ExpansionContent>
                                        <VFWrapper>
                                            <VFTable
                                                {...agGridProps}
                                                columnDefs={orderStatus}
                                                rowData={orderStatusData}
                                                height='400px'
                                            />
                                        </VFWrapper>
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
                                            dropDownButton(2)
                                        }
                                    </ExpansionHeaderGroup>
                                </ExpansionHeader>
                                {(isleftPanelElapsedTimeOpen) && (
                                    <ExpansionContent>
                                        <VFTable
                                            {...agGridPropsElapsedTime}
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
                            <ExpansionHeader style={{ borderBottom: isRightPanel ? 'solid 1px #E3ACC9' : 'none' }}>
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
                                        10 days, 2hrs
                                    </ExpansionHeaderColoredText>
                                </ExpansionHeaderGroup>
                                <ExpansionHeaderGroup style={{ marginLeft: 'auto' }}>
                                    <ExpansionHeaderNormalText>
                                        Max Ageing  :
                                    </ExpansionHeaderNormalText>
                                    <ExpansionHeaderColoredText>
                                        10 days, 2hrs
                                    </ExpansionHeaderColoredText>
                                </ExpansionHeaderGroup>
                                <ExpansionHeaderGroup onClick={() => toggleRightPanel(!isRightPanel)} style={{ marginLeft: '100px' }}>
                                    {
                                        dropDownButton(3)
                                    }
                                </ExpansionHeaderGroup>
                            </ExpansionHeader>
                            {(isRightPanel) && (
                                <ExpansionContent>
                                    <VFTable
                                        {...agGridProps}
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