import React, { useEffect, useMemo, useRef, useState } from 'react'
import VFButtonOutline from '../../../../../components/VectorFLOW/commons/VFButtonOutline'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'
import { useUserData } from '../../../../../context'
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { Footer, Wrapper } from './DueDateQuotation.styled'
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton'
import { useGetOrdersForDDQ, useGetUIConfig } from '../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation'
import { getColumnDefinations } from '../../../../../helpers/utils'
import { GridOptions } from 'ag-grid-enterprise'
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination'
import VFOverlay from '../../../../../components/VectorFLOW/commons/VFOverlay'
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox'
import { Allotment } from 'allotment'
import "./style.css"

const DueDateQuotation = () => {
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [unScheduled, setUnScheduled] = useState(true);
    const [rows, setRows] = useState<any>([]);
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [step, setStep] = useState(1);
    const totalRows = useRef(0);
    const gridRef = useRef(null);

    const { mutateAsync: getData, isLoading: isDataLoading } = useGetOrdersForDDQ();
    const { data: UIConfig, isLoading: isUIConfigLoading } = useGetUIConfig("DueDateQuotation");

    const extras: any = [
        {
            field: "",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            suppressMenu: true,
            maxWidth: 50,
            position: 0,
            filter: false
        },
    ]

    const columnDefs = useMemo(() => getColumnDefinations(UIConfig ? UIConfig.data.data : [], undefined, extras), [isUIConfigLoading]);

    const gridOptions: GridOptions = {
        rowSelection: "multiple",
        columnDefs: columnDefs,
        suppressRowClickSelection: true,
        defaultColDef: {
            wrapHeaderText: true,
            autoHeaderHeight: true,
            resizable: true,
            suppressSizeToFit: false,
            filter: "agTextColumnFilter",
            floatingFilter: true,
        },
        sideBar: {
            toolPanels: ["columns"],
        },
        // statusBar:{
        //     statusPanels:[
        //         {
        //             statusPanel: "agTotalRowCountComponent",
        //             align: "left",
        //         },
        //     ]
        // }
    }

    useEffect(() => {
        getDDQData()
    }, [currentPage, unScheduled])

    const getDDQData = async () => {
        const data = await getData({ currentPage, unScheduled: unScheduled });
        totalRows.current = data?.data?.data.count;
        setRows(data?.data?.data?.results)
    }

    const handlePageChange = async (currPage: number) => {
        setCurrentPage(currPage)
    }

    const getCurrentStep = (step: number) => {
        switch (step) {
            case 1: {
                return (
                    <>
                        <VFTable
                            key="allRows"
                            ref={gridRef}
                            gridOptions={gridOptions}
                            columnDefs={gridOptions.columnDefs}
                            rowData={rows}
                            // domLayout="autoHeight"
                            onGridReady={(params: any) => {
                                params.columnApi.autoSizeAllColumns();
                            }}
                            onSelectionChanged={(params: any) => {
                                setSelectedRows(params.api.getSelectedRows())
                            }}
                        />
                        <VFPagination
                            selectedRows={0}
                            totalRows={totalRows.current}
                            rowsPerPage={10}
                            currentPage={currentPage}
                            handleChangePage={handlePageChange}
                        />
                    </>
                )
            }
            case 2: {
                return (
                    <>

                        <Allotment vertical separator>
                            <Allotment.Pane preferredSize={'50%'}>
                                <Wrapper>
                                    <VFTable
                                        key="selectedRows"
                                        ref={gridRef}
                                        gridOptions={gridOptions}
                                        columnDefs={gridOptions.columnDefs}
                                        rowData={selectedRows}
                                        // domLayout="autoHeight"
                                        pagination={true}
                                        onGridReady={(params: any) => {
                                            params.columnApi.autoSizeAllColumns();
                                        }}
                                    />
                                </Wrapper>
                            </Allotment.Pane>

                            <Allotment.Pane preferredSize={'50%'}>
                                <Wrapper>
                                    <VFTable
                                        key="selectedRows"
                                        ref={gridRef}
                                        gridOptions={gridOptions}
                                        columnDefs={gridOptions.columnDefs}
                                        rowData={selectedRows}
                                        // domLayout="autoHeight"
                                        pagination={true}
                                        onGridReady={(params: any) => {
                                            params.columnApi.autoSizeAllColumns();
                                        }}
                                    />
                                </Wrapper>
                                
                            </Allotment.Pane>
                        </Allotment>
                    </>
                )
            }
        }
    }

    return (
        <Wrapper>
            <MTOActionToolBar comp="DDQ" quickFilter={<div style={{ background: "#EFEFEF", borderRadius: "4px", padding: "1rem", display: "flex", alignItems: "center" }}><Checkbox checked={unScheduled} onChange={(e: any) => setUnScheduled(e.target.checked)} theme={themeUi} /> &nbsp;&nbsp; <strong>Show Only Unscheduled Orders</strong></div>} />
            {isDataLoading && <VFOverlay>
                Loading...
            </VFOverlay>}
            {getCurrentStep(step)}
            <Footer>
                <VFButtonOutline
                    themeUi={themeUi}
                    onClick={() => {
                        setStep(step - 1);
                        setSelectedRows([])
                    }}
                    style={{ width: "50px", height: "40px" }}>
                    <img src="/assets/img/mto/dueDateQuotation/back-btn.svg" />
                </VFButtonOutline>
                <VFButtonOutline themeUi={themeUi} onClick={() => { console.log() }} style={{ fontSize: "12px", width: "100px", height: "40px" }}>
                    Cancel
                </VFButtonOutline>
                <VFButton themeUi={themeUi} onClick={() => { setStep(step + 1) }} style={{ fontSize: "12px", width: "100px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    Continue
                </VFButton>
            </Footer>
        </Wrapper>
    )
}

export default DueDateQuotation