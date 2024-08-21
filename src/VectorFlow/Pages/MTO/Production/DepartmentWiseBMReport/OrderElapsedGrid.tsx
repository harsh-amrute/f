
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
import { /*orderStatus, orderStatusData, ElapsedTime, ElapsedTimeData, */AgieingTime, ageingData } from './DeptWiseBMReportData'

interface orderElapsedGridProps {
    isTrue?: boolean
    data?: any
    deptName: [],
    selectedOrderCount?: string
}



type RowData = {
    [key: string]: any;
};



const OrderElapsedGrid = ({ isTrue, data, deptName, selectedOrderCount }: orderElapsedGridProps) => {
    // console.log('OrderElapsedGrid', selectedOrderCount)
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
    const [elapsedOrderColdef, setElapsedOrderColDef] = useState<any>();
    const [rowData, setRowData] = useState<any>();
    const [ElapsedTimeRowData,setElapsedTimeRowData]=useState<any>();


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

    /* const apiResponse: any[] = [
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
     ]*/

    const convertApiResponseToColDefs = (apiResponse: any[]) => {
        // Helper function to recursively map API column to ColumnDef
        const mapToColDef = (apiColumn: any) => {
            const columnDef: any = {
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



    const generateApiResponse = (departmentHeaders: string[]) => {
        const apiResponse: any[] = [
            {
                cc: "ordid",
                cp: 1,
                hd: "Order ID",
                v: true,
                cla: "Centre",
                scc: 'ord_id',
            },
            {
                cc: "li",
                cp: 2,
                hd: "Line Item",
                v: true,
                cla: "Centre",
                scc: 'li',
            },
            {
                cc: "tq",
                cp: 3,
                hd: "Quantity",
                v: true,
                cla: "Centre",
                scc: 'tq',
            }
        ];

        departmentHeaders.forEach((departmentHeader, index) => {

            const departmentColumn: any = {
                cc: `dept${index + 1}`,
                cp: 4,
                hd: departmentHeader,
                v: true,
                cla: "Centre",
                scc: `dept${index + 1}`,
                children: [
                    {
                        cc: `${departmentHeader}_woh`,
                        cp: 4,
                        hd: "WIP on hand",
                        v: true,
                        cla: "Centre",
                        scc: `${departmentHeader}_woh`,
                    },
                    {
                        cc: `${departmentHeader}_mfg`,
                        cp: 4,
                        hd: "Balance to manufacture",
                        v: true,
                        cla: "Centre",
                        scc: `${departmentHeader}_mfg`,
                    }
                ]
            };

            apiResponse.push(departmentColumn);
        });

        return apiResponse;
    };



    const transformToRowData = () => {
        const rowData: RowData[] = [];

        // Loop through each order in the input data
        for (const [orderId, orderDetails] of Object.entries(data)) {
            if (typeof orderDetails !== 'object' || orderDetails === null) {
                continue; // Skip invalid or null entries
            }

            const orderDetailsObj = orderDetails as Record<string, unknown>;

            // Safely extract 'li' and 'tq' with type-checks
            const li = typeof orderDetailsObj.li === 'string' ? orderDetailsObj.li : '';
            const tq = typeof orderDetailsObj.tq === 'number' ? orderDetailsObj.tq : 0;

            const row: RowData = {
                ord_id: orderId,
                li,
                tq,
            };

            // Loop through each department (like "1", "2", etc.)
            for (const [deptKey, deptData] of Object.entries(orderDetailsObj)) {
                if (deptKey !== 'tq' && deptKey !== 'li' && typeof deptData === 'object' && deptData !== null) {
                    const deptInfo = deptData as {
                        woh?: number;
                        mfg?: number;
                        //int?: number | null;
                        //out?: number | null;
                    };

                    // Create fields based on department key
                    row[`${deptKey}_woh`] = deptInfo.woh ?? null;
                    row[`${deptKey}_mfg`] = deptInfo.mfg ?? null;
                    //row[`${deptKey}_int`] = deptInfo.int ?? null;
                    //row[`${deptKey}_out`] = deptInfo.out ?? null;
                }
            }

            rowData.push(row);
        }

        return rowData;
    }

    const createElapsedOrderColdef = (headers: any) => {
        // Start with a default "time" column
        const colDefs: any = [
            {
                headerName: "",
                field: "time",
                colId: "time",
            },
        ];

        // Dynamically create the department columns based on the headers provided
        headers.forEach((header: any, index: number) => {
            colDefs.push({
                headerName: header,
                field: (index + 1).toString(),  // Convert index to string for field name
                colId: (index + 1).toString(),
            });
        });

        return colDefs;
    }

    const createRowDataWithTimes=()=>{
        const rowData: RowData[] = [
          { time: "In Time" },
          { time: "Out Time" },
          { time: "Elapsed Time" },
        ];
      
        // Iterate through each order in the inputData
        for (const [orderDetails] of Object.entries(data)) {
          // Loop through each department (like "1", "2", etc.)
          for (const [deptKey, deptData] of Object.entries(orderDetails)) {
            if (deptKey !== 'tq' && deptKey !== 'li' && typeof deptData === 'object' && deptData !== null) {
              const deptInfo = deptData as {
                //woh?: number;
                //mfg?: number;
                int?: number | null;
                out?: number | null;
            };
      
              // Assign department times to the corresponding row
              rowData[0][`dpt${deptKey}`] = deptInfo.int ?? null;
              rowData[1][`dpt${deptKey}`] = deptInfo.out ?? null;
    
            }
          }
        }
      
        return rowData;
      }
      



    useEffect(() => {
        if (data) {
            /**This will create the UI Configuration api response */
            const apiResponse = generateApiResponse(deptName);

            /**Based on the apiResponse creating th dynamic coldef */
            const columnDefs = convertApiResponseToColDefs(apiResponse);
            //console.log('coldef', columnDefs)
            setOrderStatusColdef(columnDefs)

            const elapsedOrderColdef = createElapsedOrderColdef(deptName);
            //console.log('elapsedOrderColdef', elapsedOrderColdef)
            setElapsedOrderColDef(elapsedOrderColdef)

            const rowData = transformToRowData();//const rowData = generateRowData(columnDefs);
            setRowData(rowData)
            //console.log('rowData=Fristan', rowData);

            const ElapsedTimeRowData=createRowDataWithTimes();
            setElapsedTimeRowData(ElapsedTimeRowData)
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
                                            {selectedOrderCount}
                                        </ExpansionHeaderColoredText>
                                    </ExpansionHeaderGroup>
                                    <ExpansionHeaderGroup style={{ marginLeft: '10px' }}>
                                        <ExpansionHeaderNormalText>
                                            WIP Present In  :
                                        </ExpansionHeaderNormalText>
                                        <ExpansionHeaderColoredText>
                                            {`${deptName},`}
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
                                                columnDefs={ordeStatusColDef}
                                                rowData={rowData}
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
                                            {selectedOrderCount}
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
                                            rowData={ElapsedTimeRowData}
                                            columnDefs={elapsedOrderColdef}
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